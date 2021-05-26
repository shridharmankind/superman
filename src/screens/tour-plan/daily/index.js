import React, {useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';
import {Label, Modal, Button, SwipeRow} from 'components/elements';
import {DoctorDetails} from 'components/elements';
import {sortBasedOnCategory} from 'screens/tourPlan/helper';
import {getFormatDate} from 'utils/dateTimeHelper';
import {isWeb} from 'helper';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const dayPlan = [
    {
      name: 'Dr. Ashish Gulati',
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
          date: '26',
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
      name: 'Dr. Manish Kumar ',
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
          date: '26',
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
          date: '26',
          month: 'May',
          state: DOCTOR_VISIT_STATES.TODAY,
        },
        {
          date: '29',
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
          date: '26',
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
      name: 'Dr. Tanmay Singh',
      specialization: ['Dermatologist'],
      category: 'B',
      location: 'Karol Bagh',
      visitData: [
        {
          date: '13',
          month: 'May',
          state: DOCTOR_VISIT_STATES.MISSED,
        },
        {
          date: '29',
          month: 'May',
          state: DOCTOR_VISIT_STATES.UPCOMING,
        },
      ],
    },

    {
      name: 'Balaji Medicos ',
      specialization: ['Chemist'],
      category: '-',
      location: 'Karol Bagh',
      visitData: [
        {
          date: '24',
          month: 'May',
          state: DOCTOR_VISIT_STATES.MISSED,
        },
        {
          date: '29',
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

  const [visible, setVisible] = useState(false);
  const [itemPressed, setItemPressed] = useState();
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
   * toggles modal
   */
  const handleDialog = () => setVisible(!visible);

  /**
   * configures the modal title
   * @returns modal title
   */
  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        <Label
          type="bold"
          title={'Do you want to remove this doctor visit?'}
          size={14}
          style={styles.modalTitleText}
        />
      </View>
    );
  };

  /**
   * renders modal content area
   * @returns modal content
   */
  const getModalContent = () => {
    return (
      <View style={styles.contentView}>
        <Button
          title={'Proceed'}
          onPress={() => {
            console.log(itemPressed);
            setVisible(false);
          }}
        />
      </View>
    );
  };

  const pressTile = () => {
    console.log(itemPressed);
    return (
      <Modal
        open={visible}
        onClose={handleDialog}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        customModalPosition={{alignItems: 'center', justifyContent: 'center'}}
        customModalView={styles.modalView}
      />
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
        {sortedDayPlan.map((plan, index) => {
          let closeRow;

          return (
            <SwipeRow
              style={styles.swipeRow}
              key={index}
              closeOnRowPress
              disableRightSwipe
              preview={index === 0}
              rightOpenValue={-90}
              rightActivationValue={-90}
              stopRightSwipe={-90}
              getCloseRow={closeRowRef => (closeRow = closeRowRef)}
              initialRightActionState={true}>
              <View style={styles.removeCardButtonContainer}>
                <TouchableOpacity
                  style={styles.removeCard}
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
                    showTile={true}
                    onTilePress={() => {
                      if (isWeb()) {
                        setVisible(true);
                        setItemPressed(index);
                      }
                    }}
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
      {pressTile()}
    </ScrollView>
  );
};

export default DailyTourPlan;
