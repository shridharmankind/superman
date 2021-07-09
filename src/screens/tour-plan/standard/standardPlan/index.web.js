import React, {useState, useCallback, useRef} from 'react';
import {View, Dimensions, TouchableOpacity} from 'react-native';
// import {SwiperFlatList} from 'react-native-swiper-flatlist';
import {StandardPlanModal} from 'screens/tour-plan';
import styles from './styles';
import {Constants} from 'common';

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
  const [indexChanged, setIndexChanged] = useState();
  const year = route.params.year;
  const {height} = Dimensions.get('window');

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
      setIndexChanged(null);
      const day = route.params.workingDays[index];
      const dIndex = visitedDays.some(d => d === index);
      if (!dIndex) {
        setVisitedDays([day]);
      }
    },
    [activeIndex, totalIndex, route.params.workingDays, visitedDays],
  );

  const handleSliderNavigation = dir => {
    setIndexChanged(dir);
  };

  const renderStandardPlan = () => {
    return route.params.workingDays.map((day, i) => {
      return (
        <View key={day}>
          {visitedDays.indexOf(day) !== -1 && (
            <StandardPlanModal
              handleSliderIndex={handleSlider}
              navigation={navigation}
              week={route.params.header}
              weekDay={day}
              year={year}
              workingDays={route.params.workingDays}
              indexChanged={indexChanged}
            />
          )}
        </View>
      );
    });
  };

  return (
    <>
      {showLeftSwiper && activeIndex !== 0 && (
        <TouchableOpacity
          style={[styles.swipe, styles.leftSwipe, {height: height}]}
          onPress={() => handleSliderNavigation(Constants.DIRECTION.LEFT)}
        />
      )}
      {renderStandardPlan()}
      {showRightSwiper && activeIndex !== totalIndex && (
        <TouchableOpacity
          style={[styles.swipe, styles.rightSwipe, {height: height}]}
          onPress={() => handleSliderNavigation(Constants.DIRECTION.RIGHT)}
        />
      )}
    </>
  );
};

export default StandardPlan;
