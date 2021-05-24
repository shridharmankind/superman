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
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
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

  const config = {
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
  };
  const [gestureName, setGestureName] = useState('none');
  const [swipedLeft, setSwipedLeft] = useState(false);

  const onSwipeLeft = gestureState => {
    console.log('swipted');
    setSwipedLeft(true);
    // this.setState({myText: 'You swiped left!'});
  };

  const onSwipe = (gestureName, gestureState) => {
    const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
    setGestureName(gestureName);
    switch (gestureName) {
      case SWIPE_UP:
        console.log('up');
        // this.setState({backgroundColor: 'red'});
        break;
      case SWIPE_DOWN:
        console.log('down');
        // this.setState({backgroundColor: 'green'});
        break;
      case SWIPE_LEFT:
        console.log('left');
        // this.setState({backgroundColor: 'blue'});
        break;
      case SWIPE_RIGHT:
        console.log('right');
        // this.setState({backgroundColor: 'yellow'});
        break;
    }
  };

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

  const renderButton = () => {
    console.log('here');
    return (
      <View>
        <Button
          title={'remove'}
          mode="contained"
          contentStyle={{width: '20%', height: 90}}
        />
      </View>
    );
  };

  /**
   * function to render the list of doctor's planned visits
   * @returns list of doctors planned for current day visit
   */
  const renderDayPlan = () => {
    const sortedDayPlan = dayPlan.sort(sortBasedOnCategory);
    return (
      <View style={styles.contentView}>
        {sortedDayPlan.map((plan, index) => (
          <SwipeRow
            key={index}
            closeOnRowPress
            disableRightSwipe
            preview={index === 0}
            rightOpenValue={-90}
            rightActivationValue={-90}
            stopLeftSwipe={0}
            stopRightSwipe={-90}
            initialRightActionState={true}>
            <View
              style={{
                alignItems: 'flex-end',
                width: '100%',
                height: '100%',
                paddingVertical: 20,
              }}>
              <TouchableOpacity
                style={{height: '100%'}}
                onPress={() =>
                  console.log('delete action triggered', plan, index)
                }>
                <View
                  style={{
                    height: '100%',
                    width: 100,
                    backgroundColor: 'red',
                    paddingHorizontal: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10,
                  }}>
                  <Label>Delete It</Label>
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
                  swiped={swipedLeft}
                />
              </View>
              {swipedLeft && renderButton()}
            </View>
          </SwipeRow>
        ))}
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
