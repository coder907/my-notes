export const TestUtil = {
  /**
   * Stores name of each property for later retrieval.
   * @param {any} obj Any object.
   **/
  nameAllProperties: (obj: any): any => {
    for (const prop in obj) {
      if (typeof obj[prop] === 'function') {
        obj[prop].__TestUtil_name = prop;
      }
    }

    return obj;
  },

  /**
   * Returns name stored by TestUtil.nameAllProperties or obj.name, if available.
   * @param {any} obj Any object.
   */
  getName: (obj: any): string => {
    return obj.__TestUtil_name || obj.name || '';
  }
};

/** Shorthand for TestUtil.getName */
export const name = TestUtil.getName;
