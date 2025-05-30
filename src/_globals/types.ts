export type SortOrder = "asc" | "desc";
export type GetListParams<A, B> = {
  sortBy?: A;
  sortOrder?: SortOrder;
  query?: B;
};

export type EnumQueryType<T> = {
  in?: T[];
  notIn?: T[];
  not?: T;
};

export type StringArrayQueryType<T = string> = {
  has?: T[];
  hasEvery?: T[];
  hasSome?: T[];

  equals?: T[];

  isEmpty?: boolean;
};

export type DateQueryType = {
  in?: Date[];
  notIn?: Date[];
  not?: Date;

  gt?: Date;
  gte?: Date;
  lt?: Date;
  lte?: Date;
};

export type OptionalDateQueryType = DateQueryType & {
  isSet: boolean;
};
