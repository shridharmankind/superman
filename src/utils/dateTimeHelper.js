import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import 'dayjs/locale/en-in';

dayjs.extend(localeData);

/**
 * Utility file to handle Date/Time method
 */

const DEFAULT_FORMAT = 'YYYY-MM-DD';
/**
 * @param {Date} selectedDate  the selecte date to comapred
 * @param {Date} date Date with which to compare
 * @param {String} format  format of dates to compare
 * @returns
 */
export const isSameDate = (
  selectedDate,
  date = new Date(),
  format = DEFAULT_FORMAT,
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

/**
 * return  Date in provided format , can be used to get month only
 * Ref :https://day.js.org/docs/en/display/format
 * @param {Object} param
 * @returns formatted date by default it will  return current date
 */
export const getFormatDate = param => {
  const {date = new Date(), format = DEFAULT_FORMAT} = param || {};
  return dayjs(date).format(format);
};
