import React, {useEffect} from 'react';
import {View, ActivityIndicator, FlatList, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Label, LabelVariant, Button} from 'components/elements';
import {PartiesDirectory} from 'components/widgets';
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
      <View>
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
                  <PartiesDirectory
                    title={item.name}
                    specialization={item.specialities}
                    isKyc={item.isKyc}
                    gender={item.gender}
                    category={item.category}
                    location={item.areas}
                    partyType={item?.partyTypes?.name}
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
        <View style={customStyles.listHeader}>
          <View style={customStyles.listHeaderSpacing1}>
            <Label style={customStyles.division} title={translate('dr')} />
          </View>
          <View style={customStyles.listHeaderSpacing2}>
            <Label
              style={customStyles.division}
              title={translate('speciality')}
            />
          </View>
          <View>
            <Label style={customStyles.division} title={translate('region')} />
          </View>
        </View>

        {missedCallsList()}

        {!!missedCalls && missedCalls.length === 0 && (
          <View>
            <Label title={translate('errorMessage.noRecords')} />
          </View>
        )}
      </View>
    );
  };
  return renderView();
};

export default MissedCalls;
