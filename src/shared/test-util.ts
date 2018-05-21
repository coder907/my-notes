export const TestUtil = {
  // Stores name of each property in a custom field
  nameAllProperties: (obj: any): any => {
    for (const name in obj) {
      if (typeof obj[name] === 'function') {
        obj[name].__TestUtil_name = name;
      }
    }

    return obj;
  },

  // Returns name stored by TestUtil.nameAllProperties, if available
  getName: (obj: any): string => {
    return obj.__TestUtil_name || obj.name || '';
  }
};

export const _ = TestUtil.getName;
