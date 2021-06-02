import React, {useState, useCallback, useRef} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {StandardPlanModal} from 'screens/tour-plan';
import styles from './styles';

/**
 * Standard Plan screen component for daily standard plan.
 * This component use SwiperFlatList for swiping the day wise data
 */

const StandardPlan = ({navigation, route}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalIndex = route.params.workingDays.length - 1;
  const [showLeftSwiper, setShowLeftSwiper] = useState(true);
  const [showRightSwiper, setShowRightSwiper] = useState(true);
  const year = route.params.year;
  const swiperRef = useRef(null);

  const handleSlider = useCallback(
    direction => {
      let index = activeIndex;
      if (direction === 'left') {
        index = index !== 0 ? activeIndex - 1 : activeIndex;
        setShowLeftSwiper(!(index === 0));
        setShowRightSwiper(true);
      } else {
        index = activeIndex !== totalIndex ? activeIndex + 1 : activeIndex;
        setShowLeftSwiper(true);

        setShowRightSwiper(index !== totalIndex);
      }
      setActiveIndex(index);
      swiperRef.current.scrollToIndex({index});
    },
    [activeIndex, totalIndex, swiperRef],
  );

  const getIndexOfDay = () => {
    return route.params.workingDays.indexOf(route.params.row);
  };

  const renderStandardPlan = () => {
    return route.params.workingDays.map((day, i) => {
      return (
        <View style={{width: width}} key={i}>
          <StandardPlanModal
            handleSliderIndex={handleSlider}
            navigation={navigation}
            week={route.params.header}
            weekDay={day}
            year={year}
          />
        </View>
      );
    });
  };

  return (
    <>
      {showLeftSwiper && (
        <TouchableOpacity
          style={[styles.swipe, styles.leftSwipe]}
          onPress={() => handleSlider('left')}
        />
      )}
      <SwiperFlatList
        ref={swiperRef}
        showPagination
        renderAll={false}
        index={getIndexOfDay()}
        paginationStyleItemActive={styles.activePaginationItem}
        paginationStyleItem={styles.paginationItem}
        paginationStyle={styles.paginationStyle}>
        {renderStandardPlan()}
      </SwiperFlatList>
      {showRightSwiper && (
        <TouchableOpacity
          style={[styles.swipe, styles.rightSwipe]}
          onPress={() => handleSlider('right')}
        />
      )}
    </>
  );
};

const {width} = Dimensions.get('window');

export default StandardPlan;
