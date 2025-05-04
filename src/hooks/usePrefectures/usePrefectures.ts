import type { Dispatch, SetStateAction } from 'react';
import { useEffect, useState } from 'react';
import type { PrefectureResult } from '../../types/prefecture';
import { fetchPrefectures } from '../../api/prefecture/prefecture';
import { generatePrefAccordionItems } from '../../utils/prefecture/prefecture';
import type { FetchOptions } from '../../types/api';
import type { AccordionListProps } from '../../components/molecules/accordionList/AccordionList';
import type { CheckboxListProps } from '../../components/molecules/checkboxList/CheckboxList';

interface UsePrefecturesDataResult {
  prefecturesData: PrefectureResult;
  isLoading: boolean;
  errorMessage: string | null;
}

export const usePrefecturesData = (fetchOptions?: FetchOptions): UsePrefecturesDataResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [prefecturesData, setPrefecturesData] = useState<PrefectureResult>([]);

  useEffect(() => {
    const fetchPrefectureData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const result = await fetchPrefectures(fetchOptions);
        if (!result.length) {
          throw new Error('都道府県データの取得に失敗しました');
        }
        setPrefecturesData(result);
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : '都道府県データの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrefectureData();
  }, [fetchOptions]);

  return { prefecturesData, isLoading, errorMessage };
};

interface UsePrefecturesSelectionResult {
  clearSelectedPrefs: () => void;
  prefAccordionListProps: AccordionListProps;
  prefCheckboxListProps: CheckboxListProps;
}

export const usePrefecturesSelection = (
  prefecturesData: PrefectureResult,
  selectedPrefCodes: number[] | string[],
  setSelectedPrefsMap: Dispatch<SetStateAction<Map<number, string>>>,
): UsePrefecturesSelectionResult => {
  const clearSelectedPrefs = () => {
    setSelectedPrefsMap(new Map<number, string>());
  };

  const handlePrefToggle = (checked: boolean, prefName: string, prefCode: number | string) => {
    if (typeof prefCode === 'string') {
      return;
    }
    setSelectedPrefsMap((prevMap) => {
      const newMap = new Map(prevMap);
      if (checked) {
        newMap.set(prefCode, prefName);
      } else {
        newMap.delete(prefCode);
      }
      return newMap;
    });
  };

  const prefectureItems = prefecturesData.map(({ prefName, prefCode }) => ({
    label: prefName,
    value: prefCode,
  }));

  const prefCheckboxListProps: CheckboxListProps = {
    checkboxItems: prefectureItems,
    onToggle: handlePrefToggle,
    selectedItems: selectedPrefCodes,
  };
  const prefAccordionItems = generatePrefAccordionItems(
    prefecturesData,
    handlePrefToggle,
    selectedPrefCodes,
  );

  const prefAccordionListProps: AccordionListProps = {
    accordionItems: prefAccordionItems,
  };

  return { clearSelectedPrefs, prefAccordionListProps, prefCheckboxListProps };
};
