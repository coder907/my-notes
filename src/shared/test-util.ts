const TestUtilPrefix = '__TestUtil_';

export const TestUtil = {
  /**
   * Stores name of each function for later retrieval.
   * @param {any} obj Any object.
   **/
  nameAllFunctions: (obj: any): any => {
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
   * @param {any} element An HTML DOM element.
   * @param {boolean} setFocus Sets focus on the tracked element.
   */
  trackFocus: (element: HTMLElement, setFocus: boolean = false) => {
    element.addEventListener('focus', () => { element[TestUtilPrefix + 'hasFocus'] = true; });
    element.addEventListener('blur', () => { element[TestUtilPrefix + 'hasFocus'] = false; });

    if (setFocus) {
      element.focus();
      element[TestUtilPrefix + 'hasFocus'] = true;

    } else {
      element.blur();
      element[TestUtilPrefix + 'hasFocus'] = false;
    }
  },

  /**
   * Returns true if HTML element has focus, false otherwise.
   *
   * Returns undefined if object was not initialized with TestUtil.trackFocus.
   *
   * May return undefined if 'focus' or 'blur' events have not yet occured since TestUtil.trackFocus
   * call.
   * @param {any} element An HTML DOM element.
   */
  hasFocus: (element: HTMLElement): boolean => {
    return element[TestUtilPrefix + 'hasFocus'];
  }
};

/** Shorthand for TestUtil.getName */
export const name = TestUtil.getName;
