import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import AccordionList from './AccordionList';

describe('AccordionList コンポーネント', () => {
  test('複数のアコーディオン項目がレンダリングされる', () => {
    render(
      <AccordionList
        accordionItems={[
          { id: 'id-1', label: '見出し1', content: 'コンテンツ1' },
          { id: 'id-1', label: '見出し2', content: 'コンテンツ2' },
        ]}
      />,
    );

    expect(screen.getByText('見出し1')).toBeInTheDocument();
    expect(screen.getByText('見出し2')).toBeInTheDocument();

    expect(screen.getByText('コンテンツ1')).toBeInTheDocument();
    expect(screen.getByText('コンテンツ2')).toBeInTheDocument();
  });
});
