import React from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {Strings} from 'common';
import {MONTH_ARRAY} from 'screens/tourPlan/constants';
import {Label} from 'components/elements';
import {DoctorDetails} from 'components/elements';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const {colors} = useTheme();
  const dayPlan = [
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      territory: 'Karol Bagh',
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      territory: 'Karol Bagh',
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      territory: 'Karol Bagh',
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      territory: 'Karol Bagh',
    },
  ];

  const getCurrentDateFormatted = () => {
    const currentDate = new Date();
    return `${Strings.today}, ${currentDate.getDate()}th ${
      MONTH_ARRAY[currentDate.getMonth()]
    } ${currentDate.getFullYear()}`;
  };

  const getVisitBifurcationLabel = () => {
    return 'You have 11 doctos and 2 chemist visits';
  };

  const renderDayPlan = () => {
    return (
      <View style={styles.contentView}>
        {dayPlan.map((plan, index) => (
          <DoctorDetails
            key={index}
            title={plan.name}
            specialization={plan.specialization}
            category={plan.category}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Label title={getCurrentDateFormatted()} type="regular" size={16} />
        <Label title={getVisitBifurcationLabel()} type="regular" size={16} />
      </View>
      {renderDayPlan()}
    </View>
  );
};

export default DailyTourPlan;
