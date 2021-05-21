import {MONTH_ARRAY} from 'screens/tourPlan/constants';
import {getMonth, getYear} from 'utils/dateTimeHelper';

/**
 * This function fetches the current date and give us the month-year array for MR to plan his work
 * Ex: let today is May 2021. So, I will get [May 2021, June 2021, ..... February 2022, March 2022]
 */
export const getTourPlanScheduleMonths = inputDate => {
  const tourPlanScheduleMonths = [];
  const deviceDate = inputDate ? inputDate : new Date();
  const currentDate = {
    month: getMonth(deviceDate),
    year: getYear(deviceDate),
  };

  const nextFiscalYear = {
    month: 3,
    year: getYear(deviceDate) + 1,
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
    if (schedule.month === 12) {
      schedule.month = 0;
      schedule.year = nextFiscalYear.year;
    }
    tourPlanScheduleMonths.push(
      `${MONTH_ARRAY[schedule.month]} ${schedule.year}`,
    );
    schedule.month += 1;
  }
  console.log('plan', tourPlanScheduleMonths);
  return tourPlanScheduleMonths;
};
