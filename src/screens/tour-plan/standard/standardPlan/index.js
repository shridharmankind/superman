import React, {useState, useCallback, useRef} from 'react';
import {View, Dimensions} from 'react-native';
import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {StandardPlanModal} from 'screens/tour-plan';
import styles from './styles';

/**
 * Standard Plan screen component for daily standard plan.
 * This component use SwiperFlatList for swiping the day wise data
 */

const StandardPlan = ({navigation}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [totelIndex, setTotalIndex] = useState(1);
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

  return (
    <SwiperFlatList
      ref={swiperRef}
      showPagination
      index={0}
      paginationStyleItemActive={styles.activePaginationItem}
      paginationStyleItem={styles.paginationItem}
      paginationStyle={styles.paginationStyle}>
      <View style={{width: width}}>
        <StandardPlanModal
          handleSliderIndex={handleSlider}
          navigation={navigation}
          weekTitle={'Week 1 - Monday'}
        />
      </View>
      <View style={{width: width}}>
        <StandardPlanModal
          handleSliderIndex={handleSlider}
          navigation={navigation}
          weekTitle={'Week 1 - Tuesday'}
        />
      </View>
    </SwiperFlatList>
  );
};

const {width} = Dimensions.get('window');

export default StandardPlan;
