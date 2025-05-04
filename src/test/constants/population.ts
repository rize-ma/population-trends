import type { ChartData } from '@mantine/charts';
import type { PrefPopulationData } from '../../types/population';
import { CHART_COLORS } from '../../constants/chart';
import { POPULATION_RESPONSE } from '../mock/responseData';

export const PREF_POPULATION_DATA_LIST: PrefPopulationData[] = [
  {
    prefName: '北海道',
    populationData: POPULATION_RESPONSE.result,
  },
  {
    prefName: '青森県',
    populationData: POPULATION_RESPONSE.result,
  },
];

export const CHART_DATA_TOTAL: ChartData = [
  {
    year: 1960,
    北海道: 5039206,
    青森県: 5039206,
  },
  {
    year: 1965,
    北海道: 5171800,
    青森県: 5171800,
  },
  {
    year: 1970,
    北海道: 5184287,
    青森県: 5184287,
  },
  {
    year: 1975,
    北海道: 5338206,
    青森県: 5338206,
  },
  {
    year: 1980,
    北海道: 5575989,
    青森県: 5575989,
  },
  {
    year: 1985,
    北海道: 5679439,
    青森県: 5679439,
  },
  {
    year: 1990,
    北海道: 5643647,
    青森県: 5643647,
  },
  {
    year: 1995,
    北海道: 5692321,
    青森県: 5692321,
  },
  {
    year: 2000,
    北海道: 5683062,
    青森県: 5683062,
  },
  {
    year: 2005,
    北海道: 5627737,
    青森県: 5627737,
  },
  {
    year: 2010,
    北海道: 5506419,
    青森県: 5506419,
  },
  {
    year: 2015,
    北海道: 5381733,
    青森県: 5381733,
  },
  {
    year: 2020,
    北海道: 5224614,
    青森県: 5224614,
  },
  {
    year: 2025,
    北海道: 5016554,
    青森県: 5016554,
  },
  {
    year: 2030,
    北海道: 4791592,
    青森県: 4791592,
  },
  {
    year: 2035,
    北海道: 4546357,
    青森県: 4546357,
  },
  {
    year: 2040,
    北海道: 4280427,
    青森県: 4280427,
  },
  {
    year: 2045,
    北海道: 4004973,
    青森県: 4004973,
  },
];

export const CHART_DATA_YOUNG: ChartData = [
  {
    year: 1960,
    北海道: 1681479,
    青森県: 1681479,
  },
  {
    year: 1965,
    北海道: 1462123,
    青森県: 1462123,
  },
  {
    year: 1970,
    北海道: 1309487,
    青森県: 1309487,
  },
  {
    year: 1975,
    北海道: 1312611,
    青森県: 1312611,
  },
  {
    year: 1980,
    北海道: 1298324,
    青森県: 1298324,
  },
  {
    year: 1985,
    北海道: 1217959,
    青森県: 1217959,
  },
  {
    year: 1990,
    北海道: 1034251,
    青森県: 1034251,
  },
  {
    year: 1995,
    北海道: 898673,
    青森県: 898673,
  },
  {
    year: 2000,
    北海道: 792352,
    青森県: 792352,
  },
  {
    year: 2005,
    北海道: 719057,
    青森県: 719057,
  },
  {
    year: 2010,
    北海道: 657312,
    青森県: 657312,
  },
  {
    year: 2015,
    北海道: 608296,
    青森県: 608296,
  },
  {
    year: 2020,
    北海道: 555804,
    青森県: 555804,
  },
  {
    year: 2025,
    北海道: 511677,
    青森県: 511677,
  },
  {
    year: 2030,
    北海道: 465307,
    青森県: 465307,
  },
  {
    year: 2035,
    北海道: 423382,
    青森県: 423382,
  },
  {
    year: 2040,
    北海道: 391086,
    青森県: 391086,
  },
  {
    year: 2045,
    北海道: 360177,
    青森県: 360177,
  },
];

export const SERIES = [
  { name: '北海道', color: CHART_COLORS[0] },
  { name: '青森県', color: CHART_COLORS[1] },
];
