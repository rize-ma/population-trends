import type { ChangeEvent } from 'react';
import { useEffect, useState } from 'react';
import type { PopulationCategoryValue, PrefPopulationData } from '../../types/population';
import { POPULATION_CATEGORIES } from '../../constants/population';
import type { SelectInputItem } from '../../components/atoms/selectInput/SelectInput';
import { isValidPrefCode } from '../../utils/prefecture/prefecture';
import type { FetchOptions } from '../../types/api';
import type { ButtonItems } from '../../components/molecules/buttonList/ButtonList';
import { fetchPopulation } from '../../api/population/population';

interface UsePopulationDataResult {
  prefPopulationDataList: PrefPopulationData[];
  isLoading: boolean;
  errorMessage: string | null;
}

export const usePopulationData = (
  prefecturesMap: Map<number, string>,
  fetchOptions?: FetchOptions,
): UsePopulationDataResult => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [prefPopulationDataList, setPrefPopulationDataList] = useState<PrefPopulationData[]>([]);

  useEffect(() => {
    const fetchPopulationData = async () => {
      setIsLoading(true);
      setErrorMessage(null);
      try {
        const fetchedPrefPopulationData = await Promise.all(
          Array.from(prefecturesMap.entries()).map(async ([prefCode, prefName]) => {
            if (!isValidPrefCode(prefCode)) {
              throw new Error('不正な値を受け取りました');
            }
            const result = await fetchPopulation(prefCode, fetchOptions);
            if (!result) {
              throw new Error('データの取得に失敗しました');
            }
            return {
              prefName,
              populationData: result,
            };
          }),
        );
        setPrefPopulationDataList(fetchedPrefPopulationData);
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : 'データの取得に失敗しました');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPopulationData();
  }, [prefecturesMap, fetchOptions]);

  return { prefPopulationDataList, isLoading, errorMessage };
};

interface UsePopulationCategorySelectionResult {
  categoryButtonItems: ButtonItems;
  categorySelectInputItem: SelectInputItem;
  selectedCategory: PopulationCategoryValue;
}

export const usePopulationCategorySelection = (): UsePopulationCategorySelectionResult => {
  const [selectedCategory, setSelectedCategory] = useState<PopulationCategoryValue>('total');

  const categoryButtonItems = POPULATION_CATEGORIES.map(({ label, value }) => {
    return {
      id: value,
      label,
      onClick: () => {
        setSelectedCategory(value);
      },
      isSelected: value === selectedCategory,
    };
  });

  const categorySelectInputItem = {
    id: 'populationCategory',
    labelText: 'カテゴリーを選択',
    onChange: (event: ChangeEvent<HTMLSelectElement>) => {
      //asを使用しているが、includesで値を確かめているので安全
      const selected = event.target.value as PopulationCategoryValue;
      const validValues = POPULATION_CATEGORIES.map(({ value }) => value);
      if (validValues.includes(selected)) {
        setSelectedCategory(selected);
      }
    },
    selectOptions: POPULATION_CATEGORIES.map(({ label, value }) => ({
      id: value,
      label,
      value,
    })),
  };

  return { categoryButtonItems, categorySelectInputItem, selectedCategory };
};
