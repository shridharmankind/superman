import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/en-in';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);

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

export const getMonthDiff = (current, previous) => {
  return dayjs(current).diff(dayjs(previous), 'month');
};

/**
 *
 * @param {Object} accept month , year and date
 * @returns date from month & year in 'YYYY-MM-DD'
 */
export const getDateFromMonthYear = ({month, year, date = '01'}) => {
  return `${year}-${String(month).padStart(2, '0')}-${date}`;
};

export const isAfter = (date, dateToCompare) => {
  return dayjs(date).isAfter(dateToCompare);
};

export const startOf = (date, unit) => {
  return dayjs(date).startOf(unit);
};
