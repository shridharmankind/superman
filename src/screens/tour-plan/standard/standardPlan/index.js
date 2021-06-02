import React, {useState, useCallback, useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {StandardPlanModal} from 'screens/tour-plan';
import styles from './styles';

/**
 * Standard Plan screen component for daily standard plan.
 * This component use SwiperFlatList for swiping the day wise data
 */

const StandardPlan = ({navigation, route}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const totelIndex = route.params.workingDays.length - 1;
  const swiperRef = useRef(null);

  const handleSlider = useCallback(
    direction => {
      let index = activeIndex;
      if (direction === 'left') {
        index = index !== 0 ? activeIndex - 1 : activeIndex;
      } else {
        index = activeIndex !== totelIndex ? activeIndex + 1 : activeIndex;
      }
      setActiveIndex(index);
      swiperRef.current.scrollToIndex({index});
    },
    [activeIndex, totelIndex, swiperRef],
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
          />
        </View>
      );
    });
  };

  return (
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
  );
};

const {width} = Dimensions.get('window');

export default StandardPlan;
