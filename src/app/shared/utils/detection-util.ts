export function supportsTouch(): boolean {
  return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
}