import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import styles from './styles';
import {Strings, Constants} from 'common';
import {Label, Modal, Button, LabelVariant} from 'components/elements';
import {getFormatDate} from 'utils/dateTimeHelper';
import {isWeb} from 'helper';
import {
  fetchDoctorDetailCreator,
  dailySelector,
  deletePartyCreator,
} from './redux';
import {useNavigation} from '@react-navigation/native';
import PartyList from 'screens/tourPlan/daily/doctorListing';
import {showToast, hideToast} from 'components/widgets/Toast';
import {translate} from 'locale';
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
        staffPositionid: 1,
        day: parseInt(getFormatDate({format: 'D'}), 10),
        month: parseInt(getFormatDate({format: 'M'}), 10),
        year: parseInt(getFormatDate({format: 'YYYY'}), 10),
      }),
    );
  }, [dispatch]);

  const allDoctorDetail = useSelector(dailySelector.allDoctorDetail());
  const doctorRemoveError = useSelector(dailySelector.doctorDetailError());

  useEffect(() => {
    if (doctorRemoveError !== '') {
      showToast({
        type: Constants.TOAST_TYPES.ALERT,
        props: {
          onClose: () => {
            hideToast();
          },
          subHeading: doctorRemoveError,
        },
      });
    }
  }, [doctorRemoveError]);

  /**
   * set parties list in state
   */
  useEffect(() => {
    setDayPlanData(allDoctorDetail);
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
   * returns string from doctor/chemist count - 5 doctors or 1 chemist
   * @param {Number} partycount count of doctors/chemist
   * @param {String} type type of party - doctor/chemist
   * @returns visit string
   */
  const getVisitString = (partycount, type) => {
    if (partycount === 0) {
      return '';
    }
    if (partycount === 1) {
      return type === Constants.PARTY_TYPE.DOCTOR
        ? `${partycount} ${Strings.numberOfDoctors}`
        : `${partycount} ${Strings.numberOfChemist}`;
    }

    return type === Constants.PARTY_TYPE.DOCTOR
      ? `${partycount} ${Strings.numberOfDoctors}s`
      : `${partycount} ${Strings.numberOfChemist}s`;
  };

  /**
   * formats the stirng to make some words of text bold
   * @returns formatted string
   */
  const getVisitBifurcationLabel = () => {
    let doctorString = '';
    let chemistString = '';
    let result = '';
    if (dayPlanData?.length > 0) {
      const doctorCount = dayPlanData?.filter(plan => {
        return (
          (plan.partyTypes?.name || '').toLowerCase() ===
          Constants.PARTY_TYPE.DOCTOR.toLowerCase()
        );
      });

      const chemistCount = dayPlanData?.filter(plan => {
        return (
          (plan.partyTypes?.name || '').toLowerCase() ===
          Constants.PARTY_TYPE.CHEMIST.toLowerCase()
        );
      });

      doctorString = getVisitString(
        doctorCount.length,
        Constants.PARTY_TYPE.DOCTOR,
      );
      chemistString = getVisitString(
        chemistCount.length,
        Constants.PARTY_TYPE.CHEMIST,
      );

      let sample = {
        sentence: `${Strings.youHave} {0} ${Strings.and} {1} ${Strings.visits}`,
        boldText: [doctorString, chemistString],
      };

      if (doctorString === '' && chemistString === '') {
        return '';
      }

      if (doctorString === '' && chemistString !== '') {
        sample = {
          sentence: `${Strings.youHave} {0} ${Strings.visits}`,
          boldText: [chemistString],
        };
      } else if (doctorString !== '' && chemistString === '') {
        sample = {
          sentence: `${Strings.youHave} {0} ${Strings.visits}`,
          boldText: [doctorString],
        };
      }
      let numberOfItemsAdded = 0;
      result = sample.sentence.split(/\{\d+\}/);
      sample.boldText.forEach((boldText, i) => {
        result.splice(
          ++numberOfItemsAdded + i,
          0,
          <Label key={i} style={styles.visitText}>
            {boldText}
          </Label>,
        );
      });
    }
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
          contentStyle={styles.modalButton}
          title={Strings.proceed}
          onPress={() => {
            dispatch(
              deletePartyCreator({
                staffPositionid: 1,
                day: parseInt(
                  getFormatDate({date: new Date(), format: 'D'}),
                  10,
                ),
                month: parseInt(
                  getFormatDate({date: new Date(), format: 'M'}),
                  10,
                ),
                year: parseInt(
                  getFormatDate({date: new Date(), format: 'YYYY'}),
                  10,
                ),
                partyId: itemPressed.id,
              }),
            );
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
        customModalCenteredView={styles.customModalCenteredView}
      />
    );
  };

  /**
   * click event on tile to show modal to delete a party (in web only)
   */
  const onTilePressHandler = data => {
    if (isWeb()) {
      setVisible(true);
      setItemPressed(data);
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
      {dayPlanData.length > 0 && (
        <PartyList
          dayPlanData={dayPlanData}
          onTileNamePress={onTileNameHandler}
          onTilePress={onTilePressHandler}
        />
      )}
      {dayPlanData.length === 0 && (
        <Label
          title={translate('errorMessage.noRecords')}
          variant={LabelVariant.subtitleLarge}
          style={styles.error}
        />
      )}
      {pressTile()}
    </>
  );
};

export default DailyTourPlan;
