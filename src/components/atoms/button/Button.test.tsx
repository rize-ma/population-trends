import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Button from './Button';

describe('Button', () => {
  test('label が正しく表示される', () => {
    render(<Button label="テストボタン" />);
    expect(screen.getByText('テストボタン')).toBeInTheDocument();
  });

  test('クリック時に onClick が呼ばれる（disabled: false）', () => {
    const handleClick = vi.fn();
    render(<Button label="クリック" onClick={handleClick} />);
    fireEvent.click(screen.getByText('クリック'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('disabled が true の場合、クリックできない', () => {
    const handleClick = vi.fn();
    render(<Button label="無効ボタン" onClick={handleClick} disabled />);
    const button = screen.getByText('無効ボタン');
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('isSelected によって適切なクラスが付与される', () => {
    const { rerender } = render(<Button label="選択" isSelected />);
    let button = screen.getByText('選択');
    expect(button.className).toMatch(/bg-teal-500/);

    rerender(<Button label="未選択" isSelected={false} />);
    button = screen.getByText('未選択');
    expect(button.className).toMatch(/bg-sky-500/);
  });

  test('disabled の場合、disabled 用のクラスが適用される', () => {
    render(<Button label="無効スタイル" disabled />);
    const button = screen.getByText('無効スタイル');
    expect(button.className).toMatch(/bg-gray-300/);
  });
});
