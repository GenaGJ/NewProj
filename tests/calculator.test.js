const Calculator = require('../src/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should evaluate addition', () => {
    expect(calculator.evaluate('2 + 3')).toBe(5);
  });

  test('should evaluate subtraction', () => {
    expect(calculator.evaluate('5 - 2')).toBe(3);
  });

  test('should evaluate multiplication', () => {
    expect(calculator.evaluate('3 * 4')).toBe(12);
  });

  test('should evaluate division', () => {
    expect(calculator.evaluate('10 / 2')).toBe(5);
  });

  test('should prioritet', () => {
    expect(calculator.evaluate('2 + 3 * 4')).toBe(14);
  });

  test('should prioritetToo', () => {
    expect(calculator.evaluate('3 + 5 * 2')).toBe(13);
  });
});