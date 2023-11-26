import { generateRandomColor } from '.';

describe('generateRandomColor', () => {
  it('should return a string', () => {
    const result = generateRandomColor();
    expect(typeof result).toBe('string');
  });

  it('should generate a random color', () => {
    const result1 = generateRandomColor();
    const result2 = generateRandomColor();
    expect(result1).not.toBe(result2);
  });
});
