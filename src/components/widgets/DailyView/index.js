import React from 'react';
import {View} from 'react-native';
import {Label} from 'components/elements';
import styles from './styles';
import {isSameDate, getFormatDate} from 'utils/dateTimeHelper';

/**
 *
 * @param {number} month
 * @param {number} selectedMonth
 * @returns  boolean for different months
 */
const isDisabled = (month, selectedMonth) => month != selectedMonth;

/**
 * Returns true for workingDay
 * @param {Date} date
 * @param {Array} workingDays
 * @returns  Boolean
 */
const isWorkingDay = (date, workingDays) => {
  const dayName = getFormatDate({date: date.dateString, format: 'dddd'});
  return workingDays.includes(dayName);
};

/**
 * Render Daily Container
 * @param {Object} props
 */

const DailyView = ({props, selectedMonth, workingDays}) => {
  return (
    <View
      style={[
        styles.dailyViewContainer,
        isDisabled(props.date.month, selectedMonth) && styles.disabled,
        !isWorkingDay(props.date, workingDays) && styles.weekendContainer,
      ]}>
      <View
        style={[
          styles.innerContainer,
          isSameDate(props.date.dateString) && styles.currentDailyContainer,
        ]}>
        <View style={styles.headerContent}>
          <Label testID={'label_dailyView_leftContent_test'} title={''} />
          <Label
            testID={'label_dailyView_date_test'}
            size={16}
            type={isSameDate(props.date.dateString) ? 'bold' : 'semiBold'}
            style={[
              styles.activeText,
              isSameDate(props.date.dateString) && styles.currentDate,
            ]}
            title={props.date.day}
          />
        </View>

        <View style={styles.bottomContent} />
      </View>
    </View>
  );
};

export default DailyView;
