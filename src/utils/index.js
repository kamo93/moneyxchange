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

/**
 * @desc format , digits
 * @param arr
 * @returns {string}
 */
export const formatArrNumber = arr => {
  const R = [];
  const arrRev = arr.reverse();
  for (let i = 0; i < arrRev.length; i += 3) {
    R.push(
      arrRev
        .slice(i, i + 3)
        .reverse()
        .join('')
    );
    R.push(',');
  }
  return R.reverse()
    .slice(1)
    .join('');
};

/**
 * Remove format from currency value
 * @param str
 * @returns {string}
 */
export const removeFormatCurrency = str => {
  const getNumber = typeof str.split(' ')[1] !== 'undefined' ? str.split(' ')[1] : str.split(' ')[0];
  const cleanNumber = getNumber.split(',');
  return cleanNumber.join('');
};

/**
 * @desc From a string format the complete currency
 * @param str
 * @returns {string}
 */
export const formatCompleteCurrency = str => {
  const getNumber = typeof str.split(' ')[1] !== 'undefined' ? str.split(' ')[1] : str.split(' ')[0];
  const completeNumArr = getNumber.split('.');
  completeNumArr[1] = completeNumArr[1] ? completeNumArr[1].slice(0, 4) : '';
  const formatVal = formatArrNumber(completeNumArr[0].split(''));
  return formatVal + (completeNumArr[1] ? `.${completeNumArr[1]}` : '');
};
