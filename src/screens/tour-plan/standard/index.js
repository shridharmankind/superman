import React from 'react';
import {View} from 'react-native';
import {WeekView} from 'components/elements';
import styles from './styles';

const StandardTour = () => {
  //TODO: data from API .
  const workingDays = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const weeks = ['week 1', 'week 2', 'week 3', 'week 4'];
  return (
    <View style={styles.container}>
      <WeekView workingDays={workingDays} columnHeader={weeks} />
    </View>
  );
};

export default StandardTour;
