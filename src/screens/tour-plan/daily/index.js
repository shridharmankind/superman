import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {MONTH_ARRAY, DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';
import {Label} from 'components/elements';
import {DoctorDetails} from 'components/elements';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const dayPlan = [
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      location: 'Karol Bagh',
      visitData: [
        {
          date: '12',
          month: 'May',
          state: DOCTOR_VISIT_STATES.COMPLETED,
        },
        {
          date: '20',
          month: 'May',
          state: DOCTOR_VISIT_STATES.TODAY,
        },
        {
          date: '27',
          month: 'May',
          state: DOCTOR_VISIT_STATES.UPCOMING,
        },
      ],
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'a+',
      location: 'Karol Bagh',
      visitData: [
        {
          date: '12',
          month: 'May',
          state: DOCTOR_VISIT_STATES.MISSED,
        },
        {
          date: '20',
          month: 'May',
          state: DOCTOR_VISIT_STATES.TODAY,
        },
        {
          date: '27',
          month: 'May',
          state: DOCTOR_VISIT_STATES.UPCOMING,
        },
      ],
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'b',
      location: 'Karol Bagh',
      visitData: [
        {
          date: '12',
          month: 'May',
          state: DOCTOR_VISIT_STATES.TODAY,
        },
        {
          date: '20',
          month: 'May',
          state: DOCTOR_VISIT_STATES.UPCOMING,
        },
      ],
    },
    {
      name: 'Dr. Manoj Manjhi',
      specialization: 'Cardiologist',
      category: 'KYC',
      location: 'Karol Bagh',
      visitData: [
        {
          date: '12',
          month: 'May',
          state: DOCTOR_VISIT_STATES.COMPLETED,
        },
        {
          date: '20',
          month: 'May',
          state: DOCTOR_VISIT_STATES.TODAY,
        },
        {
          date: '27',
          month: 'May',
          state: DOCTOR_VISIT_STATES.UPCOMING,
        },
      ],
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
    // const sample = {
    //   sentence: `${Strings.youHave} {0} ${Strings.and} {1} ${Strings.visits}`,
    //   boldText: [`${Strings.numberOfDoctors}`, `${Strings.numberOfChemist}`],
    // };
    const sample = {
      sentence: 'You have {0} and {1} visits',
      boldText: ['11 doctors', '2 chemist'],
    };
    let numberOfItemsAdded = 0;
    const result = sample.sentence.split(/\{\d+\}/);
    sample.boldText.forEach((boldText, i) => {
      result.splice(
        ++numberOfItemsAdded + i,
        0,
        <Text key={i} style={styles.visitText}>
          {boldText}
        </Text>,
      );
    });
    return <Text style={styles.dailyTitle}>{result}</Text>;
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
              showFrequencyChiclet={false}
              showVisitPlan={true}
              visitData={plan.visitData}
            />
          </View>
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.heading}>
        <Label
          title={getCurrentDateFormatted()}
          type="regular"
          size={16}
          style={styles.dailyTitle}
        />
        {getVisitBifurcationLabel()}
      </View>
      {renderDayPlan()}
    </ScrollView>
  );
};

export default DailyTourPlan;
