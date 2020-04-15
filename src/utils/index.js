/**
 * @description Is string
 * @param val
 */
export const isStr = (val) => typeof val === 'string';

/**
 * @description Is non empty string
 * @param val
 */
export const isNonEmptyStr = (val) => isStr(val) && val !== '';

/**
 * @description Capitalize
 * @param text
 * @returns {string}
 */
export const capitalize = text => {
  return `${text.charAt(0).toUpperCase()}${text.slice(1).toLowerCase()}`;
};
