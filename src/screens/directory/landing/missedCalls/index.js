import React, {useEffect} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Label, LabelVariant} from 'components/elements';
import styles from '../styles';
import customStyles from './styles';
import {translate} from 'locale';
import {fetchMissedCallsCreator, partySelector} from '../redux';
import {getFormatDate} from 'utils/dateTimeHelper';
import {appSelector} from 'selectors';
import theme from 'themes';
import {FetchEnumStatus} from 'reducers';

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

    return;

    // return (
    //   <View style={styles.listBody}>
    //     <FlatList
    //       nestedScrollEnabled
    //       keyExtractor={item => item.id}
    //       contentContainerStyle={styles.scrollPad}
    //       data={doctorList}
    //       onEndReached={handleLoadMore}
    //       onEndReachedThreshold={0.5}
    //       renderItem={({item, index}) => {
    //         return (
    //           <View style={styles.doctorDataRow}>
    //             <View style={styles.kycCatContainer}>
    //               {item?.isKyc && (
    //                 <View
    //                   style={[
    //                     styles.category,
    //                     {
    //                       backgroundColor: getDivisionColor(
    //                         Constants.DIVISION_COLOR.KYC,
    //                       ),
    //                     },
    //                   ]}>
    //                   <Label
    //                     variant={LabelVariant.h6}
    //                     textColor={theme.colors.white}
    //                     title={Strings.kyc}
    //                     type={'bold'}
    //                   />
    //                 </View>
    //               )}

    //               {item.category !== '' && (
    //                 <View
    //                   style={[
    //                     styles.category,
    //                     ,
    //                     {
    //                       backgroundColor: getDivisionColor(item?.category),
    //                     },
    //                   ]}>
    //                   <Label
    //                     variant={LabelVariant.h6}
    //                     textColor={theme.colors.white}
    //                     style={styles.divisionText}
    //                     title={item?.category?.toUpperCase()}
    //                   />
    //                 </View>
    //               )}
    //             </View>
    //             <Image
    //               style={[styles.docImage]}
    //               source={item.imageUrl ? item.imageUrl : OnErrorHandler(index)}
    //             />
    //             <Label style={styles.dataStyle} title={item.name} />
    //             <Label
    //               style={styles.dataStyle}
    //               title={(item?.specialities || [])
    //                 .map(spec => spec.name)
    //                 .join(', ')}
    //             />
    //             <Label
    //               style={styles.dataStyle}
    //               title={(item?.areas || []).map(area => area.name).join(', ')}
    //             />
    //             <View style={styles.btnsContainer}>
    //               {!item?.isScheduledToday &&
    //                 !isDoctorAddedinTodayPlan(item.id) &&
    //                 renderTodayButton(item)}
    //               <Button
    //                 title={Strings.directory.btns.startEdetail}
    //                 mode="contained"
    //                 contentStyle={styles.eDetailbuttonLayout}
    //                 onPress={() => edetailHandler(item)}
    //                 labelStyle={styles.btnContent}
    //               />
    //             </View>
    //           </View>
    //         );
    //       }}
    //     />
    //   </View>
    // );
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

          {!!missedCalls && missedCallsList()}

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
