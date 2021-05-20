import React from 'react';
import {ScrollView, View} from 'react-native';
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
      location: 'Karol Bagh',
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      location: 'Karol Bagh',
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      location: 'Karol Bagh',
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      location: 'Karol Bagh',
    },
  ];

  const doctorDetailStyleObject = {
    nameContainerCustom: styles.nameContainer,
    specialization: styles.specialization,
    divisionContainerCustom: styles.divisionContainer,
    imageCustom: styles.image,
    titleSize: 14,
    divisionSize: 10,
  };

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
          <View key={index} style={styles.doctorDetailContainer}>
            <DoctorDetails
              title={plan.name}
              specialization={plan.specialization}
              category={plan.category}
              location={plan.location}
              customStyle={doctorDetailStyleObject}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Label title={getCurrentDateFormatted()} type="regular" size={16} />
        <Label title={getVisitBifurcationLabel()} type="regular" size={16} />
      </View>
      {renderDayPlan()}
    </ScrollView>
  );
};

export default DailyTourPlan;
