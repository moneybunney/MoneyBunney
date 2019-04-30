import { useEffect, useState } from "react";
import { getAccounts, getCategories, getTags } from "../Utilities/Api";

const useApi = <S, A extends any[]>(
  apiMethod: (...args: A) => Promise<S>,
  initialState: S,
  ...args: A
) => {
  const [data, setData] = useState<S>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  console.log(args);

  useEffect(() => {
    (async () => {
      try {
        const apiData = await apiMethod(...args);
        setData(apiData);
      } catch (error) {
        setError(`${(error && error.message) || error || "Error"}`);
      }
      setLoading(false);
    })();
  }, args);

  return {
    data,
    loading,
    error
  };
};

export default useApi;

export const useAccounts = () => useApi(getAccounts, []);
export const useCategories = () => useApi(getCategories, []);
export const useTags = () => useApi(getTags, []);
