import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {DOCTOR_VISIT_STATES} from 'screens/tourPlan/constants';
import {Label, Modal, Button} from 'components/elements';
import {DoctorDetails} from 'components/elements';
import {sortBasedOnCategory} from 'screens/tourPlan/helper';
import {getFormatDate} from 'utils/dateTimeHelper';
import {isWeb} from 'helper';
import {fetchDoctorDetailCreator, dailySelector} from './redux';
import {useSelector, useDispatch} from 'react-redux';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const dispatch = useDispatch();
  const dayPlan = [
    {
      key: '1',
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
      key: '2',
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
      key: '3',
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
      key: '4',
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
      key: '5',
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
      key: '6',
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

  // const [listData, setListData] = useState(
  //   Array(20)
  //     .fill('')
  //     .map((_, i) => ({key: `${i}`, text: `item #${i}`})),
  // );

  const [listData, setListData] = useState(dayPlan);

  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = [...dayPlan];
    const prevIndex = dayPlan.findIndex(item => item.key === rowKey);
    console.log('before', prevIndex, newData);
    newData.splice(prevIndex, 1);
    console.log('after', newData);
    setListData(newData);
  };

  const renderItem = (data, rowMap) => (
    <SwipeRow
      disableRightSwipe={true}
      leftOpenValue={20 + Math.random() * 150}
      rightOpenValue={-90}>
      <View style={styles.rowBack}>
        {/* <Text>Left</Text> */}
        {/* <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnLeft]}
          onPress={() => closeRow(rowMap, data.item.key)}>
          <Text style={styles.backTextWhite}>Close</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.backRightBtn, styles.backRightBtnRight]}
          onPress={() => deleteRow(rowMap, data.item.key)}>
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
        </TouchableOpacity>
      </View>
      <TouchableHighlight
        onPress={() => console.log('You touched me', data)}
        style={styles.rowFront}
        underlayColor={'#AAA'}>
        <View style={styles.doctorDetailWrapper}>
          <View key={data.item.key} style={styles.doctorDetailContainer}>
            <DoctorDetails
              title={data.item.name}
              specialization={dayPlan[data.index].specialization}
              category={dayPlan[data.index].category}
              location={dayPlan[data.index].location}
              customStyle={doctorDetailStyleObject}
              showFrequencyChiclet={false}
              showVisitPlan={true}
              visitData={dayPlan[data.index].visitData}
              showTile={true}
              onTilePress={() => {
                if (isWeb()) {
                  setVisible(true);
                  setItemPressed(data.index);
                }
              }}
            />
          </View>
        </View>
      </TouchableHighlight>
    </SwipeRow>
  );

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
  const isDoctorDetailFetched = useSelector(
    dailySelector.isDoctorDetailReceived(),
  );
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
    let sortedDayPlan = (dayPlanData || []).slice().sort(sortBasedOnCategory);
    return (
      <View style={styles.contentView}>
        {(sortedDayPlan || []).map((plan, index) => {
          return (
            <SwipeRow
              style={styles.swipeRow}
              key={index}
              closeOnRowPress
              disableRightSwipe
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
    <>
      <View style={styles.heading}>
        <Label
          title={getCurrentDateFormatted()}
          type="regular"
          size={16}
          style={styles.dailyTitle}
        />
        {getVisitBifurcationLabel()}
      </View>
      <SwipeListView data={listData} renderItem={renderItem} />

      {pressTile()}
    </>
  );
};

export default DailyTourPlan;
