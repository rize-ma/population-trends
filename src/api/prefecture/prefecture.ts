import type { FetchOptions } from '../../types/api';
import type { FetchPrefecturesResponse, PrefectureResult } from '../../types/prefecture';
import { fetchApi } from '../fetchApi';

export const fetchPrefectures = async (options: FetchOptions = {}): Promise<PrefectureResult> => {
  const res = await fetchApi<FetchPrefecturesResponse>('/api/v1/prefectures', {
    ...options,
    method: 'GET',
  });
  return res.result;
};
