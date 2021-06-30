import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import themes from 'themes';
import {Label, LabelVariant} from 'components/elements';
import {translate} from 'locale';
import EDetailedList from '../../../../../data/mock/api/eDetailedProduct.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductModal from '../ProductModal';

/**
 * Custom modal component render for eDtailing DCR.
 */

const EDetailingDCR = ({}) => {
  const [otherProductList, setOtherProductList] = useState(
    JSON.parse(JSON.stringify(EDetailedList)),
  );
  const [discussedList, setDiscussedList] = useState([]);
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollDiscussedOffset, setScrollDiscussedOffset] = useState(0);
  const [scrollOtherOffset, setScrollOtherOffset] = useState(0);
  const [hideEdtailRightArrow, setHideEdtailRightArrow] = useState(false);
  const [hideDiscussedRightArrow, setHideDiscussedRightArrow] = useState(false);
  const [hideOtherRightArrow, setHideOtherRightArrow] = useState(false);
  const eDetailedRef = useRef(null);
  const otherProduct = useRef(null);
  const discussproduct = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const renderArrow = icon => (
    <Icon name={icon} size={10} color={themes.colors.blue} />
  );
  const handleOtherAreaLeftArrow = () => {
    eDetailedRef.current.scrollTo({
      x: scrollOffset - 150,
      y: 0,
      animated: true,
    });
    setScrollOffset(scrollOffset - 100);
  };

  const handleDiscussedAreaLeftArrow = () => {
    discussproduct.current.scrollTo({
      x: scrollDiscussedOffset - 150,
      y: 0,
      animated: true,
    });
    setScrollDiscussedOffset(scrollDiscussedOffset - 100);
  };
  const handleDiscussedAreaRightArrow = () => {
    discussproduct.current.scrollTo({
      x: scrollDiscussedOffset + 150,
      y: 0,
      animated: true,
    });
    setScrollDiscussedOffset(scrollDiscussedOffset + 100);
  };
  const handleAreaLeftArrow = () => {
    otherProduct.current.scrollTo({
      x: scrollOtherOffset - 150,
      y: 0,
      animated: true,
    });
    setScrollOtherOffset(scrollOtherOffset - 100);
  };
  const handleOtherAreaRightArrow = () => {
    otherProduct.current.scrollTo({
      x: scrollOtherOffset + 150,
      y: 0,
      animated: true,
    });
    setScrollOtherOffset(scrollOtherOffset + 100);
  };
  const handleAreaRightArrow = () => {
    eDetailedRef.current.scrollTo({
      x: scrollOffset + 150,
      y: 0,
      animated: true,
    });
    setScrollOffset(scrollOffset + 100);
  };
  const renderDiscussedList = () => {
    return discussedList.map(dataItem => {
      return (
        <View key={dataItem.motherBrandId}>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={[styles.discussList, styles.featureItem]}
            title={dataItem.name}
          />
        </View>
      );
    });
  };
  const renderEDetailed = item => {
    return (
      <View>
        <Label
          variant={LabelVariant.subtitleLarge}
          style={[styles.discussList, item.isFeatured ? styles.eDetailed : '']}
          title={item.name}
        />
      </View>
    );
  };
  const renderEdetailedProduct = () => {
    return EDetailedList.map(value => {
      return <View key={value.motherBrandId}>{renderEDetailed(value)}</View>;
    });
  };

  const onCloseHandler = () => {
    setShowModal(false);
  };

  const doneHandler = (discussList, motherId, currentList) => {
    for (let product of otherProductList) {
      if (product.motherBrandId === motherId) {
        for (let subProduct of product.subList) {
          let findIndex = currentList.findIndex(
            item => subProduct.name === item.name,
          );
          if (findIndex !== -1) {
            subProduct['isChecked'] = currentList[findIndex].isChecked;
          }
        }
      }
    }
    setOtherProductList([...otherProductList]);
    setDiscussedList([...discussList]);
    setShowModal(false);
  };
  const hideScrollArrow = ({layoutMeasurement, contentOffset, contentSize}) => {
    const hideFlag = Math.ceil(
      layoutMeasurement.width + contentOffset.x >= contentSize.width,
    );
    setHideEdtailRightArrow(hideFlag);
  };

  const hideDiscussedScrollArrow = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const hideFlag = Math.ceil(
      layoutMeasurement.width + contentOffset.x >= contentSize.width,
    );
    setHideDiscussedRightArrow(hideFlag);
  };

  const hideOtherScrollArrow = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const hideFlag = Math.ceil(
      layoutMeasurement.width + contentOffset.x >= contentSize.width,
    );
    setHideOtherRightArrow(hideFlag);
  };
  const renderOtherProduct = () => {
    return otherProductList.map(otherItem => {
      return (
        <View key={otherItem.motherBrandId}>
          <View>
            <Label
              variant={LabelVariant.subtitleLarge}
              style={[styles.discussList, styles.eDetailedNonFeature]}
              title={otherItem.name}
              onPress={() => {
                setCurrentProduct({...otherItem});
                setShowModal(true);
              }}
            />
          </View>
        </View>
      );
    });
  };

  return (
    <View>
      <View>
        <Text style={styles.question}>
          <Text style={{fontFamily: themes.fonts.fontBold}}>{'2 '}</Text>
          {translate('dcrSecondTab.slideTitle')}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {translate('dcrSecondTab.detail')}
          </Text>
          {'& '}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {translate('dcrSecondTab.discuss')}
          </Text>
          {translate('dcrSecondTab.toDoctor')}
        </Text>
      </View>
      <View>
        <View>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={styles.priorityProduct}
            title={translate('dcrSecondTab.priorityProduct')}
          />
        </View>
        <View style={styles.virtualList}>
          {scrollOffset > 0 && (
            <View style={[styles.arrowContainer, styles.leftArrow]}>
              <TouchableOpacity onPress={() => handleOtherAreaLeftArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-left')}
                </View>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            horizontal={true}
            ref={eDetailedRef}
            onScroll={({nativeEvent}) => {
              hideScrollArrow(nativeEvent);
            }}
            showsHorizontalScrollIndicator={false}>
            {renderEdetailedProduct()}
          </ScrollView>
          {!hideEdtailRightArrow && (
            <View style={[styles.arrowContainer, styles.rightArrow]}>
              <TouchableOpacity onPress={() => handleAreaRightArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-right')}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View style={styles.discussedMain}>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={styles.discussProduct}
            title={translate('dcrSecondTab.discussedProduct')}
          />
        </View>
        <View style={styles.virtualList}>
          {scrollDiscussedOffset > 0 && discussedList.length > 5 && (
            <View style={[styles.arrowContainer, styles.leftArrow]}>
              <TouchableOpacity onPress={() => handleDiscussedAreaLeftArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-left')}
                </View>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            horizontal={true}
            ref={discussproduct}
            onScroll={({nativeEvent}) => {
              hideDiscussedScrollArrow(nativeEvent);
            }}
            showsHorizontalScrollIndicator={false}>
            {renderDiscussedList()}
          </ScrollView>
          {!hideDiscussedRightArrow && discussedList.length > 5 && (
            <View style={[styles.arrowContainer, styles.rightArrow]}>
              <TouchableOpacity onPress={() => handleDiscussedAreaRightArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-right')}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
        <View>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={styles.discussProduct}
            title={translate('dcrSecondTab.listOfProduct')}
          />
        </View>
        <View style={styles.virtualList}>
          {scrollOtherOffset > 0 && (
            <View style={[styles.arrowContainer, styles.leftArrow]}>
              <TouchableOpacity onPress={() => handleAreaLeftArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-left')}
                </View>
              </TouchableOpacity>
            </View>
          )}
          <ScrollView
            horizontal={true}
            ref={otherProduct}
            onScroll={({nativeEvent}) => {
              hideOtherScrollArrow(nativeEvent);
            }}
            showsHorizontalScrollIndicator={false}>
            {renderOtherProduct()}
          </ScrollView>
          {!hideOtherRightArrow && (
            <View style={[styles.arrowContainer, styles.rightArrow]}>
              <TouchableOpacity onPress={() => handleOtherAreaRightArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-right')}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {showModal && (
        <ProductModal
          closeModal={onCloseHandler}
          doneHandler={doneHandler}
          showModal={showModal}
          motherBrandId={currentProduct.motherBrandId}
          discussedListData={discussedList}
          data={currentProduct?.subList || []}
        />
      )}
    </View>
  );
};

export default EDetailingDCR;
