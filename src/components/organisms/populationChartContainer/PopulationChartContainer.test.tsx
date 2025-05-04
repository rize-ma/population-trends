import { describe, expect, test, vi } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import {
  usePopulationCategorySelection,
  usePopulationData,
} from '../../../hooks/usePopulation/usePopulation';
import { POPULATION_CATEGORIES } from '../../../constants/population';
import { POPULATION_RESPONSE } from '../../../test/mock/responseData';
import PopulationChartContainer from './PopulationChartContainer';

vi.mock('../../../hooks/usePopulation/usePopulation.ts', () => ({
  usePopulationData: vi.fn(),
  usePopulationCategorySelection: vi.fn(),
}));

vi.mock('@mantine/hooks', () => ({
  useViewportSize: () => ({ width: 1024 }), // PC環境と仮定
}));

const populationData = POPULATION_RESPONSE.result;

describe('PopulationChartContainer', () => {
  test('データが正常に取得できた場合、LineChartが描画される', () => {
    (usePopulationData as Mock).mockReturnValue({
      isLoading: false,
      errorMessage: null,
      prefPopulationDataList: [
        {
          prefName: '北海道',
          populationData: populationData,
        },
      ],
    });

    (usePopulationCategorySelection as Mock).mockReturnValue({
      categoryButtonItems: [],
      categorySelectInputItem: {
        labelText: 'カテゴリーを選択',
        selectOptions: [],
        onChange: vi.fn(),
        id: 'populationCategory',
      },
      selectedCategory: 'total',
    });

    const { container } = render(
      <MantineProvider>
        <PopulationChartContainer selectedPrefsMap={new Map([[1, '北海道']])} parentWidth={1000} />
      </MantineProvider>,
    );
    const rootElement = container.querySelector('.mantine-LineChart-root');
    const containerElement = container.querySelector('.mantine-LineChart-container');

    expect(rootElement).toBeInTheDocument();
    expect(containerElement).toBeInTheDocument();
  });

  test('人口データ読み込み中はLoadingコンポーネントが表示される', () => {
    (usePopulationData as Mock).mockReturnValue({
      isLoading: true,
      errorMessage: null,
      prefPopulationDataList: [],
    });
    (usePopulationCategorySelection as Mock).mockReturnValue({
      categoryButtonItems: [],
      categorySelectInputItem: {},
      selectedCategory: 'total',
    });

    render(
      <MantineProvider>
        <PopulationChartContainer selectedPrefsMap={new Map()} parentWidth={1000} />
      </MantineProvider>,
    );
    expect(screen.getByText('人口推移データ読み込み中...')).toBeInTheDocument();
  });

  test('人口データ取得時にエラーがある場合、エラーメッセージが表示される', () => {
    (usePopulationData as Mock).mockReturnValue({
      isLoading: false,
      errorMessage: 'データの取得に失敗しました',
      prefPopulationDataList: [],
    });
    (usePopulationCategorySelection as Mock).mockReturnValue({
      categoryButtonItems: [],
      categorySelectInputItem: {},
      selectedCategory: 'total',
    });

    render(<PopulationChartContainer selectedPrefsMap={new Map()} parentWidth={1000} />);
    expect(screen.getByText('データの取得に失敗しました')).toBeInTheDocument();
  });

  test('PC環境ではButtonListコンポーネントが表示される', () => {
    (usePopulationData as Mock).mockReturnValue({
      isLoading: false,
      errorMessage: null,
      prefPopulationDataList: [
        {
          prefName: '北海道',
          populationData: populationData,
        },
        {
          prefName: '青森県',
          populationData: populationData,
        },
      ],
    });
    (usePopulationCategorySelection as Mock).mockReturnValue({
      categoryButtonItems: [
        { label: '総人口', onClick: vi.fn(), isSelected: true },
        { label: '年少人口', onClick: vi.fn(), isSelected: false },
        { label: '生産年齢人口', onClick: vi.fn(), isSelected: false },
        { label: '老年人口', onClick: vi.fn(), isSelected: false },
      ],
      categorySelectInputItem: {
        id: 'populationCategory',
        labelText: 'カテゴリーを選択',
        onChange: vi.fn(),
        selectOptions: POPULATION_CATEGORIES.map(({ label, value }) => ({
          label,
          value,
        })),
      },
      selectedCategory: 'total',
    });

    render(
      <MantineProvider>
        <PopulationChartContainer selectedPrefsMap={new Map([[1, '北海道']])} parentWidth={1000} />
      </MantineProvider>,
    );
    expect(screen.getByText('総人口')).toBeInTheDocument();
  });

  test('モバイル環境ではSelectInputが表示される', () => {
    vi.mock('@mantine/hooks', () => ({
      useViewportSize: () => ({ width: 400 }),
    }));
    (usePopulationData as Mock).mockReturnValue({
      isLoading: false,
      errorMessage: null,
      prefPopulationDataList: [],
    });
    (usePopulationCategorySelection as Mock).mockReturnValue({
      categoryButtonItems: [],
      categorySelectInputItem: {
        labelText: 'カテゴリーを選択',
        selectOptions: [{ label: '総人口', value: 'total' }],
        onChange: vi.fn(),
        id: 'populationCategory',
      },
      selectedCategory: 'total',
    });

    render(
      <MantineProvider>
        <PopulationChartContainer selectedPrefsMap={new Map([[1, '北海道']])} parentWidth={1000} />
      </MantineProvider>,
    );
    expect(screen.getByLabelText('カテゴリーを選択')).toBeInTheDocument();
  });
});
