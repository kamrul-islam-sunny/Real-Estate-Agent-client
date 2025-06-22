import { configureStore } from "@reduxjs/toolkit";
import { realEstateApi } from "../api/baseApi";


export const store = configureStore({
  reducer: {
    [realEstateApi.reducerPath]: realEstateApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(realEstateApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
