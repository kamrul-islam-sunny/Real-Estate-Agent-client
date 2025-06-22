export interface IBlogCreateReq {
    name: string;
    description: string;
    image: string[];
    displayText: string;
    seoDescription: string;
    keyword: string[];
}

export interface IBlogCreateRes {
    success: boolean;
    statusCode: number;
    message: string;
    payload: {
      _id: string;
      name: string;
      displayText: string;
      image: string[];
      description: string;
      seoDescription: string;
      keyword: string[];
      slug: string;
      createdAt: string;
      updatedAt: string; 
      __v: number;
    };
  }

  export interface IFindBlogReq {
    name?: string;
    page?: number;
    limit?: number;
  }

  export interface IBlog {
    _id: string;
    name: string;
    displayText: string;
    image: string[];
    description: string;
    seoDescription: string;
    keyword: string[];
    slug: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    image_alt: string;
  }
  
  export interface IPagination {
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
  
  export interface IFindBlogRes { 
    success: boolean;
    statusCode: number;
    message: string;
    payload: {
      findEdBlog: IBlog[];
      pagination: IPagination;
    };
  }

  export interface IFindSingleBlogRes {
    success: boolean;
    statusCode: number;
    message: string;
    payload: {
      findEdBlog: IBlog;
    };
  }
  