import is from '@sindresorhus/is'
import destr from 'destr'
import { rest } from 'msw'
import { db } from '@db/apps/promotion/db'
import { paginateArray } from '@api-utils/paginateArray'

export const handlerAppsPromotions = [
  // Get Users Details
  rest.get(('/api/apps/promotions'), (req, res, ctx) => {
    const q = req.url.searchParams.get('q')
    const startDate = req.url.searchParams.get('startDate')
    const toDate = req.url.searchParams.get('toDate')
    const status = req.url.searchParams.get('status')
    const selectedStartDateRange = req.url.searchParams.get('selectedStartDateRange')
    const selectedToDateRange = req.url.searchParams.get('selectedToDateRange')
    const itemsPerPage = req.url.searchParams.get('itemsPerPage')
    const page = req.url.searchParams.get('page')
    const orderBy = req.url.searchParams.get('orderBy')
    const sortBy = req.url.searchParams.get('sortBy')

    const searchQuery = is.string(q) ? q : undefined
    const queryLower = (searchQuery ?? '').toString().toLowerCase()

    const parsedSortBy = destr(sortBy)
    const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

    const parsedOrderBy = destr(orderBy)
    const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

    const parsedItemsPerPage = destr(itemsPerPage)
    const parsedPage = destr(page)

    const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
    const pageLocal = is.number(parsedPage) ? parsedPage : 1

    const parsedToDateRange = destr(selectedToDateRange) as unknown as { start?: string; end?: string }
    const startToDateLocal = parsedToDateRange?.start
    const endToDateLocal = parsedToDateRange?.end

    const parsedStartDateRange = destr(selectedStartDateRange) as unknown as { start?: string; end?: string }
    const startStartDateLocal = parsedStartDateRange?.start
    const endStartDateLocal = parsedStartDateRange?.end

    // filter users
    let filteredPromotion = db.filter(promo => ((promo.code.toLowerCase().includes(queryLower) && promo.startDate === (startDate || promo.startDate) && promo.toDate === (toDate || promo.toDate) && promo.status === (status || promo.status)))).reverse()

    // sort users
    if (sortByLocal) {
      console.log(sortByLocal)
      if (sortByLocal === 'code') {
        filteredPromotion = filteredPromotion.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.code.localeCompare(b.code)
          else
            return b.code.localeCompare(a.code)
        })
      }
      if (sortByLocal === 'status') {
        filteredPromotion = filteredPromotion.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.status.localeCompare(b.status)
          else
            return b.status.localeCompare(a.status)
        })
      }
      else if (sortByLocal === 'toDate') {
        filteredPromotion = filteredPromotion.sort((a, b) => {
          if (orderByLocal === 'asc')
            return new Date(a.toDate).getTime() - new Date(b.toDate).getTime()

          return new Date(b.toDate).getTime() - new Date(a.toDate).getTime()
        })
      }
      else if (sortByLocal === 'startDate') {
        filteredPromotion = filteredPromotion.sort((a, b) => {
          if (orderByLocal === 'asc')
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()

          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        })
      }
    }

    // filtering invoices by date
    if (startToDateLocal && endToDateLocal) {
      filteredPromotion = filteredPromotion.filter(promotion => {
        const start = new Date(startToDateLocal).getTime()
        const end = new Date(endToDateLocal).getTime()
        const date = new Date(promotion.toDate).getTime()

        return date >= start && date <= end
      })
    }

    // filtering invoices by date
    if (startStartDateLocal && endStartDateLocal) {
      filteredPromotion = filteredPromotion.filter(promotion => {
        const start = new Date(startStartDateLocal).getTime()
        const end = new Date(endStartDateLocal).getTime()
        const date = new Date(promotion.startDate).getTime()

        return date >= start && date <= end
      })
    }

    const totalPromotions = filteredPromotion.length

    // total pages
    const totalPages = Math.ceil(totalPromotions / itemsPerPageLocal)

    return res(
      ctx.status(200),
      ctx.json({
        users: paginateArray(filteredPromotion, itemsPerPageLocal, pageLocal),
        totalPages,
        totalPromotions,
        page: pageLocal > Math.ceil(totalPromotions / itemsPerPageLocal) ? 1 : page,
      }),
    )
  }),

  // Get Single User Detail
  rest.get(('/api/apps/promotions/:id'), (req, res, ctx) => {
    const promotionId = Number(req.params.id)

    const promo = db.find(e => e.id === promotionId)

    if (!promo) {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'Promotion not found',
        }),
      )
    }
    else {
      return res(
        ctx.status(200),
        ctx.json(
          {
            ...promo,
            ...{
              taskDone: 1230,
              projectDone: 568,
              taxId: 'Tax-8894',
              language: 'English',
            },
          },
        ),
      )
    }
  }),

  // Delete User
  rest.delete(('/api/apps/promotions/:id'), (req, res, ctx) => {
    const promotionId = Number(req.params.id)

    const promoIndex = db.findIndex(e => e.id === promotionId)

    if (promoIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'User not found',
        }),
      )
    }
    else {
      db.splice(promoIndex, 1)

      return res(
        ctx.status(204),
      )
    }
  }),

  // 👉 Add user
  rest.post(('/api/apps/promotions'), async (req, res, ctx) => {
    const promo = await req.json() as any

    db.push({
      ...promo,
      id: db.length + 1,
    })

    return res(
      ctx.status(201),
      ctx.json({ body: promo }),
    )
  }),
]
