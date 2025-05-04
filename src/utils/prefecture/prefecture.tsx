import type { AccordionItems } from '../../components/molecules/accordionList/AccordionList';
import CheckboxList from '../../components/molecules/checkboxList/CheckboxList';
import type { Prefecture, Region } from '../../types/prefecture';

type RegionMap = Record<Region, Prefecture[]>;

export const generatePrefAccordionItems = (
  prefectures: Prefecture[],
  handlePrefToggle: (checked: boolean, label: string, value: number | string) => void,
  selectedPrefCodes: number[] | string[],
): AccordionItems => {
  const regions: RegionMap = {
    hokkaido: [],
    tohoku: [],
    kanto: [],
    chubu: [],
    kansai: [],
    chugoku: [],
    shikoku: [],
    kyushu: [],
  };

  // 地方ごとに振り分け
  prefectures.forEach((pref) => {
    const { prefCode } = pref;

    if (prefCode === 1) {
      regions.hokkaido.push(pref);
    } else if (prefCode >= 2 && prefCode <= 7) {
      regions.tohoku.push(pref);
    } else if (prefCode >= 8 && prefCode <= 14) {
      regions.kanto.push(pref);
    } else if (prefCode >= 15 && prefCode <= 23) {
      regions.chubu.push(pref);
    } else if (prefCode >= 24 && prefCode <= 30) {
      regions.kansai.push(pref);
    } else if (prefCode >= 31 && prefCode <= 35) {
      regions.chugoku.push(pref);
    } else if (prefCode >= 36 && prefCode <= 39) {
      regions.shikoku.push(pref);
    } else if (prefCode >= 40 && prefCode <= 47) {
      regions.kyushu.push(pref);
    }
  });

  // 地方名を表示用に日本語変換するマップ
  const regionLabels: Record<keyof RegionMap, string> = {
    hokkaido: '北海道',
    tohoku: '東北',
    kanto: '関東',
    chubu: '中部',
    kansai: '関西',
    chugoku: '中国',
    shikoku: '四国',
    kyushu: '九州',
  };

  const prefAccordionItems = (Object.keys(regions) as (keyof RegionMap)[]).map((regionKey) => ({
    id: regionKey,
    label: regionLabels[regionKey],
    content: (
      <CheckboxList
        checkboxItems={regions[regionKey].map(({ prefCode, prefName }) => ({
          label: prefName,
          value: prefCode,
        }))}
        onToggle={handlePrefToggle}
        selectedItems={selectedPrefCodes}
      />
    ),
  }));

  return prefAccordionItems;
};

export const isValidPrefCode = (prefCode: number): boolean => {
  return Number.isInteger(prefCode) && prefCode >= 1 && prefCode <= 47;
};
