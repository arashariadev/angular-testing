import { fakeAsync, tick, flush } from "@angular/core/testing";

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


});