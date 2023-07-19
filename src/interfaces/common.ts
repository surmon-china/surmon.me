export interface UniversalKeyValue {
  name: string
  value: string
}

export interface Pagination {
  current_page: number
  total_page: number
  per_page: number
  total: number
}

export interface PaginationList<D> {
  data: Array<D>
  pagination: Pagination
}
