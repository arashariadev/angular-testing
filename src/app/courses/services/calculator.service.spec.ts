import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('Calcultor Service', () => {

  it('Should add two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.add(2, 2);
    expect(result).toBe(4, 'unexpected addition results');
  });

  it('Should subtract two numbers', () => {
    const calculator = new CalculatorService(new LoggerService());

    const result = calculator.subtract(6, 4);
    expect(result).toBe(2, 'unexpected subtraction results');
  });

});