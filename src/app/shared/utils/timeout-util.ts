/**
 * Pauses execution for specified number of milliseconds.
 *
 * @example
 * await TestUtil.sleep(1000);
 *
 * @param milliseconds Pause duration in milliseconds.
 */
export function sleep(milliseconds: number): Promise<void> {
  return new Promise((resolve, reject) => setTimeout(resolve, milliseconds));
}

/**
 * Delays execution of supplied function for specified number of milliseconds.
 *
 * @example
 * TestUtil.delay(() => console.log('Delayed.'), 1000);
 *
 * @example
 * await TestUtil.delay(() => console.log('Delayed and awaited.'), 1000);
 *
 * @param fn A function.
 * @param milliseconds Delay in milliseconds.
 */
export function delay(fn: () => void, milliseconds: number): Promise<void> {
  return new Promise((resolve, reject) => setTimeout(() => {
    fn();
    resolve();
  }, milliseconds));
}
