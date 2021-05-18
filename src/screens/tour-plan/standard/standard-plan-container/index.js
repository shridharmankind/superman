import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {WeekView} from 'components/widgets';
import {Strings} from 'common';
import styles from './styles';
import {fetchWorkingDays} from '../../../../api';
import {StandardPlanModal} from 'screens/tourPlan';

/**
 * Standard Tour Plan container
 */
const StandardPlanContainer = () => {
  const [workingDays, setworkingDays] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchWorkingDays('india');
      if (result.data) {
        setworkingDays(result.data);
      }
    };
    fetchData();
  }, []);

  /**
   * Handle Week View click  event
   * @param {string} header represemts cell Header
   * @param {string} row represents row clicked
   */
  const handleOnClickWeekView = (header, row) => setOpenModal(true);

  return (
    <View style={styles.container}>
      <WeekView
        workingDays={workingDays}
        columnHeader={Strings.week}
        onPressHandler={handleOnClickWeekView}
      />
      {openModal && (
        <StandardPlanModal
          visible={openModal}
          hideModal={() => setOpenModal(false)}
        />
      )}
    </View>
  );
};

export default StandardPlanContainer;
