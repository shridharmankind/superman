import React, {useEffect} from 'react';
import {View, ActivityIndicator, FlatList, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Label, Button} from 'components/elements';
import {PartiesDirectory} from 'components/widgets';
import styles from '../styles';
import customStyles from './styles';
import {translate} from 'locale';
import {
  fetchMissedCallsCreator,
  partySelector,
  addPartyToDailyPlanCreator,
  landingActions,
} from '../redux';
import {getFormatDate} from 'utils/dateTimeHelper';
import {appSelectors} from 'selectors';
import {appSelector} from 'reducers';
import theme from 'themes';
import {FetchEnumStatus} from 'reducers';
import {landing} from '../redux/dirlandingSlice';
import {showToast, hideToast} from 'components/widgets/Toast';
import {Constants} from 'common';

/**
 * component to fetch missed calls to show on directory landing page
 */
const MissedCalls = () => {
  const dispatch = useDispatch();
  const staffPositionId = useSelector(appSelector.getStaffPositionId());
  useEffect(() => {
    dispatch(
      fetchMissedCallsCreator({
        staffPositionId: staffPositionId,
        month: parseInt(getFormatDate({format: 'M'}), 10),
      }),
    );
  }, [dispatch, staffPositionId]);

  const missedCalls = useSelector(partySelector.getMissedCallsList());
  const fetchState = useSelector(appSelectors.makeGetAppFetch());
  const isPartyAddedToDaily = useSelector(partySelector.isPartyMovedToDaily());

  useEffect(() => {
    console.log('*********missedc', missedCalls);
  }, [missedCalls]);

  useEffect(() => {
    console.log('testtesttesttest', isPartyAddedToDaily);
    if (isPartyAddedToDaily?.id) {
      showToast({
        type: Constants.TOAST_TYPES.SUCCESS,
        visibilityTime: 2000,
        autoHide: true,
        props: {
          // visibilityTime: 2000,
          heading: translate('message.partyAdded'),
          onClose: () => {
            console.log('closing toast');
            hideToast();
            dispatch(landingActions.resetStateForDailyPlan(null));
          },
        },
      });
    }
  }, [dispatch, isPartyAddedToDaily]);

  /**
   * click handler on party to move it to daily plan
   * @param {Number} partyID uniquer id of the party
   */
  const addToTodayPlan = partyID => {
    console.log('clicked', partyID);
    dispatch(landingActions.resetStateForDailyPlan(null));
    dispatch(
      addPartyToDailyPlanCreator({
        staffPositionId: staffPositionId,
        partyId: partyID,
      }),
    );
  };;

  /**
   * returns jsx of button of add to today
   * @param {Object} item party object
   * @returns jsx of button
   */
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

  /**
   * renders missed calls parties list
   * @retuns list of miss calls jsx
   */
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

    return (
      <View>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.id}
          contentContainerStyle={styles.scrollPad}
          data={missedCalls}
          renderItem={({item, index}) => {
            return (
              <View style={customStyles.doctorDetailWrapper}>
                <View
                  key={item.key}
                  style={
                    index === 0
                      ? [
                                  customStyles.doctorDetailContainer,
                                  customStyles.doctorDetailContainerFirstChild,
                                ]
                      : customStyles.doctorDetailContainer
                  }>
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

  /**
   * renders entire view of missed calls component
   * @retuns jsx
   */
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
