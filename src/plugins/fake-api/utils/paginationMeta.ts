export const paginationMeta = <T extends { page: number; itemPerPage: number }>(options: T, total: number) => {
  const start = (options.page - 1) * options.itemPerPage + 1
  const end = Math.min(options.page * options.itemPerPage, total)

  return `Đang hiển thị ${total === 0 ? 0 : start} tới ${end} của ${total} dòng`
}
