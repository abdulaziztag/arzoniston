export interface IPagination<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ITimestamps {
  created: string;
  updated: string;
}
