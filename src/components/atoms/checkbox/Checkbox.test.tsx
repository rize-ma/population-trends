import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  test('label が表示される', () => {
    render(<Checkbox label="北海道" checked={false} value={1} />);
    expect(screen.getByText('北海道')).toBeInTheDocument();
  });

  test('checked が true の場合、チェックされている', () => {
    render(<Checkbox label="北海道" checked={true} value={1} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  test('checked が false の場合、チェックされていない', () => {
    render(<Checkbox label="北海道" checked={false} value={1} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  test('onClickCheck が呼ばれる（チェック時）', () => {
    const onClickCheckMock = vi.fn();
    render(<Checkbox label="北海道" checked={false} value={1} onClickCheck={onClickCheckMock} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onClickCheckMock).toHaveBeenCalledWith(true);
  });

  test('onClickCheck が呼ばれる（チェック解除時）', () => {
    const onClickCheckMock = vi.fn();
    render(<Checkbox label="北海道" checked={true} value={1} onClickCheck={onClickCheckMock} />);
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(onClickCheckMock).toHaveBeenCalledWith(false);
  });

  test('value 属性が適切に設定される', () => {
    render(<Checkbox label="北海道" checked={false} value="1" />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.value).toBe('1');
  });
});
