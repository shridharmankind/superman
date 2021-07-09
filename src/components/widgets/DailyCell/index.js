import React from 'react';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import {isSameDate, getFormatDate} from 'utils/dateTimeHelper';
import {getPartyTitle} from 'screens/tourPlan/helper';
import {LocationIcon, StarIcon} from 'assets';
import {Strings} from 'common';
import theme from 'themes';
import {DAY_TYPE} from 'screens/tourPlan/constants';
import {translate} from 'locale';
/**
 *
 * @param {number} month
 * @param {number} selectedMonth
 * @returns  boolean for different months
 */
const isDisabled = (month, selectedMonth) =>
  month?.toString() !== selectedMonth?.toString();

/**
 * @param {Object} patchData
 * @returns patch name string
 */
const getPatchName = patchData => {
  const {isExStation, displayName = ''} = patchData;
  return isExStation ? `(${Strings.exStation}) ${displayName}` : displayName;
};

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
 * @param {Object} dayCellData
 * @returns  category block
 */
const renderCategory = dayCellData => {
  return (
    <View style={styles.categoryContent}>
      {dayCellData?.noOfKyc ? (
        <View style={styles.content}>
          {renderIcon(StarIcon)}
          <Label
            testID={`label_dailyView_noOfKyc_test_${dayCellData?.patchId}`}
            title={translate('categories.count.kyc', {
              value: dayCellData?.noOfKyc,
            })}
            variant={LabelVariant.label}
            style={styles.labelTextSpacing}
          />
        </View>
      ) : null}
      {dayCellData?.noOfCampaign ? (
        <View style={styles.content}>
          {renderIcon(StarIcon)}
          <Label
            testID={`label_dailyView_noOfCampaign_test_${dayCellData?.patchId}`}
            title={translate('categories.count.campaign', {
              value: dayCellData?.noOfCampaign,
            })}
            variant={LabelVariant.label}
            style={styles.labelTextSpacing}
          />
        </View>
      ) : null}
    </View>
  );
};

/**
 * Renders patch object
 * @param {Object} dayCellData
 * @returns JSX
 */
const renderPatch = dayCellData => {
  return (
    <View style={styles.locationContent}>
      {renderIcon(LocationIcon)}
      <Label
        testID={`label_dailyView_patch_test_${dayCellData?.patchId}`}
        variant={LabelVariant.label}
        title={getPatchName(dayCellData?.patch)}
        numberOfLines={1}
        style={styles.locationLabelText}
        textColor={theme.colors.grey[900]}
      />
    </View>
  );
};

/**
 * @param {Icon} Icon
 * @returns  Icon with width & height
 */
const renderIcon = (Icon, width = 14, height = 14) => (
  <Icon width={width} height={height} />
);

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
const DailyCell = ({
  props,
  selectedMonth,
  workingDays,
  monthlyCalendarData,
  showSameDayContainer = true,
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

  // inner container check for high visit bar
  const isInnerContainerHighVisitStyle =
    isSameDayDate && isWorkingDayType && dayCellData?.patch?.isNoOfVisitHigh;
  return (
    <View
      style={[
        styles.dailyViewContainer,
        containterHighVisitStyle,
        isDisabledDate && styles.disabled,
        (!isWorkingDayDate || isLeaveType || isHolidayType) &&
          styles.weekendContainer,
      ]}>
      <View
        style={[
          styles.innerContainer,
          isSameDayDate && showSameDayContainer && styles.currentDailyContainer,
          isInnerContainerHighVisitStyle && styles.highVisitBar,
        ]}>
        <View style={styles.headerContent}>
          <View>
            {isWorkingDayType && (
              <Label
                testID={`label_dailyView_parties_test_${dayCellData?.patchId}`}
                title={getPartyTitle(dayCellData?.parties)}
                variant={LabelVariant.h6}
              />
            )}
            {isLeaveType && (
              <Label
                testID={`label_dailyView_parties_test_${dayCellData?.patchId}`}
                title={translate('dayType.leave')}
                variant={LabelVariant.h6}
              />
            )}
          </View>
          <Label
            testID={`label_dailyView_date_test_${props.date.day}`}
            variant={LabelVariant.h6}
            style={[styles.activeText, isSameDayDate && styles.currentDate]}
            title={props.date.day}
          />
        </View>
        {isWorkingDayType && renderCategory(dayCellData)}
        {isWorkingDayType && dayCellData?.patch && renderPatch(dayCellData)}
      </View>
    </View>
  );
};

export default DailyCell;
