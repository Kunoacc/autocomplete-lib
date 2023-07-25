
/**
 * This function is used to debounce a function.
 * @param func The function to debounce.
 * @param wait The time to wait before executing the function.
 * @param immediate  Whether to execute the function immediately.
 * @returns 
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function debounce (func: Function, wait: number, immediate?: boolean) {
  let timeout: ReturnType<typeof setTimeout> | null;

  return function executedFunction(this: unknown, ...args: []) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
}