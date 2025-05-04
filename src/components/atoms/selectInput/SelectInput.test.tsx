import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import SelectInput from './SelectInput';

const baseProps = {
  id: 'populationCategory',
  labelText: 'カテゴリーを選択',
  selectOptions: [
    { id: 'total', label: '総人口', value: 'total' },
    { id: 'total', label: '年少人口', value: 'young' },
  ],
  onChange: vi.fn(),
};
describe('SelectInput', () => {
  test('labelText が表示される', () => {
    render(<SelectInput {...baseProps} />);
    expect(screen.getByText('カテゴリーを選択')).toBeInTheDocument();
  });

  test('selectOptions がすべて表示される', () => {
    render(<SelectInput {...baseProps} />);
    expect(screen.getByRole('option', { name: '総人口' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: '年少人口' })).toBeInTheDocument();
  });

  test('onChange が発火する', () => {
    render(<SelectInput {...baseProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'young' } });
    expect(baseProps.onChange).toHaveBeenCalledTimes(1);
  });

  test('label の htmlFor と select の id が一致する', () => {
    render(<SelectInput {...baseProps} />);
    const label = screen.getByText('カテゴリーを選択');
    const select = screen.getByRole('combobox');
    expect(label).toHaveAttribute('for', 'populationCategory');
    expect(select).toHaveAttribute('id', 'populationCategory');
  });
});
