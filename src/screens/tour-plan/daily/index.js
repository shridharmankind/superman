import React, {useState} from 'react';
import {ScrollView, View, Text} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';
import {Label} from 'components/elements';
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
    titleSize: 32,
    subTitleSize: 21,
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
          <View style={styles.doctorDetailWrapper}>
            <View key={index} style={styles.doctorDetailContainer}>
              <GestureRecognizer
                onSwipe={(direction, state) => onSwipe(direction, state)}
                onSwipeLeft={state => onSwipeLeft(state)}
                config={config}
                style={{
                  flex: 1,
                  backgroundColor: 'red',
                }}>
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
              </GestureRecognizer>
            </View>
            {swipedLeft && renderButton()}
          </View>
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
