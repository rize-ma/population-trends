import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import TextMessage from './TextMessage';

describe('TextMessage コンポーネント', () => {
  test('通常のメッセージが正しく表示される', () => {
    render(<TextMessage>正常なメッセージ</TextMessage>);
    const message = screen.getByText('正常なメッセージ');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-black');
  });

  test('エラーメッセージが赤色で表示される', () => {
    render(<TextMessage variant="error">エラーメッセージ</TextMessage>);
    const message = screen.getByText('エラーメッセージ');
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass('text-red-500');
  });
});
