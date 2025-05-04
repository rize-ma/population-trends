import { describe, expect, test, vi } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  usePrefecturesData,
  usePrefecturesSelection,
} from '../../../hooks/usePrefectures/usePrefectures';
import { PREF_ACCORDION_ITEMS } from '../../../test/constants/prefecture';
import { PREFECTURES_RESPONSE } from '../../../test/mock/responseData';
import PrefectureSelector from './PrefectureSelector';

vi.mock('../../../hooks/usePrefectures/usePrefectures.ts', () => ({
  usePrefecturesData: vi.fn(),
  usePrefecturesSelection: vi.fn(),
}));

const prefecturesData = PREFECTURES_RESPONSE.result;
const setSelectedPrefsMap = vi.fn();

describe('PrefectureSelector', () => {
  test('正常にデータを取得した場合、都道府県リストとボタンが表示される', async () => {
    (usePrefecturesData as Mock).mockReturnValue({
      prefecturesData,
      isLoading: false,
      errorMessage: null,
    });

    (usePrefecturesSelection as Mock).mockReturnValue({
      clearSelectedPrefs: vi.fn(),
      prefAccordionListProps: { accordionItems: PREF_ACCORDION_ITEMS },
      prefCheckboxListProps: {
        checkboxItems: prefecturesData.map(({ prefCode, prefName }) => ({
          label: prefName,
          value: prefCode,
        })),
        onToggle: vi.fn(),
        selectedItems: [],
      },
    });

    render(
      <PrefectureSelector selectedPrefsMap={new Map()} setSelectedPrefsMap={setSelectedPrefsMap} />,
    );
    expect(await screen.findByText('都道府県を選択')).toBeInTheDocument();
    prefecturesData.forEach(({ prefName }) => {
      expect(screen.getByLabelText(prefName)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: '全ての選択を解除' })).toBeDisabled();
  });

  test('selectedPrefsMapに選択があるとボタンが有効になる', () => {
    (usePrefecturesData as Mock).mockReturnValue({
      prefecturesData,
      isLoading: false,
      errorMessage: null,
    });

    (usePrefecturesSelection as Mock).mockReturnValue({
      clearSelectedPrefs: vi.fn(),
      prefAccordionListProps: { accordionItems: PREF_ACCORDION_ITEMS },
      prefCheckboxListProps: {
        checkboxItems: prefecturesData.map(({ prefCode, prefName }) => ({
          label: prefName,
          value: prefCode,
        })),
        onToggle: vi.fn(),
        selectedItems: [1],
      },
    });

    const selectedMap = new Map();
    selectedMap.set(1, '北海道');

    render(
      <PrefectureSelector
        selectedPrefsMap={selectedMap}
        setSelectedPrefsMap={setSelectedPrefsMap}
      />,
    );
    expect(screen.getByRole('button', { name: '全ての選択を解除' })).toBeEnabled();
  });

  test('ローディング中はローディングメッセージが表示される', () => {
    (usePrefecturesData as Mock).mockReturnValue({
      prefecturesData: [],
      isLoading: true,
      errorMessage: null,
    });

    (usePrefecturesSelection as Mock).mockReturnValue({
      clearSelectedPrefs: vi.fn(),
      prefAccordionListProps: { accordionItems: [] },
      prefCheckboxListProps: {
        checkboxItems: [],
        onToggle: vi.fn(),
        selectedItems: [],
      },
    });

    render(
      <PrefectureSelector selectedPrefsMap={new Map()} setSelectedPrefsMap={setSelectedPrefsMap} />,
    );
    expect(screen.getByText('都道府県データ取得中...')).toBeInTheDocument();
  });

  test('エラーがあればエラーメッセージが表示される', () => {
    (usePrefecturesData as Mock).mockReturnValue({
      prefecturesData: [],
      isLoading: false,
      errorMessage: 'データ取得失敗',
    });

    (usePrefecturesSelection as Mock).mockReturnValue({
      clearSelectedPrefs: vi.fn(),
      prefAccordionListProps: { accordionItems: [] },
      prefCheckboxListProps: {
        checkboxItems: [],
        onToggle: vi.fn(),
        selectedItems: [],
      },
    });

    render(
      <PrefectureSelector selectedPrefsMap={new Map()} setSelectedPrefsMap={setSelectedPrefsMap} />,
    );
    expect(screen.getByText('データ取得失敗')).toBeInTheDocument();
  });
});
