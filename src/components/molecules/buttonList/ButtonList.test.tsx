import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import ButtonList from './ButtonList';

describe('ButtonList', () => {
  test('複数のボタンが表示される', () => {
    render(
      <ButtonList
        ButtonItems={[
          { id: 'button-1', label: 'ボタン1' },
          { id: 'button-2', label: 'ボタン2' },
          { id: 'button-3', label: 'ボタン3' },
        ]}
      />,
    );

    expect(screen.getByText('ボタン1')).toBeInTheDocument();
    expect(screen.getByText('ボタン2')).toBeInTheDocument();
    expect(screen.getByText('ボタン3')).toBeInTheDocument();
  });

  test('ボタンクリック時に onClick が呼ばれる', () => {
    const onClickMock = vi.fn();

    render(
      <ButtonList ButtonItems={[{ id: 'button', label: 'クリック', onClick: onClickMock }]} />,
    );

    fireEvent.click(screen.getByText('クリック'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  test('無効化されたボタンはクリックできない', () => {
    const onClickMock = vi.fn();

    render(
      <ButtonList
        ButtonItems={[{ id: 'button', label: '無効ボタン', disabled: true, onClick: onClickMock }]}
      />,
    );

    const button = screen.getByText('無効ボタン');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClickMock).not.toHaveBeenCalled();
  });
});
