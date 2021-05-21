import dayjs from 'dayjs';
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
 * return  Date in provided format , can be used to get month only
 * Ref :https://day.js.org/docs/en/display/format
 * @param {Object} param
 * @returns formatted date by default it will  return current date
 */
export const getFormatDate = param => {
  const {date = new Date(), format = DEFAULT_FORMAT} = param || {};
  return dayjs(date).format(format);
};
