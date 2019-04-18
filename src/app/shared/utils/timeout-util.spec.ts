import { fakeAsync, tick } from '@angular/core/testing';

import { methodName } from './test-util';
import * as timeoutUtil from 'src/app/shared/utils/timeout-util';



describe('Timeout util', () => {

  it(methodName(timeoutUtil, timeoutUtil.sleep) + ' works (async).', async () => {
    const timeout = 100;
    const dt = Date.now();

    await timeoutUtil.sleep(timeout);
    expect(Date.now() - dt).toBeGreaterThanOrEqual(timeout);

    await timeoutUtil.sleep(timeout);
    expect(Date.now() - dt).toBeGreaterThanOrEqual(timeout * 2);
  });

  it(methodName(timeoutUtil, timeoutUtil.sleep) + ' works (fakeAsync).', fakeAsync(() => {
    const timeout = 1000;
    let sleeping = true;

    setTimeout(() => {
      sleeping = false;
    }, timeout);

    // omitting await keyword for this fakeAsync test
    timeoutUtil.sleep(timeout - 1);

    expect(sleeping).toEqual(true);

    tick(timeout / 2);

    expect(sleeping).toEqual(true);

    tick(timeout / 2);

    expect(sleeping).toEqual(false);
  }));

  it(methodName(timeoutUtil, timeoutUtil.delay) + ' works (async).', async () => {
    const timeout = 100;
    const dt = Date.now();

    await timeoutUtil.delay(() => { }, timeout - 1);
    expect(Date.now() - dt).toBeGreaterThanOrEqual(timeout);

    await timeoutUtil.delay(() => { }, timeout - 1);
    expect(Date.now() - dt).toBeGreaterThanOrEqual(timeout * 2);
  });

  it(methodName(timeoutUtil, timeoutUtil.delay) + ' works (fakeAsync).', fakeAsync(() => {
    const timeout = 1000;
    let sleeping = true;

    // omitting await keyword for this fakeAsync test
    timeoutUtil.delay(() => {
      sleeping = false;
    }, timeout - 1);

    expect(sleeping).toEqual(true);

    tick(timeout / 2);

    expect(sleeping).toEqual(true);

    tick(timeout / 2);

    expect(sleeping).toEqual(false);
  }));
});
