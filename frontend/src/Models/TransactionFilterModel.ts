// Contains the ids of the filtered fields, which can be used
// in database query filtering
export interface IFilters {
  accounts: string[];
  categories: string[];
  transactionTypes: string[];
  tags: string[];
}
export type FilterKeys = keyof IFilters;

export interface IKeyValuePair<K, V> {
  key: K;
  value: V;
}

export type FilterItem = IKeyValuePair<string, string>;
export type FilterItemArray = FilterItem[];

export interface IFilterItems {
  accounts: FilterItemArray;
  categories: FilterItemArray;
  transactionTypes: FilterItemArray;
  tags: FilterItemArray;
}

export const emptyFilterObject: IFilters = {
  accounts: [],
  categories: [],
  transactionTypes: [],
  tags: []
};
