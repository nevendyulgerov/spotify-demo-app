/**
 * @description Is null
 * @param val
 */
export const isNull = (val) => val === null;

/**
 * @description Is array
 * @param val
 */
export const isArr = (val) => Array.isArray(val);

/**
 * @description Is object
 * @param val
 */
export const isObj = (val) => typeof val === 'object' && !isArr(val) && !isNull(val);

/**
 * @description Is number
 * @param val
 */
export const isNum = (val) => typeof val === 'number' && !isNaN(val);

/**
 * @description Is function
 * @param val
 */
export const isFunc = (val) => typeof val === 'function';

/**
 * @description Is string
 * @param val
 */
export const isStr = (val) => typeof val === 'string';

/**
 * @description Is undefined
 * @param val
 */
export const isUndef = (val) => typeof val === 'undefined';

/**
 * @description Is boolean
 * @param val
 */
export const isBool = (val) => typeof val === 'boolean';

/**
 * @description Is non empty string
 * @param val
 */
export const isNonEmptyStr = (val) => isStr(val) && val !== '';

/**
 * @description Load image from file
 * @param file
 * @param onLoad
 */
export const loadImageFromFile = (file, onLoad) => {
  if (!FileReader) {
    return console.warn('FileReader is not supported on this browser.');
  }

  const fr = new FileReader();
  fr.onload = () => onLoad(fr.result);
  fr.readAsDataURL(file);
};

/**
 * @description Generate color
 * @param col
 * @param amt
 * @returns {string}
 */
export const generateColor = (col, amt) => {
  let usePound = false;

  if (col[0] === '#') {
    // eslint-disable-next-line no-param-reassign
    col = col.slice(1);
    usePound = true;
  }

  const num = parseInt(col, 16);

  // eslint-disable-next-line no-bitwise
  let r = (num >> 16) + amt;

  if (r > 255) {
    r = 255;
  } else if (r < 0) {
    r = 0;
  }

  // eslint-disable-next-line no-bitwise
  let b = ((num >> 8) & 0x00FF) + amt;

  if (b > 255) {
    b = 255;
  } else if (b < 0) {
    b = 0;
  }

  // eslint-disable-next-line no-bitwise
  let g = (num & 0x0000FF) + amt;

  if (g > 255) {
    g = 255;
  } else if (g < 0) {
    g = 0;
  }

  // eslint-disable-next-line no-bitwise
  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
};

/**
 * @description Debounce
 * @param id
 * @param delay
 * @returns {function(...[*]=)}
 */
export const debounce = (id, delay) => {
  const timers = {};

  return callback => {
    if (timers[id]) {
      clearTimeout(timers[id]);
    }

    timers[id] = setTimeout(callback, delay);
  };
};

/**
 * @description Uid
 * @param len
 */
export const uid = (len = 7) => Math.random().toString(35).substr(2, len);
