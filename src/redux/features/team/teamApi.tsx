import { realEstateApi } from "@/redux/api/baseApi";
import { IAddTeamMember, IFindTeamReq, IGetTeamMember, ITeamResponse } from "./teamType";

const teamApi = realEstateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleAddTeamMember: builder.mutation<IGetTeamMember,IAddTeamMember>({
      query: (member) => {
        return {
          url: "/team/create",
          method: "POST",
          body: member,
        };
      },
    }),
    handleFindTeamMember: builder.query<ITeamResponse,IFindTeamReq>({
      query: ({name,page=1,limit=10,}) => {
        return {
          url: "/team/find",
          method: "GET",
          params:{
            name,
            page,
            limit,
          }
        };
      },
    }),

    handleFindSingleTeamMember: builder.query<any,any>({
      query: (slug) => {
        return {
          url: `/team/find/${slug}`,
          method: "GET",
        };
      },
    }),

    handleUpdateTeamMember: builder.mutation<any,any>({
      query: ({payload,id}) => {
        console.log({id,payload});
        return {
          url: `/team/update/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),

    handleDeleteTeamMember: builder.mutation<any,any>({
      query: (id) => {
        return {
          url: `/team/delete/${id}`,
          method: "DELETE",
        };
      },
    }),

  }),
  overrideExisting: false,
});

export const {
useHandleAddTeamMemberMutation,
useHandleFindTeamMemberQuery,
useHandleFindSingleTeamMemberQuery,
useHandleUpdateTeamMemberMutation,
useHandleDeleteTeamMemberMutation
} = teamApi;
