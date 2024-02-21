import React, { useEffect, useState } from "react";
import Products from "../components/product/Products";
import { Provider, useSelector } from "react-redux";
import store, { AppState } from "../redux/store";
import { CategoryType, ProductType } from "../misc/type";
import SearchBar from "../components/search/SearchBar";
import { useParams, useSearchParams } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";

export default function ProductCollect({ url }: { url: string }) {
  // userInput
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
  // original products
  const result = useSelector((state: AppState) => state.products.products);
  // redux

  // filter logic
  // const filtered = result.filter((product) =>
  //   product.title.toLowerCase().includes(userInput.toLowerCase())
  // );

  // filter: doesnt modify directly to array
  // sort:
  const [sortedArray, setSortedArray] = useState<ProductType[]>([]);
  function sortHandler() {
    const sortedArray = [...result].sort((a, b) => b.price - a.price);
    console.log(sortedArray, "a");
    setSortedArray(sortedArray);
  }

  return (
    <div>
      {category && <p>{category.name}</p>}
      <Products url={url} />
      <button onClick={sortHandler}>sort</button>
    </div>
  );
}
