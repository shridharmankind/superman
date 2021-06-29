import {getMonthList, getFormatDate} from 'utils/dateTimeHelper';
import {
  PARTY_TYPE,
  COMPARISION_TYPE,
  RULE_KEY,
  PARTY_PREFIX,
} from 'screens/tourPlan/constants';
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
  return byPotentials;
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
export const getSelectedPartyTypeData = (
  doctorsSelected,
  updatedPatchArray,
  dataChanged,
  selectedDoctorCount,
  selectedChemistCount,
  exhaustedFrequencyCount,
  selectedDayNumber,
  XMonthValue,
  areasCovered,
) => {
  const {
    DOCTOR,
    CHEMIST,
    AREA,
    FREQUENCY_MET,
    DOCTOR_COVERED_IN_MONTH,
    CHEMIST_COVERED_IN_MONTH,
    DOCTOR_IN_X_DAYS,
  } = RULE_KEY;
  const obj = {
    [DOCTOR]: 0,
    [CHEMIST]: 0,
    [AREA]: undefined,
    [FREQUENCY_MET]: exhaustedFrequencyCount,
    [DOCTOR_COVERED_IN_MONTH]: selectedDoctorCount.length,
    [CHEMIST_COVERED_IN_MONTH]: selectedChemistCount.length,
    [DOCTOR_IN_X_DAYS]: XMonthValue?.coveredCount,
  };
  if (!updatedPatchArray || !updatedPatchArray.length) {
    return;
  }
  const isDayWithinXDays = selectedDayNumber <= XMonthValue?.xValue;

  updatedPatchArray.map(party => {
    if (dataChanged) {
      obj[AREA] = areasCovered.filter(item => item.totalUniqueParty > 0).length;
      if (party.alreadyVisited === 0 && party?.alreadyVisitedCount > 0) {
        if (party.partyTypes.name === PARTY_TYPE.CHEMIST) {
          obj[CHEMIST_COVERED_IN_MONTH] = obj[CHEMIST_COVERED_IN_MONTH] + 1;
        }
        if (party.partyTypes.name === PARTY_TYPE.DOCTOR) {
          obj[DOCTOR_COVERED_IN_MONTH] = obj[DOCTOR_COVERED_IN_MONTH] + 1;
          if (isDayWithinXDays) {
            obj[DOCTOR_IN_X_DAYS] = obj[DOCTOR_IN_X_DAYS] + 1;
          }
        }
      }
      if (party.alreadyVisited > 0 && party?.alreadyVisitedCount === 0) {
        if (party.partyTypes.name === PARTY_TYPE.CHEMIST) {
          obj[CHEMIST_COVERED_IN_MONTH] = selectedChemistCount.length - 1;
        }
        if (party.partyTypes.name === PARTY_TYPE.DOCTOR) {
          obj[DOCTOR_COVERED_IN_MONTH] = selectedDoctorCount.length - 1;
          if (isDayWithinXDays) {
            obj[DOCTOR_IN_X_DAYS] = obj[DOCTOR_IN_X_DAYS] - 1;
          }
        }
      }
    }
    // for per day check
    if (doctorsSelected?.some(id => id.partyId === party.id)) {
      if (party.partyTypes.name === PARTY_TYPE.DOCTOR) {
        if (party.frequency === party.alreadyVisitedCount) {
          obj[FREQUENCY_MET] = obj[FREQUENCY_MET] + 1;
        }
        obj[DOCTOR] = obj[DOCTOR] + 1;
      } else {
        obj[CHEMIST] = obj[CHEMIST] + 1;
      }
    }
  });
  return obj;
};

export const getComparisonResult = (value1, value2, checkType) => {
  switch (checkType) {
    case COMPARISION_TYPE.MIN:
      return value1 >= value2;
    case COMPARISION_TYPE.MAX:
      return !(value1 > value2);
    default:
      return value1 === value2;
  }
};

/**
 *
 * @param {Object} partyData
 * @param {String} type
 * @returns  count for specific party Type
 */

const getPartyData = (partyData, type) =>
  partyData?.filter(
    item => item?.partyType.toLowerCase() === type.toLowerCase(),
  )[0]?.count;

/**
 *
 * @param {Object} parties
 * @returns  party Name with respectpective suffix
 */
export const getPartyTitle = parties => {
  if (!parties) {
    return null;
  }
  const drCount = getPartyData(parties, PARTY_TYPE.DOCTOR);
  const ChemistCount = getPartyData(parties, PARTY_TYPE.CHEMIST);

  if (drCount && !ChemistCount) {
    return `${drCount} ${PARTY_PREFIX.DOCTOR} `;
  } else if (!drCount && ChemistCount) {
    return `${ChemistCount} ${PARTY_PREFIX.CHEMIST}`;
  } else if (drCount && ChemistCount) {
    return `${drCount}  ${PARTY_PREFIX.DOCTOR}, ${ChemistCount} ${PARTY_PREFIX.CHEMIST}`;
  } else {
    return null;
  }
};
