export interface CurrencyInfo {
  amount?: string;
  currency?: string;
}

export interface TransactionItem {
  id?: string;
  key?: string;
  creationDate?: string;
  payDate?: string;
  state?: string;
  payedToId?: string;
  fiat?: CurrencyInfo;
  crypto?: CurrencyInfo;
}

export interface Pagination {
    pageSize?: number,
    current?: number,
    total?: number,
    rows?: TransactionItem[]
}