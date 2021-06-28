import React, {useEffect} from 'react';
import {View, ActivityIndicator, FlatList, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Label, LabelVariant, Button} from 'components/elements';
import styles from '../styles';
import customStyles from './styles';
import {translate} from 'locale';
import {fetchMissedCallsCreator, partySelector} from '../redux';
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
          onEndReachedThreshold={0.5}
          renderItem={({item, index}) => {
            return (
              <View
                style={
                  index === 0
                    ? customStyles.doctorDataRowFirstChild
                    : styles.doctorDataRow
                }>
                <View style={styles.kycCatContainer}>
                  {item?.isKyc && (
                    <View
                      style={[
                        styles.category,
                        {
                          backgroundColor: getDivisionColor(
                            Constants.DIVISION_COLOR.KYC,
                          ),
                        },
                      ]}>
                      <Label
                        variant={LabelVariant.h6}
                        textColor={theme.colors.white}
                        title={translate('categories.kyc')}
                        type={'bold'}
                      />
                    </View>
                  )}

                  {item.category !== '' && (
                    <View
                      style={[
                        styles.category,
                        {
                          backgroundColor: getDivisionColor(item?.category),
                        },
                      ]}>
                      <Label
                        variant={LabelVariant.h6}
                        textColor={theme.colors.white}
                        style={styles.divisionText}
                        title={item?.category?.toUpperCase()}
                      />
                    </View>
                  )}
                </View>
                <Image
                  style={[styles.docImage]}
                  source={item.imageUrl ? item.imageUrl : OnErrorHandler(index)}
                />
                <Label style={styles.dataStyle} title={item.name} />
                <Label
                  style={styles.dataStyle}
                  title={(item?.specialities || [])
                    .map(spec => spec.name)
                    .join(', ')}
                />
                <Label
                  style={styles.dataStyle}
                  title={(item?.areas || []).map(area => area.name).join(', ')}
                />
                <View style={styles.btnsContainer}>
                  <Button
                    title={translate('tourPlan.monthly.actions.addToTodayPlan')}
                    mode="contained"
                    contentStyle={styles.todayPlanbuttonLayout}
                    // onPress={() => addToTodayPlan(item.id)}
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
            <Label style={customStyles.division} title={translate('dr')} />
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
