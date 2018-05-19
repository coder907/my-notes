export const TestUtil = {
  init: (obj) => {
    for (const name in obj) {
      if (typeof obj[name] === 'function') {
        obj[name]._name = name;
      }
    }

    return obj;
  },

  getName: (obj) => {
    return obj.name || obj._name;
  }
};
