import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, LabelVariant} from 'components/elements';
import styles from './styles';
import {TouchableOpacity, View, FlatList} from 'react-native';
import {Strings} from 'common';
import {ArrowBack} from 'assets';
import {isWeb} from 'helper';
import theme from 'themes';
import {
  fetchDetailingPriorityProductCreator,
  fetchDetailingOtherProductCreator,
  eDetailingSelector,
} from './redux';
import {Product} from 'components/widgets';

/**
 * Render header
 *
 * @param {Object} {navigation}
 */
const renderHeader = ({navigation}) => (
  <View style={[styles.eDetailingHead]}>
    <View style={[styles.eDetailingHeadCol]}>
      {isWeb() ? null : (
        <TouchableOpacity
          testID="eDetail-back"
          style={styles.eDetailingHeadBack}
          onPress={() => navigation.goBack()}>
          <ArrowBack width={24} height={24} />
        </TouchableOpacity>
      )}
    </View>
    <View style={[styles.eDetailingHeadCol]}>
      <Label
        testID="eDetail-title"
        variant={LabelVariant.h2}
        title={Strings.eDetailing}
      />
    </View>
    <View style={[styles.eDetailingStart]}>
      <Button
        testID="eDetail-start-presentation"
        title={Strings.startPresentation}
        mode="contained"
        contentStyle={styles.eDetailingStartContent}
        labelStyle={styles.eDetailingStartText}
      />
    </View>
  </View>
);

/**
 * E detailing component
 *
 * @param {Object} {navigation}
 * @return {JSX} Edetailing component
 */
const EDetailing = ({navigation}) => {
  const LIMIT = 10; // limit of priority to be fetched from server
  const dispatch = useDispatch();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [skip, setSkip] = useState(0);
  const swiperRef = useRef(null);

  useEffect(() => {
    dispatch(
      fetchDetailingPriorityProductCreator({
        staffPositionID: 1,
        partyId: 1,
        skip: 0,
        limit: LIMIT,
      }),
    );
    setSkip(prev => prev + LIMIT);
  }, [dispatch]);

  const priorityProductList = useSelector(
    eDetailingSelector.getPriorityProduct(),
  );
  const hideScrollArrow = () => {
    dispatch(
      fetchDetailingPriorityProductCreator({
        staffPositionID: 1,
        partyId: 1,
        skip: skip,
        limit: LIMIT,
      }),
    );
    //Once API Done I will Uncomment this
    // setSkip(prev => prev + LIMIT);
  };

  const renderSwape = (item, index) => {
    console.log(item, index);
    return (
      <View style={styles.swapMain} key={item.id}>
        <Product title={item.name} isChecked={true} tags={['P1']} />
      </View>
    );
  };

  const handleAreaRightArrow = () => {
    console.log(swiperRef.current.scrollToOffset);

    swiperRef.current.scrollToOffset({
      offset: scrollOffset + 150,
      animated: true,
    });
    setScrollOffset(scrollOffset + 100);
  };

  const handleAreaLeftArrow = () => {
    swiperRef.current.scrollToOffset({
      offset: scrollOffset + 150,
      animated: true,
    });
    setScrollOffset(scrollOffset - 100);
  };
  /**function to return renderAreas() with scollable View
   * @param {String} icon name of icon to use
   */
  const renderArrow = icon => (
    <Icon name={icon} size={10} color={theme.colors.blue} />
  );

  return (
    <ContentWithSidePanel header={renderHeader({navigation})}>
      <View style={[styles.eDetailingPriorityProducts]}>
        <Label
          testID="eDetail-priority-products"
          variant={LabelVariant.subtitleLarge}
          title={Strings.priorityProducts}
        />
        <View style={[styles.eDetailingPriorityProductsList]}>
          <View style={[styles.arrowContainer, styles.leftArrow]}>
            <TouchableOpacity onPress={() => handleAreaLeftArrow()}>
              <View style={[styles.swiperArrow]}>
                {renderArrow('chevron-left')}
              </View>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            ref={swiperRef}
            data={priorityProductList}
            showsHorizontalScrollIndicator={true}
            onEndReached={hideScrollArrow}
            onEndReachedThreshold={0.5}
            renderItem={({item, index}) => {
              return renderSwape(item, index);
            }}
            contentContainerStyle={[styles.priorityProducts]}
          />
          <View style={[styles.arrowContainer, styles.rightArrow]}>
            <TouchableOpacity onPress={() => handleAreaRightArrow()}>
              <View style={[styles.swiperArrow]}>
                {renderArrow('chevron-right')}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Label
        testID="eDetail-priority-other-products"
        variant={LabelVariant.subtitleLarge}
        title={Strings.otherProducts}
      />
    </ContentWithSidePanel>
  );
};

export default EDetailing;
