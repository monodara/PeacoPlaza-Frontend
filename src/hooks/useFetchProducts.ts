import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { ProductType } from "../misc/type";

export function useFetchProducts(url: string) {
    //state
  const [products, setProducts] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response: AxiosResponse<ProductType[]>) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);
  return { products, loading, error };
}

