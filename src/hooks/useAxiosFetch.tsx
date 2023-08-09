import { useState, useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = (dataurl: string) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    // Function to fetch data from the specified URL
    const fetchData = async (url: string) => {
      setIsLoading(true);
      try {
        const response = await axios.get(url);
        setData(response.data);
        setFetchError(null);
      } catch (err) {
        setFetchError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    if (typeof window !== 'undefined') {
      fetchData(dataurl);
    }
  }, [dataurl]);

  return { data, fetchError, isLoading };
};

export default useAxiosFetch;
