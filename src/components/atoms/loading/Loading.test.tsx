import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Loading from './Loading';

describe('Loading コンポーネント', () => {
  test('デフォルトのメッセージ「読込中...」が表示される', () => {
    render(<Loading />);
    expect(screen.getByText('読込中...')).toBeInTheDocument();
  });

  test('props で指定した message が表示される', () => {
    render(<Loading message="データ取得中です" />);
    expect(screen.getByText('データ取得中です')).toBeInTheDocument();
  });

  test('スピナーが表示される', () => {
    render(<Loading />);
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });
});
