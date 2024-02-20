import { useEffect, useState } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

import { ProductType } from "../misc/type";

export function useFetch(url: string) {
  //state
  const [breweries, setBreweries] = useState<ProductType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(url)
      .then((response: AxiosResponse<ProductType[]>) => {
        setBreweries(response.data);
        setLoading(false);
      })
      .catch((error: AxiosError) => {
        setError(error.message);
        setLoading(false);
      });
  }, [url]);
  return { breweries, loading, error };
}
