export interface IAddTeamMember{
    name:string;
    designation:string;
    image:string;
}

export interface IGetTeamMember{
    _id:string;
    name:string;
    designation:string;
    image:string;
}

export interface IFindTeamReq {
    page?: number;
    limit?: number;
    name?: string;
}

export interface ITeam {
    _id: string;
    name: string;
    designation: string;
    image: string;
    createdAt: string;
    slug: string;
    updatedAt: string;
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

export interface ITeamResponse {
    success: boolean;
    statusCode: number;
    message: string;
    payload: {
    findEdTeam: ITeam[];
      pagination: IPagination;
    };
}