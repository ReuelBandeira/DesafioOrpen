export abstract class ValidPagination {
  public static from(headers: any) {
    let page: number
    let limit: number

    if (
      !headers.page ||
      !headers.limit ||
      headers.page === '0' ||
      headers.limit === '0' ||
      isNaN(headers.page) ||
      isNaN(headers.limit)
    ) {
      page = 1
      limit = 10
    } else {
      page = Number(headers.page)
      limit = Number(headers.limit)
    }
    return { page, limit }
  }
}

