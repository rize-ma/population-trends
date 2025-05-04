import type { Dispatch, FC, SetStateAction } from 'react';
import { useViewportSize } from '@mantine/hooks';
import AccordionList from '../../molecules/accordionList/AccordionList';
import CheckboxList from '../../molecules/checkboxList/CheckboxList';
import Loading from '../../atoms/loading/Loading';
import TextMessage from '../../atoms/textMessage/TextMessage';
import Button from '../../atoms/button/Button';
import {
  usePrefecturesData,
  usePrefecturesSelection,
} from '../../../hooks/usePrefectures/usePrefectures';

interface PrefectureSelectorProps {
  selectedPrefsMap: Map<number, string>;
  setSelectedPrefsMap: Dispatch<SetStateAction<Map<number, string>>>;
}

const PrefectureSelector: FC<PrefectureSelectorProps> = ({
  selectedPrefsMap,
  setSelectedPrefsMap,
}) => {
  const { prefecturesData, isLoading, errorMessage } = usePrefecturesData();
  const selectedPrefCodes = Array.from(selectedPrefsMap.keys());
  const { clearSelectedPrefs, prefAccordionListProps, prefCheckboxListProps } =
    usePrefecturesSelection(prefecturesData, selectedPrefCodes, setSelectedPrefsMap);
  const { width: currentWidth } = useViewportSize();
  const isMobile = currentWidth < 640;

  return (
    <fieldset
      className={isMobile ? 'px-3 py-5' : 'bg-red-50 border border-gray-300 px-3 py-5 rounded'}
    >
      <legend className="font-semibold text-2xl">都道府県を選択</legend>
      {isLoading && <Loading message="都道府県データ取得中..." />}
      {errorMessage && <TextMessage variant="error">{errorMessage}</TextMessage>}
      {!isLoading && !errorMessage && (
        <div className="flex flex-col items-center">
          {isMobile ? (
            <AccordionList {...prefAccordionListProps} />
          ) : (
            <CheckboxList {...prefCheckboxListProps} />
          )}
          <Button
            disabled={!selectedPrefsMap.size}
            label={'全ての選択を解除'}
            onClick={clearSelectedPrefs}
          />
        </div>
      )}
    </fieldset>
  );
};

export default PrefectureSelector;
