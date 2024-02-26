import is from '@sindresorhus/is'
import destr from 'destr'
import { rest } from 'msw'
import { paginateArray } from '@api-utils/paginateArray'
import { database } from '@/plugins/fake-api/handlers/apps/reservation/db'

export const handlerAppsTicket = [

  // 👉 Ticket
  // Get Ticket List
  rest.get(('/api/apps/invoice'), (req, res, ctx) => {
    const q = req.url.searchParams.get('q')
    const status = req.url.searchParams.get('status')
    const selectedOrderDateRange = req.url.searchParams.get('selectedOrderDateRange')
    const selectedStartDateRange = req.url.searchParams.get('selectedStartDateRange')
    const page = req.url.searchParams.get('page')
    const itemsPerPage = req.url.searchParams.get('itemsPerPage')
    const sortBy = req.url.searchParams.get('sortBy')
    const orderBy = req.url.searchParams.get('orderBy')

    const searchQuery = is.string(q) ? q : undefined
    const queryLowered = (searchQuery ?? '').toString().toLowerCase()

    const parsedSortBy = destr(sortBy)
    const sortByLocal = is.string(parsedSortBy) ? parsedSortBy : ''

    const parsedOrderBy = destr(orderBy)
    const orderByLocal = is.string(parsedOrderBy) ? parsedOrderBy : ''

    const parsedItemsPerPage = destr(itemsPerPage)
    const parsedPage = destr(page)

    const itemsPerPageLocal = is.number(parsedItemsPerPage) ? parsedItemsPerPage : 10
    const pageLocal = is.number(parsedPage) ? parsedPage : 1

    const parsedOrderDateRange = destr(selectedOrderDateRange) as unknown as { start?: string; end?: string }
    const startDateLocal = parsedOrderDateRange?.start
    const endDateLocal = parsedOrderDateRange?.end

    const parsedStartDateRange = destr(selectedStartDateRange) as unknown as { start?: string; end?: string }
    const startStartDateLocal = parsedStartDateRange?.start
    const endStartDateLocal = parsedStartDateRange?.end

    // Filtering invoices
    let filteredInvoices = database.filter(
      invoice => (
        (
          invoice.client.fullName.toLowerCase().includes(queryLowered)
                  || invoice.id.toString().includes(queryLowered)
        )
              && invoice.status === (status || invoice.status)
      ),

    ).reverse()

    // Sorting invoices
    if (sortByLocal) {
      if (sortByLocal === 'client') {
        filteredInvoices = filteredInvoices.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.client.fullName.localeCompare(b.client.fullName)

          return b.client.fullName.localeCompare(a.client.fullName)
        })
      }
      else if (sortByLocal === 'total') {
        filteredInvoices = filteredInvoices.sort((a, b) => {
          if (orderByLocal === 'asc')
            return a.total - b.total

          return b.total - a.total
        })
      }
      else if (sortByLocal === 'orderDate') {
        filteredInvoices = filteredInvoices.sort((a, b) => {
          if (orderByLocal === 'asc')
            return new Date(a.orderDate).getTime() - new Date(b.orderDate).getTime()

          return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
        })
      }
      else if (sortByLocal === 'startDate') {
        filteredInvoices = filteredInvoices.sort((a, b) => {
          if (orderByLocal === 'asc')
            return new Date(a.startDate).getTime() - new Date(b.startDate).getTime()

          return new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
        })
      }
    }

    // filtering invoices by date
    if (startDateLocal && endDateLocal) {
      filteredInvoices = filteredInvoices.filter(invoiceObj => {
        const start = new Date(startDateLocal).getTime()
        const end = new Date(endDateLocal).getTime()
        const issuedDate = new Date(invoiceObj.orderDate).getTime()

        return issuedDate >= start && issuedDate <= end
      })
    }

    // filtering invoices by date
    if (startStartDateLocal && endStartDateLocal) {
      filteredInvoices = filteredInvoices.filter(invoiceObj => {
        const start = new Date(startStartDateLocal).getTime()
        const end = new Date(endStartDateLocal).getTime()
        const issuedDate = new Date(invoiceObj.startDate).getTime()

        return issuedDate >= start && issuedDate <= end
      })
    }

    const totalInvoices = filteredInvoices.length

    return res(
      ctx.status(200),
      ctx.json(
        {
          invoices: paginateArray(filteredInvoices, itemsPerPageLocal, pageLocal),
          totalInvoices,
        },
      ),
    )
  }),

  // Get Single Invoice
  rest.get(('/api/apps/invoice/:id'), (req, res, ctx) => {
    const invoiceId = req.params.id

    const invoice = database.find(e => e.id === String(invoiceId))

    if (!invoice) {
      return res(
        ctx.status(404),
        ctx.json({ message: 'No invoice found with this id' }),
      )
    }

    const responseData = {
      invoice,
      paymentDetails: {
        totalDue: '$12,110.55',
        bankName: 'American Bank',
        country: 'United States',
        iban: 'ETD95476213874685',
        swiftCode: 'BR91905',
      },
    }

    return res(
      ctx.status(200),
      ctx.json(responseData),
    )
  }),

  // Delete Invoice
  rest.delete(('/api/apps/invoice/:id'), (req, res, ctx) => {
    const invoiceId = req.params.id

    const invoiceIndex = database.findIndex(e => e.id === String(invoiceId))

    if (invoiceIndex >= 0) {
      database.splice(invoiceIndex, 1)

      return res(
        ctx.status(200),
      )
    }

    return res(
      ctx.status(404),
      ctx.json({ error: 'something went wrong' }),
    )
  }),

  // 👉 Add Invoice
  rest.post(('/api/apps/invoice'), async (req, res, ctx) => {
    const user = await req.json() as any

    const id = 'RE-'

    database.push({
      ...user,
      id: id.concat(String(database.length + 1)),
    })

    return res(
      ctx.status(201),
      ctx.json({ body: user }),
    )
  }),
]
