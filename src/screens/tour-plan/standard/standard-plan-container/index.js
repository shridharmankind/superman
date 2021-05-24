import React from 'react';
import {View} from 'react-native';
import {WeekView} from 'components/widgets';
import {Strings} from 'common';
import styles from './styles';

/**
 * Standard Tour Plan container
 */
const StandardPlanContainer = ({workingDays, navigation}) => {
  /**
   * Handle Week View click  event
   * @param {string} header represemts cell Header
   * @param {string} row represents row clicked
   */
  const handleOnClickWeekView = (header, row) =>
    navigation.navigate('StandardPlan'); //setOpenModal(true);
  return (
    <View>
      <WeekView
        workingDays={workingDays}
        columnHeader={Strings.week}
        onPressHandler={handleOnClickWeekView}
      />
    </View>
  );
};

export default React.memo(StandardPlanContainer);
