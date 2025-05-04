import { act, renderHook, waitFor } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { http, HttpResponse } from 'msw';
import { server } from '../../test/mock/server';
import { POPULATION_RESPONSE } from '../../test/mock/responseData';
import { usePopulationCategorySelection, usePopulationData } from './usePopulation';

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const populationData = POPULATION_RESPONSE.result;

describe('usePopulationData', () => {
  test('正常に人口構成データを取得できる', async () => {
    const prefecturesMap = new Map<number, string>([
      [1, '北海道'],
      [2, '青森県'],
    ]);

    const { result } = renderHook(() => usePopulationData(prefecturesMap));

    // isLoadingがtrue→falseになるまで待つ
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBeNull();
    expect(result.current.prefPopulationDataList.length).toBe(2);

    expect(result.current.prefPopulationDataList[0]).toEqual({
      prefName: '北海道',
      populationData: populationData,
    });

    expect(result.current.prefPopulationDataList[1]).toEqual({
      prefName: '青森県',
      populationData: populationData,
    });
  });
  test('不正なprefCodeが指定された場合にエラーメッセージが設定される', async () => {
    const prefecturesMap = new Map<number, string>([[48, 'test県']]);

    const { result } = renderHook(() => usePopulationData(prefecturesMap));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBe('不正な値を受け取りました');
    expect(result.current.prefPopulationDataList).toHaveLength(0);
  });
  test('APIリクエストが失敗した場合にエラーメッセージが設定される', async () => {
    // MSWでAPIエラーをモック
    server.use(
      http.get(`${baseUrl}/api/v1/population/composition/perYear`, () => {
        return HttpResponse.json({ message: 'Internal Server Error' }, { status: 500 });
      }),
    );

    const prefecturesMap = new Map<number, string>([[1, '北海道']]);

    const { result } = renderHook(() => usePopulationData(prefecturesMap, { cache: false }));

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.errorMessage).toBe('APIリクエストが失敗しました: status 500');
    expect(result.current.prefPopulationDataList).toHaveLength(0);
  });
});

describe('usePopulationCategorySelection', () => {
  test('初期状態は「総人口」が選択されている', () => {
    const { result } = renderHook(() => usePopulationCategorySelection());

    expect(result.current.selectedCategory).toBe('total');

    const selectedButton = result.current.categoryButtonItems.find((item) => item.isSelected);
    expect(selectedButton?.label).toBe('総人口');

    expect(result.current.categorySelectInputItem.selectOptions).toContainEqual({
      id: 'total',
      label: '総人口',
      value: 'total',
    });
  });

  test('ボタン経由でカテゴリーを変更できる', () => {
    const { result } = renderHook(() => usePopulationCategorySelection());

    const workingItem = result.current.categoryButtonItems.find(
      (item) => item.label === '生産年齢人口',
    );
    expect(workingItem).toBeDefined();

    if (workingItem) {
      act(() => {
        workingItem.onClick?.();
      });
    }
    expect(result.current.selectedCategory).toBe('working');

    const selectedButton = result.current.categoryButtonItems.find((item) => item.isSelected);
    expect(selectedButton?.label).toBe('生産年齢人口');
  });

  test('セレクトボックス経由でカテゴリーを変更できる', () => {
    const { result } = renderHook(() => usePopulationCategorySelection());

    const event = {
      target: { value: 'elderly' },
    } as React.ChangeEvent<HTMLSelectElement>;

    act(() => {
      result.current.categorySelectInputItem.onChange(event);
    });

    expect(result.current.selectedCategory).toBe('elderly');
  });
});
