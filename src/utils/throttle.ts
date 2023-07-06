export function throttle() {
  let isThrottled = false;
  return function (cb: () => void) {
    if (isThrottled) return;
    isThrottled = true;
    setTimeout(() => {
      cb();
      isThrottled = false;
    }, 100);
  };
}
