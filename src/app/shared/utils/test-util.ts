// import { DebugElement } from '@angular/core';
// import { By } from '@angular/platform-browser';

import { Observable } from 'rxjs';

/**
 * Returns a deep copy of an object.
 *
 * The method is to be used for testing purposes only.
 *
 * @param obj An object to copy.
 */
export function deepCopy(obj: any): any {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Returns the value of an object's name property, if available, or empty string.
 *
 * @param obj An object.
 */
export function name(obj: any): string {
  return obj.name || '';
}

/**
 * Returns the name of an object's method, if available, or empty string.
 *
 * @param obj An object.
 * @param method The object's method.
 */
// tslint:disable-next-line:ban-types
export function methodName(obj: any, method: Function): string {
  // tslint:disable-next-line:forin
  for (const prop in obj) {
    const fn = obj[prop];

    if (typeof fn === 'function' && fn === method) {
      return prop;
    }
  }

  return '';
}

/**
 * Returns an array that aggregates values that the specified observable emits.
 *
 * @param $ An observable.
 */
export function observableValues<T>($: Observable<T>): T[] {
  const values: T[] = [];

  $.subscribe(value => {
    values.push(value);
  });

  return values;
}

// /**
//  * Dispatches click event on an element.
//  *
//  * @param element An element to dispatch the event on.
//  */
// export function click(element: DebugElement | HTMLElement) {
//   if (element instanceof DebugElement) {
//     element.triggerEventHandler('click', { button: 0 });

//   } else if (element instanceof HTMLElement) {
//     element.click();

//   } else {
//     throw new Error('Element must be DebugElement or HTMLElement.');
//   }
// }

// /**
//  * Dispatches keyup event on an element.
//  *
//  * @param element An element to dispatch the event on.
//  * @param key Name of the key.
//  */
// export function keyup(element: DebugElement | HTMLElement, key: string) {
//   const eventName = 'keyup';

//   if (element instanceof DebugElement) {
//     element.triggerEventHandler(eventName, { key });

//   } else if (element instanceof HTMLElement) {
//     const event: any = document.createEvent('Event');
//     event.key = key;
//     event.initEvent(eventName);
//     element.dispatchEvent(event);

//   } else {
//     throw new Error('Element must be DebugElement or HTMLElement.');
//   }
// }

// /**
//  * Queries an element using a selector.
//  *
//  * @param element An element to peform query on.
//  * @param selector A selector to use.
//  */
// export function query(element: DebugElement | HTMLElement, selector: string): DebugElement | Element {
//   if (element instanceof DebugElement) {
//     return element.query(By.css(selector));

//   } else if (element instanceof HTMLElement) {
//     return element.querySelector(selector);

//   } else {
//     throw new Error('Element must be DebugElement or HTMLElement.');
//   }
// }
