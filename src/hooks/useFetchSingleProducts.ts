import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ProductType } from "../misc/type";

export function useFetchSingleProduct(url: string) {
  //state
  const [product, setBrewery] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response: AxiosResponse<ProductType>) => {
        setBrewery(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);
  return { product, loading, error };
}
