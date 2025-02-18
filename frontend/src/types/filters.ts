export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterGroup {
  id: string;
  label: string;
  options: FilterOption[];
}

export interface SortOption extends FilterOption {
  direction?: 'asc' | 'desc';
}

export interface FilterState {
  [key: string]: string[];
}

export interface SearchFilters {
  query?: string;
  filters?: FilterState;
  sort?: string;
  page?: number;
  limit?: number;
} 