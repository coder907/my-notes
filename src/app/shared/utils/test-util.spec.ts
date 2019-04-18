import { Subject } from 'rxjs';

import * as testUtil from './test-util';

import {
  name,
  methodName,
  observableValues,
  deepCopy,
} from './test-util';



class TestClass {
  static staticMethod() {
  }

  instanceMethod() {
  }
}

describe('Test util', () => {

  it(methodName(testUtil, testUtil.deepCopy) + ' works.', () => {
    let obj: any = 1;
    let copy: any = deepCopy(obj);
    expect(copy).toEqual(obj);

    obj = '1';
    copy = deepCopy(obj);
    expect(copy).toEqual(obj);

    obj = [1, 2, 3];
    copy = deepCopy(obj);
    expect(copy).toEqual(obj);

    obj = {};
    copy = deepCopy(obj);
    expect(copy).toEqual(obj);

    obj = {
      a: 1,
      b: '2',
      c: [1, 2, 3],
      d: [
        {
          e: 1,
          f: '2',
          g: [1, 2, 3],
        },
        {
          i: 1,
          j: '2',
          k: [1, 2, 3]
        },
        {
          l: 1,
          m: '2',
          n: [1, 2, 3]
        },
      ]
    };
    copy = deepCopy(obj);
    expect(copy).toEqual(obj);

    obj = null;
    copy = deepCopy(obj);
    expect(copy).toEqual(obj);
  });

  it(methodName(testUtil, testUtil.name) + ' works.', () => {
    const testName = 'testName';
    expect(name({ name: testName })).toEqual(testName);
    expect(name(Object.call)).toEqual('call');
    expect(name(''.toLowerCase)).toEqual('toLowerCase');
  });

  it(methodName(testUtil, testUtil.methodName) + ' works.', () => {
    expect(methodName(TestClass, TestClass.staticMethod)).toEqual('staticMethod');
    const obj = new TestClass();
    expect(methodName(obj, obj.instanceMethod)).toEqual('instanceMethod');
  });

  it(methodName(testUtil, testUtil.observableValues) + ' works.', () => {
    const subject = new Subject<number>();
    const values$ = subject.asObservable();
    const values = observableValues(values$);

    expect(values).toEqual([]);
    subject.next(1);
    expect(values).toEqual([1]);
    subject.next(2);
    expect(values).toEqual([1, 2]);
    subject.next(3);
    expect(values).toEqual([1, 2, 3]);
  });
});
