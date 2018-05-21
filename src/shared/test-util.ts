export const TestUtil = {
  init: (obj: any): any => {
    for (const name in obj) {
      if (typeof obj[name] === 'function') {
        obj[name].__TestUtil_name = name;
      }
    }

    return obj;
  },

  getName: (obj: any): string => {
    return obj.__TestUtil_name || obj.name || '';
  }
};

export const _ = TestUtil.getName;
