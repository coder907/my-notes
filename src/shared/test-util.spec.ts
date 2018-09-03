import {
  TestUtil,
  name
} from './test-util';



describe('TestUtil tests.', () => {
  it('Naming works correctly.', () => {
    const obj = {
      function1: () => {},
      function2: function () {},
      function3: Object.call,
    };

    TestUtil.nameAllFunctions(obj);

    expect(name(obj.function1)).toBe('function1');
    expect(name(obj.function2)).toBe('function2');
    expect(name(obj.function3)).toBe('function3');
  });
});
