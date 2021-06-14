import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {WeekView} from 'components/widgets';
import {Strings} from 'common';
import {
  fetchSTPCalendarUpdateCreator,
  standardTourPlanSelector,
} from '../redux';

/**
 * Standard Tour Plan container
 */
const StandardPlanContainer = ({workingDays, navigation}) => {
  const dispatch = useDispatch();
  const [weekDayData, setWeekDayData] = useState([]);
  const weekDayDataSelector = useSelector(
    standardTourPlanSelector.getSTPData(),
  );
  // Fetch STP Data
  useEffect(() => {
    dispatch(
      fetchSTPCalendarUpdateCreator({
        staffPositionId: 1,
      }),
    );
  }, [dispatch]);

  useEffect(() => {
    setWeekDayData(weekDayDataSelector);
  }, [weekDayDataSelector]);

  /**
   * Handle Week View click  event
   * @param {string} header represemts cell Header
   * @param {string} row represents row clicked
   */
  const handleOnClickWeekView = (header, row) =>
    navigation.navigate('StandardPlan', {
      header,
      row,
      workingDays,
      year: new Date().getFullYear(), //as of now need current year
    });
  return (
    <WeekView
      workingDays={workingDays}
      columnHeader={Strings.week}
      onPressHandler={handleOnClickWeekView}
      weekData={weekDayData}
    />
  );
};

export default React.memo(StandardPlanContainer);
