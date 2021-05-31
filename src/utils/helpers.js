export const getUrlParams = function(search) {
  const hashes = search.slice(search.indexOf('?') + 1).split('&');
  const params = {};
  hashes.map(hash => {
    const [key, val] = hash.split('=');
    params[key] = decodeURIComponent(val);
  });
  return params;
};

export const debounce = function(callback, wait) {
  let timerId;
  return (...args) => {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export const getlocalStorageItem = function(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch (e) {
    // todo: log to Sentry
    return null;
  }
};
