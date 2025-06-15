import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { apiClient } from '../lib/api';
import { Car, CarMeta, ApiError } from '../types/car';

const DEFAULT_META: CarMeta = { page: 1, last_page: 1 };

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [meta, setMeta] = useState<CarMeta>(DEFAULT_META);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<ApiError | null>(null);

  const searchParams = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1');
  const sort = searchParams.get('sort') || undefined;

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const { data, meta } = await apiClient.getCars({
          page,
          sort,
          signal: controller.signal,
        });
        setCars(data);
        setMeta(meta);
      } catch (err) {
          if (err && typeof err === 'object' && 'name' in err && err.name === 'AbortError') {
                return;
          }
          
          setError(err as ApiError);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    return () => controller.abort();
  }, [page, sort]);

  return { cars, meta, isLoading, error };
};