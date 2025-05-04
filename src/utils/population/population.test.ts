import { describe, expect, test } from 'vitest';
import {
  CHART_DATA_TOTAL,
  CHART_DATA_YOUNG,
  PREF_POPULATION_DATA_LIST,
  SERIES,
} from '../../test/constants/population';
import { generatePopulationChartOptions } from './population';

describe('generatePopulationChartData', () => {
  test('正常にチャート表示用の総合人口データを返却する', async () => {
    const [chartData, series] = generatePopulationChartOptions(PREF_POPULATION_DATA_LIST, 'total');
    expect(chartData).toEqual(CHART_DATA_TOTAL);
    expect(series).toEqual(SERIES);
  });
  test('正常にチャート表示用の年少人口データを返却する', async () => {
    const [chartData, series] = generatePopulationChartOptions(PREF_POPULATION_DATA_LIST, 'young');
    expect(chartData).toEqual(CHART_DATA_YOUNG);
    expect(series).toEqual(SERIES);
  });
  test('prefPopulationDataListに空の配列を指定した場合chartData、seriesが空の配列となる', async () => {
    const [chartData, series] = generatePopulationChartOptions([], 'total');
    expect(chartData).toEqual([]);
    expect(series).toEqual([]);
  });
});
