import React, { useEffect, useState } from "react";
import Products from "../components/product/Products";
import { Provider, useSelector } from "react-redux";
import store, { AppState } from "../redux/store";
import { CategoryType, ProductType } from "../misc/type";
import SearchBar from "../components/search/SearchBar";
import { useParams, useSearchParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function ProductCollect({ url }: { url: string }) {
  // get the input from search field
  const [searchParams] = useSearchParams();
  const [category, setCategory] = useState<CategoryType | null>(null);
  const id = searchParams.get("categoryId") || "";
  if (id !== "") {
    const encodedId = encodeURIComponent(id);
    url += `?categoryId=${encodedId}`;
  }
  useEffect(() => {
    if (id !== "") {
      //get category by id
      axios
        .get(`https://api.escuelajs.co/api/v1/categories/${id}`)
        .then((response: AxiosResponse<CategoryType>) => {
          setCategory(response.data);
        })
        .catch((error: AxiosError) => {
          // Handle error if needed
        });
    }
  }, [id]);

  return (
    <div>
      {category && <div className="mt-10">{category.name}</div>}
      {/* <Products url={url} /> */}
    </div>
  );
}
