import type { FetchOptions } from '../../types/api';
import type { FetchPopulationResponse, PopulationResult } from '../../types/population';
import { fetchApi } from '../fetchApi';

export const fetchPopulation = async (
  prefCode: number,
  options: FetchOptions = {},
): Promise<PopulationResult> => {
  const res = await fetchApi<FetchPopulationResponse>(
    `/api/v1/population/composition/perYear?prefCode=${prefCode}`,
    {
      ...options,
      method: 'GET',
    },
  );
  return res.result;
};
