import { MONTH_NAMES } from '../constants';

export const formatDate = date => {
  return date.getFullYear() + '-' + (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1) + '-' + date.getDate();
};

/***
 * @desc get month name from array with timestamp string
 * @param timestamp {string}
 * @returns {string}
 */
export const getMonthName = timestamp => {
  return MONTH_NAMES[new Date(timestamp * 1000).getMonth()];
};

/***
 * @desc get day with timestamp as a string
 * @param timestamp {string}
 * @returns {number}
 */
export const getDay = timestamp => new Date(timestamp * 1000).getDate();
