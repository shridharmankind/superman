import dayjs from 'dayjs';
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

export const isSameDate = (
  selectedDate,
  date = new Date(),
  format = 'YYYY-MM-DD',
) => {
  return selectedDate === dayjs(date).format(format);
};
