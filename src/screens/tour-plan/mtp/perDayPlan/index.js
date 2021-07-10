import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {
  Label,
  Modal,
  Button,
  LabelVariant,
  ActivityIndicator,
} from 'components/elements';
import {getFormatDate} from 'utils/dateTimeHelper';
import {translate} from 'locale';
import {
  MtpPerDayPlanLeftPanel,
  MtpPerDayPlanRightPanel,
} from 'screens/tourPlan/mtp';

const MtpPerDayPlan = ({route}) => {
  const {height} = Dimensions.get('window');
  const routeParams = route?.params?.data;

  const {calendarDate, dayCellData} = routeParams;

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

  console.log('parmas', routeParams);
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
          />
          <Button
            title={translate('save')}
            mode="contained"
            contentStyle={styles.buttonTabBar}
            labelStyle={styles.buttonTabBarText}
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
