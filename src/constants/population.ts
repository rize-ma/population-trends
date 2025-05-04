import type { PopulationCategoryLabel, PopulationCategoryValue } from '../types/population';

export const POPULATION_CATEGORIES = [
  { label: '総人口', value: 'total' },
  { label: '年少人口', value: 'young' },
  { label: '生産年齢人口', value: 'working' },
  { label: '老年人口', value: 'elderly' },
] as const;

export const POPULATION_LABEL_TO_VALUE_MAP = Object.fromEntries(
  POPULATION_CATEGORIES.map((category) => [category.label, category.value]),
) as Record<PopulationCategoryLabel, PopulationCategoryValue>;

export const POPULATION_VALUE_TO_LABEL_MAP = Object.fromEntries(
  POPULATION_CATEGORIES.map((category) => [category.value, category.label]),
) as Record<PopulationCategoryValue, PopulationCategoryLabel>;
