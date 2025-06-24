import { realEstateApi } from "@/redux/api/baseApi";
import { IFindContactReq, IFindContactRes } from "./contactType";

const ContactApi = realEstateApi.injectEndpoints({
  endpoints: (builder) => ({
    handleCreateContact: builder.mutation<any, any>({
      query: (payload) => {
        console.log(payload)
        return {
          url: "/contact/create",
          method: "POST", 
          body:payload,
        };
      },
    }),

    handleFindContact: builder.query<IFindContactRes, IFindContactReq>({
      query: ({name,page=1,limit=10,isRead,isImportant}) => {
        return {
          url: "/contact/find",
          method: "GET", 
          params:{
            name,
            page,
            limit,
            isRead,
            isImportant
          }
        };
      },
    }),

    handleDeleteContact: builder.mutation<any, any>({
        query: (id) => {
          return {
            url: `/contact/delete/${id}`,
            method: "DELETE", 
          };
        },
      }),

    handleUpdateContact: builder.mutation<any, any>({
        query: ({
          contactId,
          isRead,
          isImportant,
        }) => {
          console.log( contactId, isRead,isImportant,);
          return {
            url: `/contact/update/${contactId}`,
            method: "PUT", 
            body: {isRead: isRead, isImportant:isImportant},
          };
        },
      }),
      
  }),
  overrideExisting: false,
});
 
export const {
useHandleCreateContactMutation,
useHandleFindContactQuery,
useHandleDeleteContactMutation,
useHandleUpdateContactMutation,
} = ContactApi;
