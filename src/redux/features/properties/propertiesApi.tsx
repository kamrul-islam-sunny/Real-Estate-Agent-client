import { realEstateApi } from "@/redux/api/baseApi";
import { IPropertyGetReq, IPropertyGetRes } from "./propertiesType";
// import { IPropertyReq, IPropertyRes } from "./propertiesType";

const propertiesApi = realEstateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleCreateProperties: builder.mutation<any, any>({
      query: (payload) => {
        return {
          url: "/property/create",
          method: "POST",
          body: payload,
        };
      },
    }),
    handleGetProperties: builder.query<IPropertyGetRes, IPropertyGetReq>({
      query: ({ name, page = 1, limit = 10, location, type, sale, minPrice, maxPrice,  bedrooms,
      bathrooms,
      squareFeet,
      parking,
       }) => {
        return {
          url: "/property/find",
          method: "GET",
          params: {
            name,
            page,
            limit,
            location,
            type,
            sale,
            minPrice,
            maxPrice,
            bedrooms,
            bathrooms,
            squareFeet,
            parking,
          },
        };
      },
    }),

    handleFindSingleProperties: builder.query<any, any>({
      query: (slug) => {
        return {
          url: `/property/find/${slug}`,
          method: "GET",
        };
      },
    }),

    handleUpdateProperties: builder.mutation<any, any>({
      query: ({ payload, id }) => {
        return {
          url: `/property/update/${id}`,
          method: "PUT",
          body: payload,
        };
      },
    }),

    handleDeleteProperties: builder.mutation<any, any>({
      query: (id) => {

        return {
          url: `/property/delete/${id}`,
          method: "DELETE",

        };
      },
    }),

    handleFindLocationProperties: builder.query<any, any>({
      query: ({ location }) => {
        return {
          url: `/property/find-location`,
          method: "GET",
          params: {
            location,
          }
        };
      },
    }),

  }),
  overrideExisting: false,
});

export const {
  useHandleCreatePropertiesMutation,
  useHandleGetPropertiesQuery,
  useHandleFindSinglePropertiesQuery,
  useHandleUpdatePropertiesMutation,
  useHandleDeletePropertiesMutation,
  useHandleFindLocationPropertiesQuery
} = propertiesApi;
