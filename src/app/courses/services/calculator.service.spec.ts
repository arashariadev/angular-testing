import { TestBed } from "@angular/core/testing";

import { CalculatorService } from "./calculator.service";
import { LoggerService } from "./logger.service";

describe('Calcultor Service', () => {

  let calculator: CalculatorService,
      loggerSpy: any;

  beforeEach(() => {
    
    loggerSpy = jasmine.createSpyObj('LoggerService', ['log']);

    TestBed.configureTestingModule({
      providers: [
        CalculatorService,
        {provide: LoggerService, useValue: loggerSpy}
      ]
    });

    calculator = TestBed.get(CalculatorService);

  });

  it('Should add two numbers', () => {
    const result = calculator.add(2, 2);
    expect(result).toBe(4, 'unexpected addition results');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

  it('Should subtract two numbers', () => {
    const result = calculator.subtract(6, 4);
    expect(result).toBe(2, 'unexpected subtraction results');
    expect(loggerSpy.log).toHaveBeenCalledTimes(1);
  });

});