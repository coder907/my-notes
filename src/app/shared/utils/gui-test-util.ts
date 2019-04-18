import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';



/**
 * Queries an element using a selector.
 *
 * @param element An element to peform query on.
 * @param selector A selector to use.
 */
export function query(element: DebugElement | HTMLElement, selector: string): DebugElement | Element {
  if (element instanceof DebugElement) {
    return element.query(By.css(selector));

  } else if (element instanceof HTMLElement) {
    return element.querySelector(selector);

  } else {
    throw new Error('Element must be DebugElement or HTMLElement.');
  }
}

/**
 * Dispatches click event on an element.
 *
 * @param element An element to dispatch the event on.
 */
export function click(element: DebugElement | HTMLElement) {
  if (element instanceof DebugElement) {
    element.triggerEventHandler('click', { button: 0 });

  } else if (element instanceof HTMLElement) {
    element.click();

  } else {
    throw new Error('Element must be DebugElement or HTMLElement.');
  }
}

/**
 * Dispatches dblclick event on an element.
 *
 * @param element An element to dispatch the event on.
 */
export function dblclick(element: DebugElement | HTMLElement) {
  const eventName = 'dblclick';

  if (element instanceof DebugElement) {
    element.triggerEventHandler(eventName, { button: 0 });

  } else if (element instanceof HTMLElement) {
    const event: any = document.createEvent('MouseEvent');
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/initMouseEvent
    event.initMouseEvent(eventName, true, true, window, 2, undefined, undefined, 1, 1);
    element.dispatchEvent(event);
  } else {
    throw new Error('Element must be DebugElement or HTMLElement.');
  }
}

/**
 * Dispatches keyup event on an element.
 *
 * @param element An element to dispatch the event on.
 * @param key Name of the key.
 */
export function keyup(element: DebugElement | HTMLElement, key: string) {
  const eventName = 'keyup';

  if (element instanceof DebugElement) {
    element.triggerEventHandler(eventName, { key });

  } else if (element instanceof HTMLElement) {
    const event: any = document.createEvent('Event');
    event.key = key;
    event.initEvent(eventName);
    element.dispatchEvent(event);

  } else {
    throw new Error('Element must be DebugElement or HTMLElement.');
  }
}
