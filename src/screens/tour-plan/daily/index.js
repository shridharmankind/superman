import React, {useEffect, useState} from 'react';
import {ScrollView, View, Text, TouchableOpacity} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';
import {Label, Modal, Button, SwipeRow} from 'components/elements';
import {DoctorDetails} from 'components/elements';
import {sortBasedOnCategory} from 'screens/tourPlan/helper';
import {getFormatDate} from 'utils/dateTimeHelper';
import {isWeb} from 'helper';
import {fetchDoctorDetailCreator, dailySelector} from './redux';
import {useSelector, useDispatch} from 'react-redux';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const dispatch = useDispatch();
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

  useEffect(() => {
    dispatch(
      fetchDoctorDetailCreator({
        staffPositionid: 2,
        day: 5, // parseInt(getFormatDate({date: new Date(), format: 'D'}), 10),
        month: 5, // parseInt(getFormatDate({date: new Date(), format: 'M'}), 10),
        year: 2021, // parseInt(getFormatDate({date: new Date(), format: 'YYYY'}), 10),
      }),
    );
  }, [dispatch]);

  const allDoctorDetail = useSelector(dailySelector.allDoctorDetail());
  const [dayPlanData, setDayPlanData] = useState([]);

  useEffect(() => {
    setDayPlanData(allDoctorDetail);
  }, [allDoctorDetail]);

  const doctorDetailStyleObject = {
    nameContainerCustom: styles.nameContainer,
    specialization: styles.specialization,
    divisionContainerCustom: styles.divisionContainer,
    imageCustom: styles.image,
    detailsContainerCustom: styles.detailsContainer,
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
          title={Strings.removeDoctorConfirmation}
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
      <View style={styles.modalContentView}>
        <Button
          title={Strings.proceed}
          onPress={() => {
            setVisible(false);
          }}
        />
      </View>
    );
  };

  /**
   * renders modal to show confirmatiion message to remove doctor from daily plan
   * @returns modal
   */
  const pressTile = () => {
    return (
      <Modal
        open={visible}
        onClose={handleDialog}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        customModalPosition={styles.modalContent}
        customModalView={styles.modalView}
      />
    );
  };

  /**
   * function to render the list of doctor's planned visits
   * @returns list of doctors planned for current day visit
   */
  const renderDayPlan = () => {
    const sortedDayPlan = (dayPlanData || []).sort(sortBasedOnCategory);
    return (
      <View style={styles.contentView}>
        {(sortedDayPlan || []).map((plan, index) => {
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
                      title={Strings.removeFromToday}
                      style={styles.removeCardButtonText}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={styles.doctorDetailWrapper}>
                <View key={index} style={styles.doctorDetailContainer}>
                  <DoctorDetails
                    title={plan.name}
                    specialization={dayPlan[index].specialization}
                    category={dayPlan[index].category}
                    location={dayPlan[index].location}
                    customStyle={doctorDetailStyleObject}
                    showFrequencyChiclet={false}
                    showVisitPlan={true}
                    visitData={dayPlan[index].visitData}
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
