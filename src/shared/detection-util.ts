export const DetectionUtil = {
  supportsTouch: (): boolean => {
    return !!('ontouchstart' in window || navigator.msMaxTouchPoints);
  }
};
