import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/en-in';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);

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

/**
 *
 * @param {object} param
 * @returns year of given date
 */
export const getYear = param => {
  const {date = new Date(), yearFormat = 'YYYY'} = param || {};
  return dayjs(date).format(yearFormat);
};

/**
 *
 * @param {boolean} short if true, returns short month names, else full month names
 * @returns list of months in the year
 */
export const getMonthList = short => {
  return short ? dayjs.monthsShort() : dayjs.months();
};

export const returnDateWithOrdinal = (
  inputDate = new Date(),
  format = 'Do MMM YYYY',
) => {
  return dayjs(inputDate).format(format);
};
