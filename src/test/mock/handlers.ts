import { http, HttpResponse } from 'msw';
import { PREFECTURES_RESPONSE } from './responseData';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/api/v1/prefectures`, () => {
    return HttpResponse.json(PREFECTURES_RESPONSE);
  }),
];
