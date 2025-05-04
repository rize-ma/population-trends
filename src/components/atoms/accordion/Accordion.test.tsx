import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Accordion from './Accordion';

const label = '見出し1';
const content = 'コンテンツ1';

describe('Accordion', () => {
  test('label と content が正しく描画される', () => {
    render(<Accordion label={label} content={content} />);

    expect(screen.getByText(label)).toBeInTheDocument();

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('クリックすると content が展開される', async () => {
    render(<Accordion label={label} content={content} />);

    const summary = screen.getByText(label).closest('summary');
    const details = summary?.closest('details');

    expect(details?.open).toBeFalsy();

    if (summary) {
      fireEvent.click(summary);
      expect(details?.open).toBeTruthy();
    }
  });
});
