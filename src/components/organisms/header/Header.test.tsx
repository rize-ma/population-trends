import { describe, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  test('渡されたタイトルが表示される', () => {
    const titleText = 'テストタイトル';

    render(<Header title={titleText} />);

    const titleElement = screen.getByRole('heading', { level: 1 });

    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent(titleText);
  });
});
