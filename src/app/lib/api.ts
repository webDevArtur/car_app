import { ApiError, Car, CarMeta } from '../types/car';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://testing-api.ru-rating.ru';
const PAGE_LIMIT = 12;

export interface CarsApiResponse {
  data: Car[];
  meta: CarMeta;
}

interface ApiClient {
  getCars: (params: {
    page: number;
    sort?: string;
    signal?: AbortSignal;
  }) => Promise<CarsApiResponse>;
}

export const createApiClient = (baseUrl: string): ApiClient => ({
  getCars: async ({ page, sort, signal }) => {
    const params = new URLSearchParams({
      _limit: PAGE_LIMIT.toString(),
      _page: page.toString(),
    });

    if (sort) {
      const [field, order] = sort.split('-');
      params.append('_sort', field);
      params.append('_order', order);
    }

    const response = await fetch(`${baseUrl}/cars?${params.toString()}`, { signal });

    if (!response.ok) {
      const error: ApiError = {
        message: `Ошибка ${response.status}: ${response.statusText}`,
        status: response.status,
      };
      throw error;
    }

    return response.json();
  },
});

export const apiClient = createApiClient(API_BASE_URL);