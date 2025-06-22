import { realEstateApi } from "@/redux/api/baseApi";
import { IBlogCreateReq, IBlogCreateRes, IFindBlogReq, IFindBlogRes, IFindSingleBlogRes } from "./blogType";

const blogApi = realEstateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleCreateBlog: builder.mutation<IBlogCreateRes, IBlogCreateReq>({
      query: (payload) => {
        return {
          url: "/blog/create",
          method: "POST", 
          body:payload,
        };
      },
    }),

    handleFindBlog: builder.query<IFindBlogRes, IFindBlogReq>({
      query: ({name,page=1,limit=10}) => {
        return {
          url: "/blog/find",
          method: "GET", 
          params:{
            name,
            page,
            limit
          }
        };
      },
    }),   
      
    handleFindSingleBlog: builder.query<IFindSingleBlogRes, any>({
      query: (slug) => {
        return {
          url: `/blog/find/${slug}`,
          method: "GET", 
        };
      },
    }),

    handleDeleteBlog: builder.mutation<any, any>({
      query: (id) => {
        return {
          url:`/blog/delete/${id}`,
          method: "DELETE", 
        };
      },
    }),
    
    handleUpdateBlog: builder.mutation<any, any>({
      query: ({payload,id}) => {
        return {
          url: `/blog/update/${id}`,
          method: "PUT", 
          body:payload,
        };
      },
    }),

  }),
  overrideExisting: false,
});

export const {
useHandleCreateBlogMutation,
useHandleFindBlogQuery,
useHandleDeleteBlogMutation,
useHandleFindSingleBlogQuery,
useHandleUpdateBlogMutation,
} = blogApi;
