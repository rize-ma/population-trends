import { http, HttpResponse } from 'msw';
import { POPULATION_RESPONSE, PREFECTURES_RESPONSE } from './responseData';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const handlers = [
  http.get(`${baseUrl}/api/v1/prefectures`, () => {
    return HttpResponse.json(PREFECTURES_RESPONSE);
  }),
  http.get(`${baseUrl}/api/v1/population/composition/perYear`, ({ request }) => {
    const url = new URL(request.url);
    const prefCode = Number(url.searchParams.get('prefCode'));
    if (!prefCode) {
      return HttpResponse.json(
        { message: 'prefCode parameter is required', result: null },
        { status: 400 },
      );
    }
    if (prefCode >= 1 && prefCode <= 47) {
      return HttpResponse.json(POPULATION_RESPONSE);
    } else if (prefCode) {
      return HttpResponse.json(
        { message: `Population data not found for prefCode: ${prefCode}`, result: null },
        { status: 404 },
      );
    }
  }),
];
