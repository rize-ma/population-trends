import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mock/server';
import { PREFECTURES_RESPONSE } from '../../test/mock/responseData';
import { REGIONS } from '../../constants/prefectures';
import { usePrefecturesData, usePrefecturesSelection } from './usePrefectures';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const prefecturesData = PREFECTURES_RESPONSE.result;

describe('usePrefecturesData', () => {
  test('正常に都道府県データを取得できる', async () => {
    const { result } = renderHook(() => usePrefecturesData());

    // isLoadingがtrue→falseになるまで待つ
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBeNull();

    expect(result.current.prefecturesData).toEqual(prefecturesData);
  });
  test('APIリクエストが失敗した場合にエラーメッセージが設定される', async () => {
    // MSWでAPIエラーをモック
    server.use(
      http.get(`${baseUrl}/api/v1/prefectures`, () =>
        HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 }),
      ),
    );

    const { result } = renderHook(() => usePrefecturesData({ cache: false }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBe('APIリクエストが失敗しました: status 500');
    expect(result.current.prefecturesData).toHaveLength(0);
  });
});

describe('usePrefecturesSelection', () => {
  test('初期化時に正しいチェックボックスとアコーディオンのデータを返す', () => {
    const setSelectedPrefsMap = vi.fn();
    const selectedPrefCodes = [1];

    const { result } = renderHook(() =>
      usePrefecturesSelection(prefecturesData, selectedPrefCodes, setSelectedPrefsMap),
    );

    expect(result.current.prefCheckboxListProps.checkboxItems).toEqual(
      prefecturesData.map(({ prefCode, prefName }) => ({ label: prefName, value: prefCode })),
    );

    expect(result.current.prefCheckboxListProps.selectedItems).toEqual([1]);
    expect(result.current.prefAccordionListProps.accordionItems).toHaveLength(REGIONS.length);
  });

  test('handlePrefToggle でチェック時に setSelectedPrefsMap が呼ばれる', () => {
    const setSelectedPrefsMap = vi.fn();
    const selectedPrefCodes: number[] = [];

    const { result } = renderHook(() =>
      usePrefecturesSelection(prefecturesData, selectedPrefCodes, setSelectedPrefsMap),
    );

    act(() => {
      result.current.prefCheckboxListProps.onToggle(true, '北海道', 1);
    });

    expect(setSelectedPrefsMap).toHaveBeenCalledTimes(1);
    const updater = setSelectedPrefsMap.mock.calls[0][0];
    const updatedMap = updater(new Map());
    expect(updatedMap.get(1)).toBe('北海道');
  });

  test('handlePrefToggle でチェックを外すと setSelectedPrefsMap が呼ばれ、Mapから削除される', () => {
    const setSelectedPrefsMap = vi.fn();
    const selectedPrefCodes: number[] = [];

    const { result } = renderHook(() =>
      usePrefecturesSelection(prefecturesData, selectedPrefCodes, setSelectedPrefsMap),
    );

    act(() => {
      result.current.prefCheckboxListProps.onToggle(false, '青森県', 2);
    });

    expect(setSelectedPrefsMap).toHaveBeenCalledTimes(1);
    const updater = setSelectedPrefsMap.mock.calls[0][0];
    const oldMap = new Map<number, string>([[2, '青森県']]);
    const updatedMap = updater(oldMap);
    expect(updatedMap.has(2)).toBe(false);
  });

  test('clearSelectedPrefs を呼ぶと Map を空にして setSelectedPrefsMap が呼ばれる', () => {
    const setSelectedPrefsMap = vi.fn();

    const { result } = renderHook(() =>
      usePrefecturesSelection(prefecturesData, [], setSelectedPrefsMap),
    );

    act(() => {
      result.current.clearSelectedPrefs();
    });

    expect(setSelectedPrefsMap).toHaveBeenCalledWith(new Map());
  });

  test('prefCode が string の場合は何もしない', () => {
    const setSelectedPrefsMap = vi.fn();

    const { result } = renderHook(() =>
      usePrefecturesSelection(prefecturesData, [], setSelectedPrefsMap),
    );

    act(() => {
      result.current.prefCheckboxListProps.onToggle(true, '北海道', 'invalid_code');
    });

    expect(setSelectedPrefsMap).not.toHaveBeenCalled();
  });
});
