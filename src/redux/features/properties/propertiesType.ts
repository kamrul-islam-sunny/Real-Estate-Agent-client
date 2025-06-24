

export interface IPropertyGetReq {
  name?: string;
  page?: number;
  limit?: number;
  location?: string;
  type?: string;
  slug?: string;
  sale?: string;
  minPrice?: string;
  maxPrice?: string;
  bedrooms?: string;
  bathrooms?: string;
  squareFeet?: string;
  parking?: boolean;
  amenities?: string[];

}
export interface IPropertyGetRes {
  success: boolean;
  statusCode: number;
  message: string;
  payload: {
    data: IProperty[]; 
    pagination: IPagination;
  };
}

export interface IProperty {
  _id: string;
  name: string;
  location: string;
  image: string[];
  description: string;
  details: {
    label: string;
    value: string;
    _id: string;
  }[];
  price: string;
  sale: string;
  video: string;
  slug: string;
  type: string;
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