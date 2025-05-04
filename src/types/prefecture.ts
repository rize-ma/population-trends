export interface Prefecture {
  prefCode: number;
  prefName: string;
}

export type PrefectureResult = Prefecture[];

export interface FetchPrefecturesResponse {
  message: string | null;
  result: PrefectureResult;
}

export type Region =
  | 'hokkaido'
  | 'tohoku'
  | 'kanto'
  | 'chubu'
  | 'kansai'
  | 'chugoku'
  | 'shikoku'
  | 'kyushu';
