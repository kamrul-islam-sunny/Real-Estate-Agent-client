export interface ICreateContact {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  isRead: boolean;
  isImportant: boolean;
  phone: string;
}
// IFindContactReq
export interface IFindContactReq {
  name?: string;
  page?: number;
  limit?: number;
  isRead?: boolean | string;
  isImportant?: boolean | string;
}
// IFindContactRes
export interface IFindContactRes {
  success: boolean;
  statusCode: number;
  message: string;
  payload: {
    data: IContact[];
    pagination: IPagination;
  };
}

export interface IContact {
  _id: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  isRead: boolean;
  isImportant: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IPagination {
  totalPages: number;
  currentPage: number;
  prevPage: number | null;
  nextPage: number | null;
  totalCount: number;
  limit: number;
  skip: number;
  dataPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  hasMoreItems: boolean;
  hasLessItems: boolean;
}
