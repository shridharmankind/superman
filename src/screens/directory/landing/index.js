import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image } from 'react-native';
import { ContentWithSidePanel } from 'components/layouts';
import { useDispatch, useSelector } from 'react-redux';
import { Label, LabelVariant } from 'components/elements';
import { Strings, Constants } from 'common';
import styles from './styles';
import { TabBar } from 'components/widgets';
import {
  fetchSearchDoctors
} from './redux/dirlandingSlice';
import { searchDocSelector } from './redux/dirLandingSelector';
import { validateSearch } from 'screens/directory/helper';
import { SearchIcon } from 'assets';
import { Button } from 'components/elements';
import theme from 'themes';
import { getDivisionColor } from 'screens/directory/helper';
import { ROUTE_EDETAILING } from 'screens/directory/routes';

/**
 * Custom Landing component of Directory Screen.
 * Initially click on directory left menu this component render
 */
const DirectoryLanding = ({ navigation, route }) => {
  const LIMIT = 10;
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);
  const [skip, setSkip] = useState(0);
  const [searchKeyword, updateSearchKeyword] = useState(
    route?.params?.inputKeyword,
  );
  const dispatch = useDispatch(); // For dispatching the action
  useEffect(() => {
      dispatch(
        fetchSearchDoctors({
          staffPositionId: 1,
          searchKeyword: 'abc',
          partyTypeId:1,
          skip: skip,
          limit: LIMIT,
        }),
      );
      setSkip(prev => prev + LIMIT);
  }, [dispatch]);

  const docCount = useSelector(searchDocSelector.getSearchDocCount());
  const doctorList = useSelector(searchDocSelector.getSearchDocList());
  const data = [
    {
      text: `${Strings.directory.tab.doctors}(${docCount})`,
    },
    {
      text: `${Strings.directory.tab.chemists}`,
    },
    {
      text: `${Strings.directory.tab.stocklists}`,
    },
  ];

  const renderNavBar = () => { // For rendering navbars
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

  const renderChildView = () => {
    switch (selectedTabIndex) {
      case 0:
        return doctorTab();
      default:
        return <Label title={Strings.comingSoon}/>;
    }
  };

  // Function to clear the search input on click of Clear
  const clearSearchInput = () => {
    updateSearchKeyword(null);
  };

  // Function to be called on search icon
  const doSearch = () => {
    const [isValid, searchKey] = validateSearch(
      searchKeyword,
      clearSearchInput,
    );
    if (isValid) {
      updateSearchKeyword(searchKey);
    }
  };

  // Function to be called on click of eDetail button
  const edetailHandler = () => {
    navigation.navigate(ROUTE_EDETAILING);
  }

  // If image is not received from server
  const OnErrorHandler = (index) => {
    const genderImage =
      Constants.GENDER.MALE === doctorList[index].gender.toUpperCase()
        ? require('assets/images/male.png')
        : require('assets/images/female.png');

    return genderImage;
  }

  // Function for infinite scrolling
  const handleLoadMore = () => {
    // if (skip < docCount) {
    //   dispatch(
    //     fetchSearchDoctors({
    //       staffPositionId: 1,
    //       searchKeyword: 'abc',
    //       partyTypeId:1,
    //       skip: skip,
    //       limit: LIMIT,
    //     }),
    //   );
    //   setSkip(prev => prev + LIMIT);
    // }
  }



  const doctorTab = () => {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            placeholder={Strings.searchBar.placeholder}
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
                renderItem={({ item, index }) => {
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

                        {item?.category && (
                          <View
                            style={[
                              styles.category, ,
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
                      <Label style={styles.dataStyle}   title={(item?.specialities || [])
                      .map(spec => spec.name)
                      .join(', ')} />
                      <Label style={styles.dataStyle} title={(item?.areas || [])
                      .map(area => area.name)
                      .join(', ')} />
                      <View style={styles.btnsContainer}>
                        {!item?.isScheduledToday && <Button title={Strings.directory.btns.addTodayPlan}
                          mode="contained"
                          contentStyle={styles.todayPlanbuttonLayout}
                        />}
                        <Button title={Strings.directory.btns.startEdetail}
                          mode="contained"
                          contentStyle={styles.eDetailbuttonLayout}
                          onPress={edetailHandler}
                          labelStyle={styles.btnContent}
                        />
                      </View>
                    </View>
                  );
                }}
              />
            </View>
          )}

          {doctorList.length === 0 && (
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
