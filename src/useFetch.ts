import { useState, useEffect } from 'react';
import { ITodo } from './types/todo'; // Import Todo interface from its definition

const useFetch = (url: string, page: number = 1) => {
  const [data, setData] = useState<ITodo[]>([]); 
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result: ITodo[] = await response.json();
      const slicedData = result.slice((page - 1) * 10, page * 10);
      setData(slicedData)
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, url]);

  return { data, error, loading };
};

export default useFetch;
