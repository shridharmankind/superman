import React, {useEffect} from 'react';
import {View, ActivityIndicator, FlatList, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Label, LabelVariant, Button, DoctorDetails} from 'components/elements';
import styles from '../styles';
import customStyles from './styles';
import {translate} from 'locale';
import {
  fetchMissedCallsCreator,
  partySelector,
  addPartyToDailyPlanCreator,
} from '../redux';
import {getFormatDate} from 'utils/dateTimeHelper';
import {appSelector} from 'selectors';
import theme from 'themes';
import {FetchEnumStatus} from 'reducers';
import {getDivisionColor} from 'screens/directory/helper';
import {Constants} from 'common';

const MissedCalls = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetchMissedCallsCreator({
        staffPositionId: 1,
        month: parseInt(getFormatDate({format: 'M'}), 10),
      }),
    );
  }, [dispatch]);

  const doctorDetailStyleObject = {
    nameContainerCustom: customStyles.nameContainer,
    specialization: customStyles.specialization,
    divisionContainerCustom: customStyles.divisionContainer,
    imageCustom: customStyles.image,
    detailsContainerCustom: customStyles.detailsContainer,
    nameRow: customStyles.nameRow,
    nameCustom: customStyles.name,
    detailsCustom: customStyles.details,
    titleSize: 12,
    subTitleSize: 12,
    divisionSize: 9.3,
  };

  const missedCalls = useSelector(partySelector.getMissedCallsList());
  const fetchState = useSelector(appSelector.makeGetAppFetch());

  const OnErrorHandler = index => {
    let genderImage = require('assets/images/male.png');
    if (missedCalls[index]?.gender) {
      Constants.GENDER.MALE === missedCalls[index].gender.toUpperCase()
        ? (genderImage = require('assets/images/male.png'))
        : (genderImage = require('assets/images/female.png'));
    }
    return genderImage;
  };

  const addToTodayPlan = partyID => {
    dispatch(
      addPartyToDailyPlanCreator({
        staffPositionId: 1,
        partyId: partyID,
      }),
    );
  };

  const renderTodayButton = item => {
    return (
      <View>
        <Button
          title={translate('tourPlan.monthly.actions.addToTodayPlan')}
          mode="contained"
          contentStyle={customStyles.btnAddToToday}
          onPress={() => addToTodayPlan(item.id)}
        />
      </View>
    );
  };

  const missedCallsList = () => {
    if (fetchState === FetchEnumStatus.FETCHING) {
      return (
        <ActivityIndicator
          animating={true}
          color={theme.colors.darkBlue}
          size="large"
          style={styles.activityIndicator}
        />
      );
    }

    console.log('missedcalls', missedCalls);

    return (
      <View style={styles.listBody}>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollPad}
          data={missedCalls}
          // onEndReached={handleLoadMore}
          // onEndReachedThreshold={0.5}
          renderItem={({item, index}) => {
            return (
              <View style={customStyles.doctorDetailWrapper}>
                <View key={item.key} style={customStyles.doctorDetailContainer}>
                  <DoctorDetails
                    title={item.name}
                    specialization={item.specialities}
                    isKyc={item.isKyc}
                    gender={item.gender}
                    category={item.category}
                    location={item.areas}
                    partyType={item?.partyTypes?.name}
                    customStyle={doctorDetailStyleObject}
                    showFrequencyChiclet={false}
                    showVisitPlan={true}
                    visitData={item.visitData}
                    showTile={false}
                    locationSeperator={false}
                    showTodayPlanButton={true}
                    actionButton={() => renderTodayButton(item)}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const renderView = () => {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.listHeader}>
            <Label
              style={[customStyles.division, styles.colwidth]}
              title={translate('dr')}
            />
            <Label
              style={[customStyles.division, styles.colwidth]}
              title={translate('speciality')}
            />
            <Label
              style={[customStyles.division, styles.colwidth]}
              title={translate('region')}
            />
          </View>

          {missedCallsList()}

          {!!missedCalls && missedCalls.length === 0 && (
            <View>
              <Label title={translate('errorMessage.noRecords')} />
            </View>
          )}
        </View>
      </View>
    );
  };
  return renderView();
};

export default MissedCalls;
