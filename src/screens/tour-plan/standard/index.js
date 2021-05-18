import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {WeekView} from 'components/elements';
import {Strings} from 'common';
import styles from './styles';
import {fetchWorkingDays} from '../../../api';

const StandardTour = () => {
  const [workingDays, setworkingDays] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchWorkingDays('india');
      if (result.data) {
        setworkingDays(result.data);
      }
    };
    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      <WeekView workingDays={workingDays} columnHeader={Strings.week} />
    </View>
  );
};

export default StandardTour;
