import React, { useState } from "react";
import Products from "../components/product/Products";
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";
import { ProductType } from "../misc/type";
import SearchBar from "../components/search/SearchBar";

export default function ProductCollect() {
  // userInput
  const [userInput, setUserInput] = useState("");

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
  // console.log(filtered, "filter");

  return (
    <div>
      ProductPage
      <SearchBar />
      <Products />
      <button onClick={sortHandler}>sort</button>
    </div>
  );
}
