export function debounce(foo, delay = 300) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);

    timer = setTimeout(() => {
      foo.apply(null, args);
    }, delay);
  }
}
