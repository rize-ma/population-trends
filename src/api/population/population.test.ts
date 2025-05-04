import { describe, expect, test, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mock/server';
import { POPULATION_RESPONSE } from '../../test/mock/responseData';
import { fetchPopulation } from './population';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const populationData = POPULATION_RESPONSE.result;

describe('fetchPopulation', () => {
  test('正常に人口構成データを取得できる', async () => {
    const prefCode = 1;
    const result = await fetchPopulation(prefCode, { cache: false });
    expect(result).toEqual(populationData);
  });
  test('キャッシュが使用されている場合、2回目のリクエストではモックの変更が反映されない', async () => {
    const prefCode = 1;
    // 1回目のリクエスト：正常レスポンスを返す
    const firstResult = await fetchPopulation(prefCode, { cache: true });
    expect(firstResult).toEqual(populationData);

    // 2回目以降のAPIレスポンスをエラーに変更（これが使われたらテスト失敗）
    server.use(
      http.get(`${baseUrl}/api/v1/prefectures`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    );

    // キャッシュが効いているならば、APIは呼ばれずエラーにもならない
    const secondResult = await fetchPopulation(prefCode, { cache: true });
    expect(secondResult).toEqual(populationData);
  });
  test('APIが失敗した場合にエラーをスローする', async () => {
    const prefCode = 1;
    server.use(
      http.get(`${baseUrl}/api/v1/population/composition/perYear`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    );

    await expect(fetchPopulation(prefCode, { cache: false })).rejects.toThrow(
      'APIリクエストが失敗しました: status 500',
    );
  });
  test('prefCodeが指定されていない場合エラーを返す', async () => {
    server.use(
      http.get(`${baseUrl}/api/v1/population/composition/perYear`, ({ request }) => {
        const url = new URL(request.url);
        const prefCode = url.searchParams.get('prefCode');
        if (typeof undefined === prefCode) {
          return HttpResponse.json({ message: 'prefCode is required' }, { status: 400 });
        }
        return HttpResponse.json({ result: POPULATION_RESPONSE });
      }),
    );

    // undefinedを無理やり渡すためのキャスト
    await expect(fetchPopulation(undefined as unknown as number, { cache: false })).rejects.toThrow(
      'APIリクエストが失敗しました: status 400',
    );
  });
  test('prefCodeが1〜47以外だった場合エラーを返す', async () => {
    const prefCode = 48;

    await expect(fetchPopulation(prefCode, { cache: false })).rejects.toThrow(
      'APIリクエストが失敗しました: status 404',
    );
  });
  test('API_KEY が設定されていない場合にエラーをスローする', async () => {
    vi.stubEnv('VITE_API_KEY', '');
    const prefCode = 1;
    await expect(fetchPopulation(prefCode, { cache: false })).rejects.toThrow(
      'API_KEYが設定されていません',
    );
  });
  test('API_BASE_URL が設定されていない場合にエラーをスローする', async () => {
    vi.stubEnv('VITE_API_BASE_URL', '');
    const prefCode = 1;
    await expect(fetchPopulation(prefCode, { cache: false })).rejects.toThrow(
      'ベースURLが設定されていません',
    );
  });
});
