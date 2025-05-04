import { useElementSize } from '@mantine/hooks';
import { useState } from 'react';
import Header from '../../organisms/header/Header';
import TextMessage from '../../atoms/textMessage/TextMessage';
import PopulationChartContainer from '../../organisms/populationChartContainer/PopulationChartContainer';
import PrefectureSelector from '../../organisms/prefectureSelector/PrefectureSelector';

const PageTemplate = () => {
  const [selectedPrefsMap, setSelectedPrefsMap] = useState<Map<number, string>>(new Map());
  const { ref, width: parentWidth } = useElementSize();
  return (
    <>
      <Header title="都道府県別総人口推移グラフ" />
      <main className="flex items-center justify-center mt-5 px-5">
        <div className="w-full lg:w-4/5" ref={ref}>
          <div className="mt-3">
            <PrefectureSelector
              selectedPrefsMap={selectedPrefsMap}
              setSelectedPrefsMap={setSelectedPrefsMap}
            />
          </div>
          <div className="flex items-center justify-center my-10 py-5 px-3 w-full min-h-80 border border-gray-300 rounded">
            {selectedPrefsMap.size ? (
              <PopulationChartContainer
                selectedPrefsMap={selectedPrefsMap}
                parentWidth={parentWidth}
              />
            ) : (
              <TextMessage>都道府県を選択してください</TextMessage>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default PageTemplate;
