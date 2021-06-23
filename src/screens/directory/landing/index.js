import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, Image} from 'react-native';
import {ContentWithSidePanel} from 'components/layouts';
import {useDispatch, useSelector} from 'react-redux';
import {Label, LabelVariant} from 'components/elements';
import {Strings, Constants} from 'common';
import styles from './styles';
import {TabBar} from 'components/widgets';
import {fetchSearchDoctors, clearSearchDoctors} from './redux/dirlandingSlice';
import {searchDocSelector} from './redux/dirLandingSelector';
import {validateSearch} from 'screens/directory/helper';
import {SearchIcon} from 'assets';
import {Button} from 'components/elements';
import theme from 'themes';
import {getDivisionColor} from 'screens/directory/helper';
import {ROUTE_EDETAILING} from 'screens/directory/routes';
import {showToast, hideToast} from 'components/widgets/Toast';
import {API_PATH} from 'screens/directory/apiPath';
import {NetworkService} from 'services';
import {searchDoctorActions} from 'screens/directory/landing/redux';
/**
 * Custom Landing component of Directory Screen.
 * Initially click on directory left menu this component render
 */
const DirectoryLanding = ({navigation, route}) => {
  const LIMIT = 10;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [skip, setSkip] = useState(0);
  const [searchKeyword, updateSearchKeyword] = useState(
    route?.params?.inputKeyword || null,
  );
  const [doctorsAddedinTodayPlan, updateTodayPlan] = useState([]);
  let filterPrefix;
  const dispatch = useDispatch(); // For dispatching the action
  useEffect(() => {
    if (!!searchKeyword && searchKeyword !== '') {
      filterPrefix = checkForDrPrefix(searchKeyword);
      dispatch(
        fetchSearchDoctors({
          staffPositionId: 1,
          searchKeyword: filterPrefix,
          partyTypeId: 1,
          skip: 0,
          limit: LIMIT,
        }),
      );
      setSkip(LIMIT);
    }

    return () => {
      dispatch(searchDoctorActions.clearSearch());
    };
  }, [dispatch]);

  const docCount = useSelector(searchDocSelector.getSearchDocCount());
  const doctorList = useSelector(searchDocSelector.getSearchDocList());
  const data = [
    {
      text: `${Strings.directory.tab.doctors}(${docCount ? docCount : 0})`,
    },
    {
      text: `${Strings.directory.tab.chemists}`,
    },
    {
      text: `${Strings.directory.tab.stocklists}`,
    },
  ];

  // Dunction to check the dr. prefix and remove it
  const checkForDrPrefix = searchKey => {
    if (!!searchKey) {
      if (searchKey.toLowerCase().indexOf('dr.') === 0) {
        return searchKey.toLowerCase().replace('dr.', '').trim();
      } else {
        return searchKey.trim();
      }
    }
  };

  // For rendering navbars
  const renderNavBar = () => {
    return (
      <View style={styles.mainTabContainer}>
        <TabBar
          values={data}
          onPress={onTabPress}
          customStyle={styles.tabBarContainer}
        />
      </View>
    );
  };

  /**
   * Function to set the state of Tab
   */
  const onTabPress = itemIdx => {
    setSelectedTabIndex(itemIdx);
  };

  // To render the tabs based on selected index
  const renderChildView = () => {
    switch (selectedTabIndex) {
      case 0:
        return doctorTab();
      default:
        return <Label title={Strings.comingSoon} />;
    }
  };

  // Function to clear the search input on click of Clear
  const clearSearchInput = () => {
    updateSearchKeyword(null);
  };

  // Function to be called on search icon
  const doSearch = () => {
    if (!!searchKeyword) {
      const [isValid, drPrefix] = validateSearch(
        searchKeyword,
        clearSearchInput,
      );
      if (isValid) {
        // updateSearchKeyword(searchKey);
        let trimmedKeyword = '';
        if (drPrefix) {
          trimmedKeyword = searchKeyword.toLowerCase().replace('dr.', '');
        } else {
          trimmedKeyword = searchKeyword;
        }
        dispatch(
          fetchSearchDoctors({
            staffPositionId: 1,
            searchKeyword: trimmedKeyword.trim(),
            partyTypeId: 1,
            skip: 0,
            limit: LIMIT,
          }),
        );
        setSkip(LIMIT);
      }
    }
  };

  // Function to be called on click of eDetail button
  const edetailHandler = doctorData => {
    let isDocScheduleToday = false;
    if (doctorData.isScheduledToday) {
      isDocScheduleToday = true;
    } else {
      isDocScheduleToday = isDoctorAddedinTodayPlan(doctorData.id);
    }
    navigation.navigate(ROUTE_EDETAILING, {
      data: {
        doctorID: doctorData.id,
        isScheduledToday: isDocScheduleToday,
        updateCallbk: updateDocTodayPlan,
      },
    });
  };

  // If image is not received from server
  const OnErrorHandler = index => {
    let genderImage = require('assets/images/male.png');
    if (doctorList[index]?.gender) {
      Constants.GENDER.MALE === doctorList[index].gender.toUpperCase()
        ? (genderImage = require('assets/images/male.png'))
        : (genderImage = require('assets/images/female.png'));
    }
    return genderImage;
  };

  // Function for infinite scrolling
  const handleLoadMore = () => {
    filterPrefix = checkForDrPrefix(searchKeyword);
    if (skip < docCount) {
      dispatch(
        fetchSearchDoctors({
          staffPositionId: 1,
          searchKeyword: filterPrefix,
          partyTypeId: 1,
          skip: skip,
          limit: LIMIT,
        }),
      );
      setSkip(prev => prev + LIMIT);
    }
  };

  // Callback Function to update doctorsAddedinTodayPlan
  const updateDocTodayPlan = doctorID => {
    updateTodayPlan([...doctorsAddedinTodayPlan, doctorID]);
  };

  // Function to add doctor to Today's plan
  const addToTodayPlan = doctorID => {
    const addDocToDailyPlan = async () => {
      const result = await NetworkService.post(
        API_PATH.ADD_TODAY_PLAN,
        {},
        {staffPositionId: 1, partyId: doctorID},
      );
      if (result.status === Constants.HTTP_OK) {
        updateTodayPlan([...doctorsAddedinTodayPlan, doctorID]);
        showToast({
          type: Constants.TOAST_TYPES.SUCCESS,
          autoHide: true,
          props: {
            heading: Strings.directory.docAddedTodayPlan,
            onClose: () => hideToast(),
          },
        });
      } else {
        console.log('error', result.statusText);
      }
    };
    addDocToDailyPlan();
  };

  // Function to check if doctor is already added in today's plan
  const isDoctorAddedinTodayPlan = id => {
    if (
      doctorsAddedinTodayPlan.length > 0 &&
      doctorsAddedinTodayPlan.findIndex(item => item === id) > -1
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Below is the doctor tab under directory page
  const doctorTab = () => {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={Strings.searchBar.searchPlaceholder}
            style={styles.searchBar}
            value={searchKeyword}
            onChangeText={text => updateSearchKeyword(text)}
          />
          <SearchIcon
            style={styles.searchIcon}
            height={16}
            width={16}
            onPress={doSearch}
          />
        </View>
        <View>
          <View style={styles.listHeader}>
            <Label
              style={styles.division}
              title={Strings.directory.listHeader.doctor}
            />
            <Label
              style={[styles.division, styles.colwidth]}
              title={Strings.directory.listHeader.speciality}
            />
            <Label
              style={[styles.division, styles.colwidth]}
              title={Strings.directory.listHeader.region}
            />
          </View>

          {!!doctorList && (
            <View style={styles.listBody}>
              <FlatList
                nestedScrollEnabled
                keyExtractor={item => item.id}
                contentContainerStyle={styles.scrollPad}
                data={doctorList}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                renderItem={({item, index}) => {
                  return (
                    <View style={styles.doctorDataRow}>
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
                              title={Strings.kyc}
                              type={'bold'}
                            />
                          </View>
                        )}

                        {item.category !== '' && (
                          <View
                            style={[
                              styles.category,
                              ,
                              {
                                backgroundColor: getDivisionColor(
                                  item?.category,
                                ),
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
                        source={
                          item.imageUrl ? item.imageUrl : OnErrorHandler(index)
                        }
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
                        title={(item?.areas || [])
                          .map(area => area.name)
                          .join(', ')}
                      />
                      <View style={styles.btnsContainer}>
                        {!item?.isScheduledToday &&
                          !isDoctorAddedinTodayPlan(item.id) && (
                            <Button
                              title={Strings.directory.btns.addTodayPlan}
                              mode="contained"
                              contentStyle={styles.todayPlanbuttonLayout}
                              onPress={() => addToTodayPlan(item.id)}
                            />
                          )}
                        <Button
                          title={Strings.directory.btns.startEdetail}
                          mode="contained"
                          contentStyle={styles.eDetailbuttonLayout}
                          onPress={() => edetailHandler(item)}
                          labelStyle={styles.btnContent}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}

          {!!doctorList && doctorList.length === 0 && (
            <View>
              <Label title={Strings.directory.noResult} />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <ContentWithSidePanel header={renderNavBar()}>
      {renderChildView()}
    </ContentWithSidePanel>
  );
};

export default DirectoryLanding;
