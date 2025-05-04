import { describe, expect, test, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mock/server';
import { PREFECTURES_RESPONSE } from '../../test/mock/responseData';
import { fetchPrefectures } from './prefecture';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

describe('fetchPrefectures', () => {
  test('正常に都道府県データを取得できる', async () => {
    const result = await fetchPrefectures();
    expect(result).toEqual(PREFECTURES_RESPONSE.result);
  });
  test('リクエストに失敗した場合にエラーをスローする', async () => {
    server.use(
      http.get(`${baseUrl}/api/v1/prefectures`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    );
    await expect(fetchPrefectures()).rejects.toThrow('APIリクエストが失敗しました: status 500');
  });
  test('API_KEY が設定されていない場合にエラーをスローする', async () => {
    vi.stubEnv('VITE_API_KEY', '');
    await expect(fetchPrefectures()).rejects.toThrow('API_KEYが設定されていません');
  });
  test('API_BASE_URL が設定されていない場合にエラーをスローする', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    await expect(fetchPrefectures()).rejects.toThrow('ベースURLが設定されていません');
  });
});
