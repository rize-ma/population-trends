export type PopulationCategoryValue = 'total' | 'young' | 'working' | 'elderly';
export type PopulationCategoryLabel = '総人口' | '年少人口' | '生産年齢人口' | '老年人口';

export interface PopulationCategory {
  label: PopulationCategoryLabel;
  value: PopulationCategoryValue;
}

export interface PopulationComposition {
  label: PopulationCategoryLabel;
  data: {
    year: number;
    value: number;
  }[];
}

export interface PopulationResult {
  boundaryYear: number;
  data: PopulationComposition[];
}

export interface FetchPopulationResponse {
  message: string | null;
  result: PopulationResult;
}

export interface PrefPopulationData {
  prefName: string;
  populationData: PopulationResult;
}
