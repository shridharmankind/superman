/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TouchableHighlight} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import styles from './styles';
import {Strings} from 'common';
import {Label, Modal, Button} from 'components/elements';
import {DoctorDetails} from 'components/elements';
import {getFormatDate} from 'utils/dateTimeHelper';
import {isWeb} from 'helper';
import {
  fetchDoctorDetailCreator,
  dailySelector,
  deletePartyCreator,
} from './redux';
import {useSelector, useDispatch} from 'react-redux';
import {showToast, hideToast} from 'components/widgets/Toast';
import {Constants} from 'common';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [dayPlanData, setDayPlanData] = useState([]);

  /**
   * Function to close the swipe
   * @param {Object} rowMap object containing mapping of rows
   * @param {Object} rowKey object containing the swiped row and props
   */
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  /**
   * Function to delete the swiped row
   *@param {Object} rowMap object containing mapping of rows
   * @param {Object} rowKey object containing the swiped row and props
   * @param {Object} item daily plan object for a party
   */
  const deleteRow = (rowMap, rowKey, item) => {
    let undoclicked = false;
    showToast({
      type: Constants.TOAST_TYPES.ALERT,
      props: {
        onPress: () => {
          undoclicked = true;
          hideToast();
          closeRow(rowMap, rowKey);
        },
        heading: `${Strings.removed}!`,
        subHeading: `${Strings.removedDoctor}`,
        actionTitle: `${Strings.undo}`,
      },
      onHide: () => {
        closeRow(rowMap, rowKey);

        if (!undoclicked) {
          dispatch(
            deletePartyCreator({
              staffPositionid: 3,
              day: 5, // parseInt(getFormatDate({date: new Date(), format: 'D'}), 10),
              month: 5, // parseInt(getFormatDate({date: new Date(), format: 'M'}), 10),
              year: 2021, // parseInt(getFormatDate({date: new Date(), format: 'YYYY'}), 10),
              partyId: item.id,
            }),
          );
        }
      },
    });
  };

  /**
   * Function to render parties list in swipe list view
   * @param {Object} data party data
   * @param {Object} rowMap object containing mapping of rows
   */
  const renderItem = (data, rowMap) => {
    return (
      <SwipeRow
        disableRightSwipe={true}
        leftOpenValue={20 + Math.random() * 150}
        rightOpenValue={-90}>
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => deleteRow(rowMap, data.item.id, data.item)}>
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
          onPress={() => console.log('click event')}
          style={styles.rowFront}
          underlayColor={colors.transparent}>
          <View style={styles.doctorDetailWrapper}>
            <View key={data.item.key} style={styles.doctorDetailContainer}>
              <DoctorDetails
                title={data.item.name}
                specialization={data.item.specialization}
                category={data.item.category}
                location={data.item.location}
                customStyle={doctorDetailStyleObject}
                showFrequencyChiclet={false}
                showVisitPlan={true}
                visitData={data.item.visitData}
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
  };

  /**
   * Fetch parties list
   */
  useEffect(() => {
    dispatch(
      fetchDoctorDetailCreator({
        staffPositionid: 3,
        day: 5, // parseInt(getFormatDate({date: new Date(), format: 'D'}), 10),
        month: 5, // parseInt(getFormatDate({date: new Date(), format: 'M'}), 10),
        year: 2021, // parseInt(getFormatDate({date: new Date(), format: 'YYYY'}), 10),
      }),
    );
  }, [dispatch]);

  const allDoctorDetail = useSelector(dailySelector.allDoctorDetail());

  /**
   * set parties list in state
   */
  useEffect(() => {
    if (Array.isArray(allDoctorDetail) && allDoctorDetail.length > 0) {
      setDayPlanData(allDoctorDetail);
    }
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
      <SwipeListView data={dayPlanData} renderItem={renderItem} />
      {pressTile()}
    </>
  );
};

export default DailyTourPlan;
