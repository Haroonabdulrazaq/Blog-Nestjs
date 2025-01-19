export interface Paginated<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemsPerPage: number;
    currentPage: number;
    totalPages: number;
  };
  links: {
    first: string;
    last: string;
    current: string;
    next: string;
    prev: string;
  };
}
