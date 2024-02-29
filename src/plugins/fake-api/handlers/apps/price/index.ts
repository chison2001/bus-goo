import is from '@sindresorhus/is'
import destr from 'destr'
import { rest } from 'msw'
import { db } from '@db/apps/price/db'
import { paginateArray } from '@api-utils/paginateArray'

export const handlerAppsPrice = [
  // Get Users Details
  rest.get(('/api/apps/prices'), (req, res, ctx) => {
    const q = req.url.searchParams.get('q')
    const fromDate = req.url.searchParams.get('fromDate')
    const toDate = req.url.searchParams.get('toDate')
    const status = req.url.searchParams.get('status')
    const selectedFromDateRange = req.url.searchParams.get('selectedFromDateRange')
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

    const parsedFromDateRange = destr(selectedFromDateRange) as unknown as { start?: string; end?: string }
    const startFromDateLocal = parsedFromDateRange?.start
    const endFromDateLocal = parsedFromDateRange?.end

    // filter users
    let filteredPrice = db.filter(price => ((price.priceCode.toLowerCase().includes(queryLower) && price.fromDate === (fromDate || price.fromDate) && price.toDate === (toDate || price.toDate) && price.status === (status || price.status)))).reverse()

    // sort users
    if (sortByLocal) {
      console.log(sortByLocal)
      if (sortByLocal === 'code') {
        filteredPrice = filteredPrice.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.priceCode.localeCompare(b.priceCode)
          else
            return b.priceCode.localeCompare(a.priceCode)
        })
      }
      else if (sortByLocal === 'status') {
        filteredPrice = filteredPrice.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.status.localeCompare(b.status)
          else
            return b.status.localeCompare(a.status)
        })
      }
      else if (sortByLocal === 'id') {
        filteredPrice = filteredPrice.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.id - b.id

          return b.id - a.id
        })
      }
      else if (sortByLocal === 'toDate') {
        filteredPrice = filteredPrice.sort((a, b) => {
          if (orderByLocal === 'asc')
            return new Date(a.toDate).getTime() - new Date(b.toDate).getTime()

          return new Date(b.toDate).getTime() - new Date(a.toDate).getTime()
        })
      }
      else if (sortByLocal === 'fromDate') {
        filteredPrice = filteredPrice.sort((a, b) => {
          if (orderByLocal === 'asc')
            return new Date(a.fromDate).getTime() - new Date(b.fromDate).getTime()

          return new Date(b.fromDate).getTime() - new Date(a.fromDate).getTime()
        })
      }
    }

    // filtering invoices by date
    if (startToDateLocal && endToDateLocal) {
      filteredPrice = filteredPrice.filter(price => {
        const start = new Date(startToDateLocal).getTime()
        const end = new Date(endToDateLocal).getTime()
        const date = new Date(price.toDate).getTime()

        return date >= start && date <= end
      })
    }

    // filtering invoices by date
    if (startFromDateLocal && endFromDateLocal) {
      filteredPrice = filteredPrice.filter(price => {
        const start = new Date(startFromDateLocal).getTime()
        const end = new Date(endFromDateLocal).getTime()
        const date = new Date(price.fromDate).getTime()

        return date >= start && date <= end
      })
    }

    const totalPrices = filteredPrice.length

    // total pages
    const totalPages = Math.ceil(totalPrices / itemsPerPageLocal)

    return res(
      ctx.status(200),
      ctx.json({
        prices: paginateArray(filteredPrice, itemsPerPageLocal, pageLocal),
        totalPages,
        totalPrices,
        page: pageLocal > Math.ceil(totalPrices / itemsPerPageLocal) ? 1 : page,
      }),
    )
  }),

  // Get Single User Detail
  rest.get(('/api/apps/prices/:id'), (req, res, ctx) => {
    const priceId = Number(req.params.id)

    const price = db.find(e => e.id === priceId)

    if (!price) {
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
            ...price,
          },
        ),
      )
    }
  }),

  // Delete User
  rest.delete(('/api/apps/prices/:id'), (req, res, ctx) => {
    const priceId = Number(req.params.id)

    const priceIndex = db.findIndex(e => e.id === priceId)

    if (priceIndex === -1) {
      return res(
        ctx.status(404),
        ctx.json({
          message: 'User not found',
        }),
      )
    }
    else {
      db.splice(priceIndex, 1)

      return res(
        ctx.status(204),
      )
    }
  }),

  // 👉 Add user
  rest.post(('/api/apps/prices'), async (req, res, ctx) => {
    const price = await req.json() as any

    db.push({
      ...price,
      id: db.length + 1,
    })

    return res(
      ctx.status(201),
      ctx.json({ body: price }),
    )
  }),
]
