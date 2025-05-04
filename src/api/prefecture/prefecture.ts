import type { FetchPrefecturesResponse, PrefectureResult } from '../../types/prefecture';
import { fetchApi } from '../fetchApi';

export const fetchPrefectures = async (): Promise<PrefectureResult> => {
  const res = await fetchApi<FetchPrefecturesResponse>('/api/v1/prefectures');
  return res.result;
};
