import React, {useState, useCallback, useRef} from 'react';
import {
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {StandardPlanModal} from 'screens/tour-plan';
import styles from './styles';
import {Constants} from 'common';
import themes from 'themes';
import {appSelector} from 'selectors';
import {FetchEnumStatus} from 'reducers';

/**
 * Standard Plan screen component for daily standard plan.
 * This component use SwiperFlatList for swiping the day wise data
 */

const StandardPlan = ({navigation, route}) => {
  const [activeIndex, setActiveIndex] = useState(
    route.params.workingDays.indexOf(route.params.row),
  );
  const totalIndex = route.params.workingDays.length - 1;
  const [showLeftSwiper, setShowLeftSwiper] = useState(true);
  const [showRightSwiper, setShowRightSwiper] = useState(true);
  const [visitedDays, setVisitedDays] = useState([route.params.row]);
  const year = route.params.year;
  const swiperRef = useRef(null);

  const fetchStatus = useSelector(appSelector.makeGetAppFetch());

  const handleSlider = useCallback(
    direction => {
      let index = activeIndex;
      if (direction === Constants.DIRECTION.LEFT) {
        index = index !== 0 ? activeIndex - 1 : activeIndex;
        setShowLeftSwiper(!(index === 0));
        setShowRightSwiper(true);
      } else {
        index = activeIndex !== totalIndex ? activeIndex + 1 : activeIndex;
        setShowLeftSwiper(true);

        setShowRightSwiper(index !== totalIndex);
      }
      setActiveIndex(index);
      visitedDayIndex(index);
      swiperRef.current.scrollToIndex({index});
    },
    [activeIndex, totalIndex, swiperRef, visitedDayIndex],
  );

  const visitedDayIndex = useCallback(
    i => {
      const day = route.params.workingDays[i];
      const index = visitedDays.some(d => d === i);
      if (!index) {
        setVisitedDays([day]);
      }
    },
    [visitedDays, route.params.workingDays],
  );

  const getIndexOfDay = () => {
    return route.params.workingDays.indexOf(route.params.row);
  };

  const renderStandardPlan = () => {
    return route.params.workingDays.map((day, i) => {
      return (
        <View style={{width: width}} key={day}>
          {visitedDays.indexOf(day) !== -1 && (
            <StandardPlanModal
              handleSliderIndex={handleSlider}
              navigation={navigation}
              week={route.params.header}
              weekDay={day}
              year={year}
              workingDays={route.params.workingDays}
            />
          )}
        </View>
      );
    });
  };

  return (
    <>
      {showLeftSwiper && (
        <TouchableOpacity
          style={[styles.swipe, styles.leftSwipe]}
          onPress={() => handleSlider(Constants.DIRECTION.LEFT)}
        />
      )}
      <SwiperFlatList
        ref={swiperRef}
        showPagination
        renderAll={false}
        index={getIndexOfDay()}
        onChangeIndex={({index}) => visitedDayIndex(index)}
        paginationStyleItemActive={styles.activePaginationItem}
        paginationStyleItem={styles.paginationItem}
        paginationStyle={styles.paginationStyle}>
        {renderStandardPlan()}
      </SwiperFlatList>
      {showRightSwiper && (
        <TouchableOpacity
          style={[styles.swipe, styles.rightSwipe]}
          onPress={() => handleSlider(Constants.DIRECTION.RIGHT)}
        />
      )}
      {fetchStatus === FetchEnumStatus.FETCHING && (
        <ActivityIndicator
          animating={true}
          color={themes.colors.darkBlue}
          size="large"
          style={styles.activityIndicator}
        />
      )}
    </>
  );
};

const {width} = Dimensions.get('window');

export default StandardPlan;
