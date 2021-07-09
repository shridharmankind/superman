import React from 'react';
import {View} from 'react-native';
import styles from './styles';
import {isSameDate, getFormatDate} from 'utils/dateTimeHelper';
import {DAY_TYPE} from 'screens/tourPlan/constants';
import {DailyCell} from 'components/widgets';
/**
 *
 * @param {number} month
 * @param {number} selectedMonth
 * @returns  boolean for different months
 */
const isDisabled = (month, selectedMonth) =>
  month?.toString() !== selectedMonth?.toString();

/**
 * Returns true for workingDay
 * @param {Date} date
 * @param {Array} workingDays
 * @returns  Boolean
 */
const isWorkingDay = (date, workingDays) => {
  const dayName = getFormatDate({date: date.dateString, format: 'dddd'});
  return workingDays?.includes(dayName);
};

/**
 *
 * @param {String} day
 * @param {Array of Object} monthlyCalendarData
 * @returns selected date data
 */
const getCellData = (date, monthlyCalendarData) => {
  return monthlyCalendarData?.filter(item => {
    return (
      item.date?.day?.toString() === date.day?.toString() &&
      item.date?.month?.toString() === date.month?.toString()
    );
  })[0];
};

/**
 *
 * @param {Boolean} isSameDayDate
 * @param {Booelan} isWorkingDayType
 * @param {Boolean} isNoOfVisitHigh
 * @returns style for high Visit bar
 */
const highVisitStyle = (isSameDayDate, isWorkingDayType, isNoOfVisitHigh) => {
  if (!isNoOfVisitHigh) {
    return null;
  } else if (!isSameDayDate && isWorkingDayType) {
    return styles.highVisitBar;
  } else if (isSameDayDate) {
    return styles.sameDayHightVisit;
  }
};
/**
 * Render Daily Container
 * @param {Object} props
 */
const DailyView = ({
  props,
  selectedMonth,
  workingDays,
  monthlyCalendarData,
}) => {
  // store value cell Data  on basis of date
  const dayCellData = getCellData(props.date, monthlyCalendarData);
  //store value for current day
  const isSameDayDate = isSameDate(props.date.dateString);
  // check if day is working or not on basis of working Day api data
  const isWorkingDayDate = isWorkingDay(props.date, workingDays);
  // check working day type on basis of dayType value
  const isWorkingDayType =
    dayCellData?.dayType?.toLowerCase() === DAY_TYPE.WORKING.toLowerCase() &&
    isWorkingDayDate;
  // check leave for day type on basis of dayType value
  const isLeaveType =
    dayCellData?.dayType?.toLowerCase() === DAY_TYPE.LEAVE.toLowerCase();
  // check holiday for day type on basis of dayType value
  const isHolidayType =
    dayCellData?.dayType?.toLowerCase() === DAY_TYPE.HOLIDAY.toLowerCase();
  // store value for date that need to be disabled (previous month , leave & holiday)
  const isDisabledDate =
    isDisabled(props.date.month, selectedMonth) ||
    isLeaveType ||
    isHolidayType ||
    !isWorkingDayDate;
  // Get style for high Vists
  const containterHighVisitStyle = highVisitStyle(
    isSameDayDate,
    isWorkingDayType,
    dayCellData?.patch?.isNoOfVisitHigh,
  );
  return (
    <View
      style={[
        styles.dailyViewContainer,
        containterHighVisitStyle,
        isDisabledDate && styles.disabled,
        (!isWorkingDayDate || isLeaveType || isHolidayType) &&
          styles.weekendContainer,
      ]}>
      <DailyCell
        props={props}
        selectedMonth={selectedMonth}
        workingDays={workingDays}
        monthlyCalendarData={monthlyCalendarData}
      />
    </View>
  );
};

export default DailyView;
