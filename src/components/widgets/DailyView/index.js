import React from 'react';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import {isSameDate, getFormatDate} from 'utils/dateTimeHelper';
import {getPartyTitle} from 'screens/tourPlan/helper';
import {DivisionType} from 'components/widgets';
import {LocationIcon, Star} from 'assets';
import {Strings} from 'common';
import theme from 'themes';
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
  return monthlyCalendarData.filter(item => {
    return (
      item.date?.day?.toString() === date.day?.toString() &&
      item.date?.month?.toString() === date.month?.toString()
    );
  })[0];
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
  const dayCellData = getCellData(props.date, monthlyCalendarData);

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
          <Label
            testID={`label_dailyView_parties_test_${dayCellData?.patchId}`}
            title={getPartyTitle(dayCellData?.parties)}
            variant={LabelVariant.h6}
          />
          <Label
            testID={`label_dailyView_date_test_${dayCellData?.patchId}`}
            variant={LabelVariant.h6}
            style={[
              styles.activeText,
              isSameDate(props.date.dateString) && styles.currentDate,
            ]}
            title={props.date.day}
          />
        </View>
        <View style={styles.bottomContent}>
          {dayCellData?.noOfKyc ? (
            <View style={styles.content}>
              <Star width={16} height={16} />
              <Label
                testID={`label_dailyView_noOfKyc_test_${dayCellData?.patchId}`}
                title={`${dayCellData?.noOfKyc} ${DivisionType.KYC}`}
                variant={LabelVariant.label}
              />
            </View>
          ) : null}
          {dayCellData?.noOfCampaign ? (
            <View style={styles.content}>
              <Star width={16} height={16} />
              <Label
                testID={`label_dailyView_noOfCampaign_test_${dayCellData?.patchId}`}
                title={`${dayCellData?.noOfCampaign} ${DivisionType.CAMPAIGN}`}
                variant={LabelVariant.label}
              />
            </View>
          ) : null}
        </View>
        {dayCellData?.patch ? (
          <View style={styles.content}>
            <LocationIcon width={16} height={16} />
            <Label
              testID={`label_dailyView_patch_test_${dayCellData?.patchId}`}
              variant={LabelVariant.label}
              title={getPatchName(dayCellData?.patch)}
              numberOfLines={1}
              style={styles.locationLabelText}
              textColor={theme.colors.grey[900]}
            />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default DailyView;
