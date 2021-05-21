import dayjs from 'dayjs';

// var localeData = require('dayjs/plugin/localeData');
// dayjs.extend(localeData);

// dayjs().localeData();
/**
 * Utility file to handle Date/Time method
 */

/**
 *
 * @param {object} param
 * @returns month of selected date
 */
export const getMonth = param => {
  const {date = new Date(), monthFormat = 'M'} = param || {};
  return dayjs(date).format(monthFormat);
};

/**
 * @param {Date} selectedDate  the selecte date to comapred
 * @param {Date} date Date with which to compare
 * @param {String} format  format of dates to compare
 * @returns
 */
export const isSameDate = (
  selectedDate,
  date = new Date(),
  format = 'YYYY-MM-DD',
) => selectedDate === dayjs(date).format(format);

export const getYear = param => {
  const {date = new Date(), yearFormat = 'YYYY'} = param || {};
  return dayjs(date).format(yearFormat);
};

// export const monthList = short => {
//   return short ? dayjs.monthsShort() : dayjs.months();
// };
