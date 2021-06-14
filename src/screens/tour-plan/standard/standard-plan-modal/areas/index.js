import React, {useRef, useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Area, Dropdown, Label, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import themes from 'themes';
import styles from './styles';

/** List of areas component for standard plan template
 * @param {Array} areaList List of area to show
 * @param {Array} areaSelected list of areas selected
 * @param {Function} setAreaSelected Function callback to update selected area list
 * @param {Function} onPress callback method to return area selected
 * @param {Function} handleDropDownValue callBack method to handle patch value selected in dropdown
 * @param {Array} allPatches list of patches
 * @param {Boolean} isPatchedData is existing patched is selected
 */

const Areas = ({
  areaList,
  areaSelected,
  setAreaSelected,
  onPress,
  handleDropDownValue,
  allPatches,
  isPatchedData,
}) => {
  const swiperRef = useRef(null);
  const [hideRightArrow, setHideRightArrow] = useState(false);
  const [scrollOffset, setScrollOffset] = useState(0);

  /** function to hide/show right arrow of area scroll
   * @param {Object} nativeEvent native events of scrollView passed
   */
  const hideScrollArrow = ({layoutMeasurement, contentOffset, contentSize}) => {
    if (layoutMeasurement.width + contentOffset.x >= contentSize.width) {
      setHideRightArrow(true);
    } else {
      setHideRightArrow(false);
    }
  };

  /** function to handle area left swipe*/
  const handleAreaLeftArrow = () => {
    swiperRef.current.scrollTo({x: scrollOffset - 150, y: 0, animated: true});
    setScrollOffset(scrollOffset - 100);
  };

  /** function to handle area right swipe*/
  const handleAreaRightArrow = () => {
    swiperRef.current.scrollTo({x: scrollOffset + 150, y: 0, animated: true});
    setScrollOffset(scrollOffset + 100);
  };

  /** function to check if area is selected
   * @param {String} area if of area
   * @param {Array} areas list of areas
   * @returns {Array} filters areas based on area id
   */
  const isAreaSelected = (area, areas) => {
    return areas?.filter(val => val.id === area).length > 0;
  };

  /** function to handle and update state with area selected
   * @param {Number} val area id passed
   */
  const handleAreaSelected = val => {
    const index = (areaSelected || []).filter(area => area.id === val);
    if (index.length > 0) {
      setAreaSelected(areaSelected.filter(item => item.id !== val));
    } else {
      setAreaSelected([
        ...areaSelected,
        areaList.find(area => area.id === val),
      ]);
    }
    onPress(val);
  };

  /**function to render area component */
  const renderAreas = () => {
    return areaList?.map(area => {
      return (
        <Area
          key={area.id}
          title={area.name}
          value={area.id}
          count={area.totalPartiesInArea}
          bgColor={themes.colors.grey[1400]}
          color={themes.colors.grey[900]}
          selectedColor={themes.colors.grey[1300]}
          selected={isAreaSelected(area.id, areaSelected)}
          selectedTextColor={themes.colors.primary}
          style={styles.areaChip}
          onPress={handleAreaSelected}
          selectedPartyCount={area.totalUniqueParty}
        />
      );
    });
  };

  /**function to return renderAreas() with scollable View */
  const scrollableViewWithArea = () => {
    return (
      <View style={styles.areaFilter}>
        {scrollOffset > 0 && (
          <TouchableOpacity
            onPress={() => handleAreaLeftArrow()}
            style={[styles.swiperArrow, styles.leftArrow]}>
            <Icon name={'chevron-left'} size={10} color={themes.colors.blue} />
          </TouchableOpacity>
        )}
        <ScrollView
          horizontal={true}
          ref={swiperRef}
          onScroll={({nativeEvent}) => {
            hideScrollArrow(nativeEvent);
          }}
          showsHorizontalScrollIndicator={false}>
          {renderAreas()}
        </ScrollView>
        {!hideRightArrow && (
          <TouchableOpacity
            onPress={() => handleAreaRightArrow()}
            style={[styles.swiperArrow, styles.rightArrow]}>
            <Icon name={'chevron-right'} size={10} color={themes.colors.blue} />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.selectAreaContainer}>
      <View>
        <Label
          title={Strings.selectArea}
          variant={LabelVariant.subtitleSmall}
        />
      </View>
      <View style={styles.areaFilterContainer}>
        <Dropdown
          valueSelected={val => handleDropDownValue(val)}
          data={allPatches}
          defaultLabel={Strings.selectPatch}
          isPatchedData={isPatchedData}
        />
        {scrollableViewWithArea()}
      </View>
    </View>
  );
};

export default Areas;
