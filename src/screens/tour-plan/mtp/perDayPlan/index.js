import React from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import styles from './styles';
import {Label, Button, LabelVariant} from 'components/elements';
import {getFormatDate} from 'utils/dateTimeHelper';
import {translate} from 'locale';
import {
  MtpPerDayPlanLeftPanel,
  MtpPerDayPlanRightPanel,
} from 'screens/tourPlan/mtp';

/**
 * componnet to plan the day - renders left and right side panel for the planning
 * @param {Object} route route object
 */

const MtpPerDayPlan = ({route}) => {
  const routeParams = route?.params?.data;
  const navigation = useNavigation();

  const {calendarDate, dayCellData} = routeParams;

  /**
   * function to return visits count by summing up the doctor and chemist count
   * @returns number of visits
   */
  const getVisitsCount = () => {
    let count = 0;
    if (dayCellData) {
      count = dayCellData.parties?.reduce((acc, party) => {
        acc += party?.count || 0;
        return acc;
      }, 0);
    }
    return count;
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Label
          variant={LabelVariant.h3}
          title={`${getFormatDate({
            date: calendarDate?.dateString,
            format: 'Do MMMM YYYY',
          })} - ${getVisitsCount()} visits`}
        />
        <View style={styles.tabContainer}>
          <Button
            title={translate('close')}
            mode="outlined"
            contentStyle={styles.buttonTabBar}
            labelStyle={styles.buttonTabBarText}
            onPress={() => {
              navigation.pop();
            }}
          />
          <Button
            title={translate('save')}
            mode="contained"
            contentStyle={styles.buttonTabBar}
            labelStyle={styles.buttonTabBarText}
            onPress={() => {
              navigation.pop();
            }}
          />
        </View>
      </View>
      <View style={styles.panelWrapper}>
        <View style={[styles.panel, styles.seperator, styles.leftPanel]}>
          <MtpPerDayPlanLeftPanel />
        </View>
        <View style={[styles.panel, styles.rightPanel]}>
          <MtpPerDayPlanRightPanel />
        </View>
      </View>
    </View>
  );
};

export default MtpPerDayPlan;
