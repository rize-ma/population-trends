import { describe, expect, test } from 'vitest';
import {
  HANDLE_PREFTOGGLE,
  PREF_ACCORDION_ITEMS,
  PREFECTURES,
  SELECTED_PREF_CODES,
} from '../../test/constants/prefecture';
import { generatePrefAccordionItems, isValidPrefCode } from './prefecture';

describe('generatePopulationChartData', () => {
  test('正常にチャート表示用の総合人口データを返却する', async () => {
    const result = generatePrefAccordionItems(PREFECTURES, HANDLE_PREFTOGGLE, SELECTED_PREF_CODES);
    expect(result).toEqual(PREF_ACCORDION_ITEMS);
  });
});

describe('isValidPrefCode', () => {
  test('適切なprefCodeを指定するとTrueを返却する', async () => {
    const result = isValidPrefCode(1);
    expect(result).toBe(true);
  });
  test('不適切なprefCodeを指定するとFalseを返却する', async () => {
    const result = isValidPrefCode(48);
    expect(result).toBe(false);
  });
});
