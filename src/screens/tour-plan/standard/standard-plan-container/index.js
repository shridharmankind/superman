import React from 'react';
import {View} from 'react-native';
import {WeekView} from 'components/widgets';
import {Strings} from 'common';

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
    <WeekView
      workingDays={workingDays}
      columnHeader={Strings.week}
      onPressHandler={handleOnClickWeekView}
    />
  );
};

export default React.memo(StandardPlanContainer);
