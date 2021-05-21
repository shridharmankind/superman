import {getFormatDate, getYear, getMonthList} from 'utils/dateTimeHelper';

/**
 * This function fetches the current date and give us the month-year array for MR to plan his work
 * Ex: let today is May 2021. So, I will get [May 2021, June 2021, ..... February 2022, March 2022]
 */
export const getTourPlanScheduleMonths = inputDate => {
  const MONTH_ARRAY = getMonthList();
  const tourPlanScheduleMonths = [];
  const deviceDate = inputDate ? inputDate : new Date();
  const month = parseInt(getFormatDate({date: deviceDate, format: 'M'}), 10);
  const year = parseInt(getYear({date: deviceDate}), 10);
  const currentDate = {
    month,
    year,
  };

  const nextFiscalYear = {
    month: 4,
    year: year + 1,
  };

  let schedule = {
    month: currentDate.month,
    year: currentDate.year,
  };

  /**
   * loop from current month till next fiscal year end
   */
  while (
    schedule.year !== nextFiscalYear.year ||
    (schedule.year === nextFiscalYear.year &&
      schedule.month !== nextFiscalYear.month)
  ) {
    if (schedule.month === 13) {
      schedule.month = 1;
      schedule.year = nextFiscalYear.year;
    }
    tourPlanScheduleMonths.push(
      `${MONTH_ARRAY[schedule.month - 1]} ${schedule.year}`,
    );
    schedule.month += 1;
  }
  return tourPlanScheduleMonths;
};

export const getSelectedMonthIndex = month => {
  return String(getMonthList().indexOf(month) + 1).padStart(2, '0');
};
