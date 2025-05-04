import type { ChartData, ChartSeries } from '@mantine/charts';
import type { PopulationCategoryValue, PrefPopulationData } from '../../types/population';
import { POPULATION_LABEL_TO_VALUE_MAP } from '../../constants/population';
import { CHART_COLORS } from '../../constants/chart';

const generatePopulationChartData = (
  prefPopulationDataList: PrefPopulationData[],
  populationCategory: PopulationCategoryValue,
): ChartData => {
  if (!prefPopulationDataList || prefPopulationDataList.length === 0) {
    return [];
  }

  // 全ての都道府県の人口推移データを指定された年ごとに集約するための Map
  const chartDataMap: Map<number, Record<string, number>> = new Map();

  prefPopulationDataList.forEach((prefPopulationData) => {
    const prefName = prefPopulationData.prefName;
    const populationCompositions = prefPopulationData.populationData.data;
    populationCompositions.forEach((populationComposition) => {
      if (POPULATION_LABEL_TO_VALUE_MAP[populationComposition.label] === populationCategory) {
        populationComposition.data.forEach((yearlyData) => {
          const year = yearlyData.year;
          const value = yearlyData.value;

          if (!chartDataMap.has(year)) {
            chartDataMap.set(year, { year });
          }

          const yearData = chartDataMap.get(year)!;
          yearData[prefName] = value;
        });
      }
    });
  });
  // 年が古い順にChartDataを返却
  return Array.from(chartDataMap.values()).sort((a, b) => a.year - b.year);
};

const generateChartSeries = (prefPopulationDataList: PrefPopulationData[]): ChartSeries[] => {
  return prefPopulationDataList.map(({ prefName }, index) => ({
    name: prefName,
    //CHART_COLORS の範囲内で循環させる
    color: CHART_COLORS[index % CHART_COLORS.length],
  }));
};

export const generatePopulationChartOptions = (
  prefPopulationDataList: PrefPopulationData[],
  populationCategory: PopulationCategoryValue,
): [ChartData, ChartSeries[]] => {
  const chartData = generatePopulationChartData(prefPopulationDataList, populationCategory);
  const series = generateChartSeries(prefPopulationDataList);

  return [chartData, series];
};
