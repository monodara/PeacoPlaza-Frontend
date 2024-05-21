import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ProductType } from "../misc/type";
import { ProductReadDto } from "../features/products/productDto";

export function useFetchSingleProduct(url: string) {
  //state
  const [product, setProduct] = useState<ProductReadDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response: AxiosResponse<ProductReadDto>) => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);
  return { product, loading, error };
}
