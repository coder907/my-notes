const TestUtilPrefix = '__TestUtil_';

export const TestUtil = {
  /**
   * Stores name of each property for later retrieval.
   * @param {any} obj Any object.
   **/
  nameAllProperties: (obj: any): any => {
    for (const prop in obj) {
      if (typeof obj[prop] === 'function') {
        obj[prop][TestUtilPrefix + 'name'] = prop;
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
  },

  /**
   * Starts tracking whether an HTML element has focus.
   * @param {any} obj A HTML DOM element.
   * @param {boolean} setFocus Sets focus on the tracked element.
   */
  trackFocus: (el: HTMLElement, setFocus: boolean = false) => {
    el.addEventListener('focus', () => { el[TestUtilPrefix + 'hasFocus'] = true; });
    el.addEventListener('blur', () => { el[TestUtilPrefix + 'hasFocus'] = false; });

    if (setFocus) {
      el.focus();
      el[TestUtilPrefix + 'hasFocus'] = true;
    }
  },

  /**
   * Returns true if HTML element has focus, false otherwise.
   *
   * Returns undefined if object was not initialized with TestUtil.trackFocus.
   *
   * May return undefined if 'focus' or 'blur' events have not yet occured since TestUtil.trackFocus
   * call.
   * @param {any} obj A HTML DOM element.
   */
  hasFocus: (el: HTMLElement): boolean => {
    return el[TestUtilPrefix + 'hasFocus'];
  }
};

/** Shorthand for TestUtil.getName */
export const name = TestUtil.getName;
