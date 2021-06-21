import {getMonthList, getFormatDate} from 'utils/dateTimeHelper';
import {PARTY_TYPE} from 'screens/tourPlan/constants';

/**
 * This function fetches the current date and give us the month-year array for MR to plan his work
 * Ex: let today is May 2021. So, I will get [May 2021, June 2021, ..... February 2022, March 2022]
 * @param {Date} inputDate date input
 * @returns array of objects containing the tour plan months
 */
export const getTourPlanScheduleMonths = inputDate => {
  const MONTH_RANGE = 13;
  const MONTH_ARRAY = getMonthList();
  const tourPlanScheduleMonths = [];
  const deviceDate = inputDate ? inputDate : new Date();
  const month = parseInt(getFormatDate({date: deviceDate, format: 'M'}), 10);
  const year = parseInt(getFormatDate({date: deviceDate, format: 'YYYY'}), 10);
  const currentDate = {
    month,
    year,
  };

  const nextFiscalYear = {
    month: 4,
    year: year + 1,
  };

  if (currentDate.month >= 1 && currentDate.month <= 3) {
    nextFiscalYear.year = year;
  }

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
    if (schedule.month === MONTH_RANGE) {
      schedule.month = 1;
      schedule.year = nextFiscalYear.year;
    }
    tourPlanScheduleMonths.push({
      text: `${MONTH_ARRAY[schedule.month - 1]} ${schedule.year}`,
      month: schedule.month,
      year: schedule.year,
    });
    schedule.month += 1;
  }
  return tourPlanScheduleMonths;
};

export const sortByCategory = array => {
  const byCategory = (array || []).slice().sort(sortBasedOnCategory);
  const byPotentials = byCategory
    .slice()
    .sort((a, b) => (a.isKyc === b.isKyc ? 0 : a.isKyc ? -1 : 1));
  const byFrequency = byPotentials.sort((a, b) =>
    a.frequency > b.alreadyVisited ? 0 : -1,
  );
  return byFrequency;
};

export const sortBasedOnCategory = (a, b) => {
  if (b?.potential > a?.potential) {
    return 0;
  } else if (a?.partyTypes?.name !== PARTY_TYPE.CHEMIST) {
    return -1;
  } else {
    return 1;
  }
  // return b?.potential > a?.potential ? 0: a?.partyTypes?.name !== PARTY_TYPE.CHEMIST ? -1 : 1;
};

export const getSelectedMonthIndex = month => {
  return String(getMonthList().indexOf(month) + 1).padStart(2, '0');
};

/**
 *
 * @param {Object} partiesList  list of party types
 * @param {Array} doctorsSelected  array of selected doctor id's
 * @returns obj containing count of party types
 */
export const getSelectedPartyTypeData = (partiesList, doctorsSelected) => {
  const obj = {doctor: 0, chemist: 0};
  partiesList.map(party => {
    if (doctorsSelected?.some(id => id === party.id)) {
      if (party.partyTypes.name === PARTY_TYPE.DOCTOR) {
        obj.doctor = obj.doctor + 1;
      } else {
        obj.chemist = obj.chemist + 1;
      }
    }
  });
  return obj;
};
