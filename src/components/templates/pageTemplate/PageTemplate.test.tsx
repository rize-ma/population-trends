import { beforeEach, describe, expect, test, vi } from 'vitest';
import { fireEvent, screen, waitFor } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { MantineProvider } from '@mantine/core';
import { useElementSize, useViewportSize } from '@mantine/hooks';
import type * as MantineHooks from '@mantine/hooks';
import { PREFECTURES_RESPONSE } from '../../../test/mock/responseData';
import PageTemplate from './PageTemplate';

vi.mock('@mantine/hooks', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof MantineHooks;
  return {
    ...actual,
    useViewportSize: vi.fn(),
    useElementSize: vi.fn(),
  };
});

beforeEach(() => {
  vi.mocked(useViewportSize).mockReturnValue({ width: 1024, height: 800 });
  vi.mocked(useElementSize).mockReturnValue({
    ref: { current: null },
    width: 1000,
    height: 600,
  });
});

const prefecturesData = PREFECTURES_RESPONSE.result;

describe('PageTemplate', () => {
  test('正常に初期状態の要素が表示されている', async () => {
    render(
      <MantineProvider>
        <PageTemplate />
      </MantineProvider>,
    );
    expect(await screen.findByText('都道府県別総人口推移グラフ')).toBeInTheDocument();
    expect(await screen.findByText('都道府県を選択')).toBeInTheDocument();
    prefecturesData.forEach(({ prefName }) => {
      expect(screen.getByLabelText(prefName)).toBeInTheDocument();
    });
    expect(screen.getByRole('button', { name: '全ての選択を解除' })).toBeDisabled();
    expect(await screen.findByText('都道府県を選択してください')).toBeInTheDocument();
  });

  test('都道府県を選択するとグラフが表示される', async () => {
    const { container } = render(
      <MantineProvider>
        <PageTemplate />
      </MantineProvider>,
    );
    await waitFor(() => expect(screen.getByLabelText('北海道')).toBeInTheDocument());
    const checkbox = screen.getByLabelText('北海道');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByRole('button', { name: '全ての選択を解除' })).toBeEnabled();
    const chartTitle = await waitFor(() => screen.findByText('都道府県別総人口推移'));
    expect(chartTitle).toBeInTheDocument();
    const rootElement = await waitFor(() => container.querySelector('.mantine-LineChart-root'));
    expect(rootElement).toBeInTheDocument();
    const containerElement = await waitFor(() =>
      container.querySelector('.mantine-LineChart-container'),
    );
    expect(containerElement).toBeInTheDocument();
  });

  test('都道府県選択を解除できる', async () => {
    render(
      <MantineProvider>
        <PageTemplate />
      </MantineProvider>,
    );
    await waitFor(() => expect(screen.getByLabelText('北海道')).toBeInTheDocument());
    const checkbox = screen.getByLabelText('北海道');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    const releaseButton = screen.getByRole('button', { name: '全ての選択を解除' });
    expect(releaseButton).toBeEnabled();
    const initialChartTitle = await waitFor(() => screen.findByText('都道府県別総人口推移'));
    expect(initialChartTitle).toBeInTheDocument();
    fireEvent.click(releaseButton);
    expect(screen.getByRole('button', { name: '全ての選択を解除' })).toBeDisabled();
    expect(await screen.findByText('都道府県を選択してください')).toBeInTheDocument();
  });

  test('人口推移グラフのカテゴリーを変更できる', async () => {
    render(
      <MantineProvider>
        <PageTemplate />
      </MantineProvider>,
    );
    await waitFor(() => expect(screen.getByLabelText('北海道')).toBeInTheDocument());
    const checkbox = screen.getByLabelText('北海道');
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(screen.getByRole('button', { name: '全ての選択を解除' })).toBeEnabled();
    const initialChartTitle = await waitFor(() => screen.findByText('都道府県別総人口推移'));
    expect(initialChartTitle).toBeInTheDocument();

    const youngCategoryButton = screen.getByRole('button', { name: '年少人口' });
    fireEvent.click(youngCategoryButton);

    const updatedChartTitle = await waitFor(() => screen.findByText('都道府県別年少人口推移'));
    expect(updatedChartTitle).toBeInTheDocument();
  });

  test('モバイル用のUIが表示される', async () => {
    vi.mocked(useViewportSize).mockReturnValue({ width: 400, height: 800 });

    render(
      <MantineProvider>
        <PageTemplate />
      </MantineProvider>,
    );

    const summary = await waitFor(() => screen.getAllByText('北海道')[0].closest('summary'));
    const details = summary?.closest('details');
    expect(details?.open).toBeFalsy();

    if (summary) {
      fireEvent.click(summary);
      expect(details?.open).toBeTruthy();
      const checkbox = screen.getByLabelText('北海道');
      fireEvent.click(checkbox);
    }
    const chartTitle = await waitFor(() => screen.findByText('都道府県別総人口推移'));
    expect(chartTitle).toBeInTheDocument();
    const categorySelecter = screen.getByLabelText('カテゴリーを選択');
    expect(categorySelecter).toBeInTheDocument();
  });
});
