const Calculator = require('../src/calculator');

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  test('should evaluate addition', () => {
    expect(calculator.evaluate('2+3')).toBe(5);
  });

  test('should evaluate subtraction', () => {
    expect(calculator.evaluate('5 - 2')).toBe(3);
  });

  test('should evaluate multiplication', () => {
    expect(calculator.evaluate('3 * 4')).toBe(12);
  });

  test('should evaluate division', () => {
    expect(calculator.evaluate('8 / 2')).toBe(4);
  });

  test('should prioritet', () => {
    expect(calculator.evaluate('2 + 3 * 4')).toBe(14);
  });

  test('should prioritetToo', () => {
    expect(calculator.evaluate('3 + 5 * 2')).toBe(13);
  });

  test('should unary', () => {
    expect(calculator.evaluate('(-5 + 2) * 2')).toBe(-6);
  });

  test('should staples', () => {
    expect(calculator.evaluate('5+(-7)')).toBe(-2);
  });

  test('should exponentiation ', () => {
    expect(calculator.evaluate('1+(8^5)')).toBe(32769);
  });




});