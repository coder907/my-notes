import { Observable } from 'rxjs';



const TestUtilPrefix = '__TestUtil_';

export const TestUtil = {
  /**
   * Stores name of each function for later retrieval.
   *
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
   *
   * @param {any} obj Any object.
   */
  getName: (obj: any): string => {
    return obj.__TestUtil_name || obj.name || '';
  },

  /**
   * Simulates double click on the specified HTML element.
   *
   * @param {any} element An HTML DOM element.
   * @param {boolean} bubbles Specifies whether the event bubbles.
   * @param {boolean} cancelable Specifies whether is the event cancelable.
   * @param {any} context Specifies the event context.
   */
  dblclick: (element: HTMLElement, bubbles = true, cancelable = true, context = window) => {
    element.dispatchEvent(new MouseEvent('dblclick', {
      'view': context,
      'bubbles': bubbles,
      'cancelable': cancelable
    }));
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
  },

  /**
   * Returns the first element that matches the specified tagName and textContent.
   *
   * Returns null if no such element is found.
   *
   * @param {any} rootElement An HTML DOM element.
   * @param {string} tagName Tag name to search for.
   * @param {string} textContent Text content to search for.
   */
  getElementByTextContent: (rootElement: any, tagName: string, textContent: string): HTMLElement | null => {
    const elements = rootElement.querySelectorAll(tagName);

    for (let i = 0; i < elements.length; i++) {
      if (elements[i].textContent.trim() === textContent) {
        return elements[i];
      }
    }

    return null;
  },

  /**
   * Returns the object under an observable.
   *
   * Returns null if there's an error.
   *
   * @param {Observable<any>} observable An observable.
   */
  getObservableObject: (observable: Observable<any>): any | null => {
    let object: any = null;

    observable.subscribe(
      o => object = o,
      err => console.error('Error: ' + err),
    );

    return object;
  },

  /**
   * Returns length of an array under an observable.
   *
   * Returns -1 if there's an error.
   *
   * @param {Observable<any[]>} observableOfArray An observable of an array.
   */
  getObservableLength: (observableOfArray: Observable<any[]>): number => {
    let length = -1;

    observableOfArray.subscribe(
      array => length = array.length,
      err => console.error('Error: ' + err),
    );

    return length;
  }

};

/** Shorthand for TestUtil.getName */
export const name = TestUtil.getName;
