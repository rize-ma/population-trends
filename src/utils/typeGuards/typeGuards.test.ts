import { describe, expect, test } from 'vitest';
import { isNumberArray } from './typeGuards';

describe('isNumberArray', () => {
  test('Number型配列を指定したときにTrueを返却する', async () => {
    const result = isNumberArray([1, 2, 3]);
    expect(result).toBe(true);
  });
  test('Number以外の型配列を指定したときにFalseを返却する', async () => {
    const result = isNumberArray(['test1', 'test1', 'test1']);
    expect(result).toBe(false);
  });
});
