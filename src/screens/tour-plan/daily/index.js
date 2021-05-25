/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';
import {Label, SwipeRow} from 'components/elements';
import {DoctorDetails, Button} from 'components/elements';
import {sortBasedOnCategory} from 'screens/tourPlan/helper';
import {getFormatDate} from 'utils/dateTimeHelper';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const dayPlan = [
    {
      name: 'Dr. Manoj Manjhi',
      specialization: ['Cardiologist'],
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
      specialization: ['Cardiologist'],
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
      specialization: ['Cardiologist'],
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
      specialization: ['Cardiologist'],
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
    titleSize: 21,
    subTitleSize: 14,
    divisionSize: 10,
  };

  /**
   * formats current date
   * @returns formatted date
   */
  const getCurrentDateFormatted = () => {
    return `${Strings.today}, ${getFormatDate({format: 'Do MMM YYYY'})}`;
  };

  /**
   * formats the stirng to make some words of text bold
   * @returns formatted string
   */
  const getVisitBifurcationLabel = () => {
    const sample = {
      sentence: `${Strings.youHave} {0} ${Strings.and} {1} ${Strings.visits}`,
      boldText: [`${Strings.numberOfDoctors}`, `${Strings.numberOfChemist}`],
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

  /**
   * function to render the list of doctor's planned visits
   * @returns list of doctors planned for current day visit
   */
  const renderDayPlan = () => {
    const sortedDayPlan = dayPlan.sort(sortBasedOnCategory);
    return (
      <View style={styles.contentView}>
        {sortedDayPlan.map((plan, index) => {
          let closeRow;

          return (
            <SwipeRow
              style={{marginTop: 20}}
              key={index}
              closeOnRowPress
              disableRightSwipe
              preview={index === 0}
              rightOpenValue={-90}
              rightActivationValue={-90}
              stopRightSwipe={-90}
              getCloseRow={closeRowRef => (closeRow = closeRowRef)}
              initialRightActionState={true}>
              <View
                style={{
                  alignItems: 'flex-end',
                  width: '100%',
                  height: '110%',
                  marginTop: 5,
                }}>
                <TouchableOpacity
                  style={{
                    height: '100%',
                    paddingBottom: 20,
                    justifyContent: 'center',
                  }}
                  onPress={() => {
                    closeRow && closeRow();
                    console.log('delete action triggered', plan, index);
                  }}>
                  <View style={styles.removeCardButton}>
                    <View style={styles.closeLabel}>
                      <Label
                        title={'X'}
                        style={[
                          styles.removeCardButtonText,
                          styles.removeCardButtonClose,
                        ]}
                      />
                    </View>
                    <Label
                      title={'Remove from today'}
                      style={styles.removeCardButtonText}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.doctorDetailWrapper}>
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
              </View>
            </SwipeRow>
          );
        })}
      </View>
    );
  };

  return (
    <ScrollView>
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
