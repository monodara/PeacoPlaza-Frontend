import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductType } from "../misc/type";

const productQueries = createApi({
  //base query for all the api calls inside this createApi
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1/products",
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    /** a hook is created from dispatch, async thunk action -> return data, error, loading*/
    fetchAllProducts: builder.query<ProductType[], void>({
      query: () => "",
      providesTags: ["Products"],
    }),

    updateProduct: builder.mutation<ProductType, number>({
      query: (productId) => ({ url: `${productId}`, method: "PUT" }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation<boolean, number>({
      query: (productId) => ({ url: `${productId}`, method: "DELETE" }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const { useFetchAllProductsQuery, useDeleteProductMutation } =
  productQueries;
export default productQueries;
