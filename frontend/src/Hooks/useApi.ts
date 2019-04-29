import { useEffect, useState } from "react";
import { getAccounts, getCategories, getTags } from "../Utilities/Api";

const useApi = <S>(
  apiMethod: (params?: any) => Promise<S>,
  initialState: S,
  params?: any
) => {
  const [data, setData] = useState<S>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(
    () => {
      (async () => {
        try {
          const apiData = await apiMethod(params);
          setData(apiData);
        } catch (error) {
          setError(`${(error && error.message) || error || "Error"}`);
        }
        setLoading(false);
      })();
    },
    params !== undefined ? [params] : []
  );

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
