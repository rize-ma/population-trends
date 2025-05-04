export const fetchApi = async <T>(url: string): Promise<T> => {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  if (!API_KEY) {
    throw new Error('API_KEYが設定されていません');
  }

  if (!API_BASE_URL) {
    throw new Error('ベースURLが設定されていません');
  }

  const fullUrl = `${API_BASE_URL}${url}`;

  const response = await fetch(fullUrl, {
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': API_KEY,
    },
  });

  if (!response.ok) {
    throw new Error(`APIリクエストが失敗しました: status ${response.status}`);
  }

  const responseData = (await response.json()) as T;

  return responseData;
};
