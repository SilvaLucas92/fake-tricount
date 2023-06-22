import axios from "axios";
import { useCallback, useEffect, useState } from "react";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [refetchData, setRefetchData] = useState<number>(0);

  const refetch = () => {
    setRefetchData((prev) => prev + 1);
  };

  const apiCall = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      if (!response.data) {
        throw new Error("Something went wrong!");
      }
      setData(response.data);
    } catch (error) {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  useEffect(() => {
    apiCall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refetchData]);

  return {
    data,
    error,
    isLoading,
    refetch,
  };
};

export default useFetch;
