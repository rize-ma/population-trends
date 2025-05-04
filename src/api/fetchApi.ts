import type { FetchOptions } from '../types/api';

const fetchCache = new Map<string, unknown>();

export const fetchApi = async <T>(url: string, options: FetchOptions = {}): Promise<T> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!API_KEY) {
    throw new Error('API_KEYが設定されていません');
  }

  if (!API_BASE_URL) {
    throw new Error('ベースURLが設定されていません');
  }

  const { method = 'GET', headers = {}, cache = true } = options;

  const fullUrl = `${API_BASE_URL}${url}`;

  // キャッシュ有効＆キャッシュに存在する場合は即返す
  if (cache && fetchCache.has(fullUrl)) {
    return fetchCache.get(fullUrl) as T;
  }

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
      ...headers,
    },
  });

  if (!response.ok) {
    throw new Error(`APIリクエストが失敗しました: status ${response.status}`);
  }

  const responseData = (await response.json()) as T;

  // キャッシュ対象なら保存
  if (cache) {
    fetchCache.set(fullUrl, responseData);
  }

  return responseData;
};
