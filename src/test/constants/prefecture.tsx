/* eslint-disable react-refresh/only-export-components */
import CheckboxList from '../../components/molecules/checkboxList/CheckboxList';
import { PREFECTURES_RESPONSE } from '../mock/responseData';

export const PREFECTURES = PREFECTURES_RESPONSE.result;
export const HANDLE_PREFTOGGLE = (checked: boolean, label: string, value: number | string) => {
  console.log(`Checked: ${checked}, Label: ${label}, Value: ${value}`);
};
export const SELECTED_PREF_CODES = [0, 1, 2];

export const PREF_ACCORDION_ITEMS = [
  {
    id: 'hokkaido',
    label: '北海道',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode === 1).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
  {
    id: 'tohoku',
    label: '東北',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode >= 2 && prefCode <= 7).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
  {
    id: 'kanto',
    label: '関東',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode >= 8 && prefCode <= 14).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
  {
    id: 'chubu',
    label: '中部',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode >= 15 && prefCode <= 23).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
  {
    id: 'kansai',
    label: '関西',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode >= 24 && prefCode <= 30).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
  {
    id: 'chugoku',
    label: '中国',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode >= 31 && prefCode <= 35).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
  {
    id: 'shikoku',
    label: '四国',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode >= 36 && prefCode <= 39).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
  {
    id: 'kyushu',
    label: '九州',
    content: (
      <CheckboxList
        checkboxItems={PREFECTURES.filter(({ prefCode }) => prefCode >= 40 && prefCode <= 47).map(
          ({ prefCode, prefName }) => ({
            label: prefName,
            value: prefCode,
          }),
        )}
        onToggle={HANDLE_PREFTOGGLE}
        selectedItems={SELECTED_PREF_CODES}
      />
    ),
  },
];
