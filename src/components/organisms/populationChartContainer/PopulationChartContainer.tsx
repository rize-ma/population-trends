import { LineChart } from '@mantine/charts';
import type { FC } from 'react';
import { useViewportSize } from '@mantine/hooks';
import Loading from '../../atoms/loading/Loading.tsx';
import TextMessage from '../../atoms/textMessage/TextMessage.tsx';
import SelectInput from '../../atoms/selectInput/SelectInput.tsx';
import ButtonList from '../../molecules/buttonList/ButtonList.tsx';
import { generatePopulationChartOptions } from '../../../utils/population/population.ts';
import { POPULATION_VALUE_TO_LABEL_MAP } from '../../../constants/population.ts';
import {
  usePopulationCategorySelection,
  usePopulationData,
} from '../../../hooks/usePopulation/usePopulation.ts';

interface PopulationChartContainerProps {
  selectedPrefsMap: Map<number, string>;
  parentWidth: number;
}

const PopulationChartContainer: FC<PopulationChartContainerProps> = ({
  selectedPrefsMap,
  parentWidth,
}) => {
  const { prefPopulationDataList, isLoading, errorMessage } = usePopulationData(selectedPrefsMap);
  const { categoryButtonItems, categorySelectInputItem, selectedCategory } =
    usePopulationCategorySelection();
  const [chartData, series] = generatePopulationChartOptions(
    prefPopulationDataList,
    selectedCategory,
  );
  const { width: currentWidth } = useViewportSize();
  const isMobile = currentWidth < 640;
  return (
    <section className="flex flex-col items-center justify-center">
      {isLoading && <Loading message="人口推移データ読み込み中..." />}
      {errorMessage && <TextMessage variant="error">{errorMessage}</TextMessage>}
      {!isLoading && !errorMessage && (
        <>
          <div className="mb-3">
            {isMobile ? (
              <SelectInput {...categorySelectInputItem} />
            ) : (
              <ButtonList ButtonItems={categoryButtonItems} />
            )}
          </div>
          <div className="mb-3">
            <span className="text-base font-bold md:text-2xl">{`都道府県別${POPULATION_VALUE_TO_LABEL_MAP[selectedCategory]}推移`}</span>
          </div>
          <LineChart
            h={500}
            w={parentWidth ? parentWidth - 65 : currentWidth - 65}
            data={chartData}
            dataKey="year"
            xAxisProps={{
              label: {
                value: '年度',
                dy: 25,
              },
            }}
            yAxisProps={{
              label: {
                value: '人口',
                angle: -90,
                position: 'insideLeft',
                dx: -25,
                style: { textAnchor: 'middle' },
              },
            }}
            withLegend
            series={series}
          />
        </>
      )}
    </section>
  );
};

export default PopulationChartContainer;
