import { fakeAsync, tick, flush, flushMicrotasks } from "@angular/core/testing";
import { of } from "rxjs/internal/observable/of";
import { delay } from "rxjs/operators";

describe('Async testing examples', () => {

  it('Async test example with done function', (done: DoneFn) => {
    let test: boolean = false;

    setTimeout(() => {
      test = true;
      expect(test).toBeTruthy();
      done();
    }, 500);
  });

  // using fakeAsync and tick
  it('Async test example - fakeAsync and tick', fakeAsync(() => {
    let test: boolean = false;

    setTimeout(() => {});

    setTimeout(() => {
      test = true;
    }, 500);

  tick(400);
  tick(100);
  expect(test).toBeTruthy();
  }));

  // using fakeAsync and flush
  it('Async test example - fakeAsync and flush', fakeAsync(() => {
    let test: boolean = false;

    setTimeout(() => {
      test = true;
    }, 500);

  flush();
  expect(test).toBeTruthy();
  }));

  // promise based test case
  it('Async test example - plain promise based', fakeAsync(() => {
    let test: boolean = false;

    Promise.resolve().then(() => {
      return Promise.resolve();
    }).then(() => {
      test = true;
    });

    flushMicrotasks(); //promise is micro-task where as setTimeout, setInterval, click , etc are macro-task
    expect(test).toBeTruthy();
  }));

  // Async using both micro & macro tasks  
  it('Async test example - with promise and setTimeout', fakeAsync(() => {
    let counter: number = 0;

    Promise.resolve().then(() => {
      counter += 10;

      setTimeout(() => {
        counter += 1;
      }, 1000);
    });

    expect(counter).toBe(0);
    flushMicrotasks();
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(10);
    tick(500);
    expect(counter).toBe(11);
  }));

  // observable in synchronous test case
  it('test case - observable as synchronous', () => {
    let test: boolean = false;

    const test$ = of(test);

    test$.subscribe(() => {
      test = true;
    });

    expect(test).toBeTruthy();
  });

  // observable in asynchronous test case
  it('async test case - observable', fakeAsync(() => {
    let test: boolean = false;

    const test$ = of(test).pipe(delay(1000));

    test$.subscribe(() => {
      test = true;
    });

    tick(1000); // flush() & flushMicrotasks() won't work
    expect(test).toBeTruthy();
  }));

});