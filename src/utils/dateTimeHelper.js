import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import utc from 'dayjs/plugin/utc';
import 'dayjs/locale/en-in';

dayjs.extend(localeData);
dayjs.extend(advancedFormat);
dayjs.extend(utc);

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

export const getLocalTimeZone = date => {
  let timeInHours = new Date(date).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
  let newDate = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
  let dateString =
    newDate.getUTCDate() +
    '/' +
    (newDate.getMonth() + 1) +
    '/' +
    newDate.getFullYear();
  dateString = dateString + ' ' + timeInHours;
  return dateString;
};

/**
 * @param {String} inputDate date in utc format
 * @param {String} format expected format of date output
 * @returns date formatted to local time
 */
export const returnUTCtoLocal = (inputDate, format) => {
  const date = inputDate || dayjs.utc().format();
  const localDate = dayjs.utc(date).local().format();
  return getFormatDate({date: localDate, format: format || 'D MMM YYYY'});
};

/**
 * Check if a date is after a particular date or note
 *
 * @param {Date} date - Date
 * @param {Date} dateToCompare - Date to compare with
 * @return {Boolean} Is After
 */
export const isAfter = (date, dateToCompare) => {
  return dayjs(date).isAfter(dateToCompare);
};

/**
 * Get start of month/day/year based upon unit for a date
 *
 * @param {Date} date
 * @param {String} unit
 * @return {dayjs.Dayjs} Start date
 */
export const startOf = (date, unit) => {
  return dayjs(date).startOf(unit);
};

/**
 *
 * @param {Date} date
 * @returns Date as an object with day , month & year value
 */
export const getDateIntoObject = date => {
  return {
    day: dayjs(date).get('date'),
    month: dayjs(date).get('month'),
    year: dayjs(date).get('year'),
  };
};
