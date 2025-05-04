import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import CheckboxList from './CheckboxList';

describe('CheckboxList', () => {
  const items = [
    { label: '選択肢A', value: 'A' },
    { label: '選択肢B', value: 'B' },
    { label: '選択肢C', value: 'C' },
  ];

  test('各チェックボックスが正しく表示される', () => {
    render(<CheckboxList checkboxItems={items} selectedItems={[]} onToggle={() => {}} />);

    expect(screen.getByLabelText('選択肢A')).toBeInTheDocument();
    expect(screen.getByLabelText('選択肢B')).toBeInTheDocument();
    expect(screen.getByLabelText('選択肢C')).toBeInTheDocument();
  });

  test('選択されているチェックボックスが checked になる', () => {
    render(<CheckboxList checkboxItems={items} selectedItems={['B']} onToggle={() => {}} />);

    expect(screen.getByLabelText('選択肢A')).not.toBeChecked();
    expect(screen.getByLabelText('選択肢B')).toBeChecked();
    expect(screen.getByLabelText('選択肢C')).not.toBeChecked();
  });

  test('チェックボックスをクリックすると onToggle が呼ばれる', () => {
    const onToggleMock = vi.fn();

    render(<CheckboxList checkboxItems={items} selectedItems={[]} onToggle={onToggleMock} />);

    const checkboxA = screen.getByLabelText('選択肢A');
    fireEvent.click(checkboxA);

    expect(onToggleMock).toHaveBeenCalledWith(true, '選択肢A', 'A');
  });

  test('選択肢が number[] の場合にも正しく動作する', () => {
    const numberItems = [
      { label: '1番', value: 1 },
      { label: '2番', value: 2 },
    ];

    render(<CheckboxList checkboxItems={numberItems} selectedItems={[2]} onToggle={() => {}} />);

    expect(screen.getByLabelText('1番')).not.toBeChecked();
    expect(screen.getByLabelText('2番')).toBeChecked();
  });
});
