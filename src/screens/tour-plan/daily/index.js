/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import styles from './styles';
import {Strings} from 'common';
import {Label, Modal, Button, LabelVariant} from 'components/elements';
import {getFormatDate} from 'utils/dateTimeHelper';
import {isWeb} from 'helper';
import {
  fetchDoctorDetailCreator,
  dailySelector,
} from './redux';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import PartyList from 'screens/tourPlan/daily/doctorListing';
/**
 * This file renders the daily plan of the staff - daily visit, missed calls, recommended vists etc.
 */
const DailyTourPlan = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [dayPlanData, setDayPlanData] = useState([]);

  const onTileNameHandler = data => {
    navigation.navigate('Directory', {
      screen: 'DirectoryDoctorProfile',
      params: {data: data},
    });
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
    if (Array.isArray(allDoctorDetail) && allDoctorDetail?.length > 0) {
      setDayPlanData(allDoctorDetail);
    }
  }, [allDoctorDetail]);

  const [visible, setVisible] = useState(false);
  const [itemPressed, setItemPressed] = useState();

  /**
   * formats current date
   * @returns formatted date
   */
  const getCurrentDateFormatted = () => {
    return `${Strings.today}, ${getFormatDate({format: 'Do MMMM YYYY'})}`;
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
        <Label key={i} style={styles.visitText}>
          {boldText}
        </Label>,
      );
    });
    return <Label style={styles.dailyTitle}>{result}</Label>;
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
          variant={LabelVariant.h4}
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
   * click event on tile to show modal to delete a party (in web only)
   */
  const onTilePressHandler = data => {
    if (isWeb()) {
      setVisible(true);
      setItemPressed(data.index);
    }
  };

  return (
    <>
      <View style={styles.heading}>
        <Label
          title={getCurrentDateFormatted()}
          variant={LabelVariant.subtitleLarge}
          style={styles.dailyTitle}
        />
        {getVisitBifurcationLabel()}
      </View>
      <PartyList
        dayPlanData={dayPlanData}
        onTileNamePress={onTileNameHandler}
        onTilePress={onTilePressHandler}
      />
      {pressTile()}
    </>
  );
};

export default DailyTourPlan;
