import { describe, expect, test, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mock/server';
import { PREFECTURES_RESPONSE } from '../../test/mock/responseData';
import { fetchPrefectures } from './prefecture';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const prefecturesData = PREFECTURES_RESPONSE.result;

describe('fetchPrefectures', () => {
  test('正常に都道府県データを取得できる', async () => {
    const result = await fetchPrefectures({ cache: false });
    expect(result).toEqual(prefecturesData);
  });
  test('キャッシュが使用されている場合、2回目のリクエストではモックの変更が反映されない', async () => {
    // 1回目のリクエスト：正常レスポンスを返す
    const firstResult = await fetchPrefectures({ cache: true });
    expect(firstResult).toEqual(prefecturesData);

    // 2回目以降のAPIレスポンスをエラーに変更（これが使われたらテスト失敗）
    server.use(
      http.get(`${baseUrl}/api/v1/prefectures`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    );

    // キャッシュが効いているならば、APIは呼ばれずエラーにもならない
    const secondResult = await fetchPrefectures({ cache: true });
    expect(secondResult).toEqual(prefecturesData);
  });
  test('リクエストに失敗した場合にエラーをスローする', async () => {
    server.use(
      http.get(`${baseUrl}/api/v1/prefectures`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    );
    await expect(fetchPrefectures({ cache: false })).rejects.toThrow(
      'APIリクエストが失敗しました: status 500',
    );
  });
  test('API_KEY が設定されていない場合にエラーをスローする', async () => {
    vi.stubEnv('VITE_API_KEY', '');
    await expect(fetchPrefectures({ cache: false })).rejects.toThrow('API_KEYが設定されていません');
  });
  test('API_BASE_URL が設定されていない場合にエラーをスローする', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    await expect(fetchPrefectures({ cache: false })).rejects.toThrow(
      'ベースURLが設定されていません',
    );
  });
});
