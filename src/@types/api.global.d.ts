declare namespace API {
  type Generic<T> = {
    payload: T;
    message: string;
  };

  type GetResponse<T> = Generic<T> & {
    data: {
      items: T;
    };
  };

  type PaginationResponse = {
    hasNextPage: boolean;
    totalItems: number;
  };

  type GetResponseWithPagination<T> = {
    pageParams: Array<Pagination>;
    pages: Array<
      Generic<T> & {
        data: {
          items: T;
        };
        pagination: PaginationResponse;
      }
    >;
  };

  type PostResponse<T> = Generic<T>;
  type DeleteResponse<T> = Generic<T>;

  type ErrorResponse = {
    message: string;
  };

  type DeleteContextType<T> = {
    oldValues: T;
  };

  type Response<T = unknown> = {
    data: T;
    message: string;
    pagination?: {
      hasNextPage: boolean;
      totalItems: number;
    };
  };

  type Pagination = {
    page?: number;
    take?: number;
  };

  type Resp<T = unknown> = T;
}