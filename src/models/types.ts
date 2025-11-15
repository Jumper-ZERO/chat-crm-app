export type Pagination<T> = {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

export type SortQueryParam = {
  id: string
  desc: boolean
}

export interface QueryParams {
  page: number;
  perPage: number;
  sort: SortQueryParam[];
}
