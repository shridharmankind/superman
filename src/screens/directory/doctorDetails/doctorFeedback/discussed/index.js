import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import styles from './style';
import themes from 'themes';
import {Label, LabelVariant} from 'components/elements';
import {translate} from 'locale';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProductModal from '../ProductModal';
import {
  dcrSelector,
  dcrActions,
} from 'screens/directory/doctorDetails/doctorFeedback/redux';
import {useSelector, useDispatch} from 'react-redux';
/**
 * Custom modal component render for eDtailing DCR.
 */

const EDetailingDCR = ({}) => {
  const dispatch = useDispatch();
  const [otherProductList, setOtherProductList] = useState([]);
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

  const eDetailedList = useSelector(dcrSelector.getEdtailedList());
  const otherProductDataList = useSelector(dcrSelector.getOtherProductList());
  const discussedproductList = useSelector(
    dcrSelector.getDiscussedProductList(),
  );

  useEffect(() => {
    if (otherProductDataList?.length) {
      setOtherProductList(otherProductDataList);
    }
  }, [otherProductDataList]);

  useEffect(() => {
    if (discussedproductList?.length) {
      setDiscussedList(discussedproductList);
    }
  }, [discussedproductList]);
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
          style={[styles.discussList, styles.eDetailed]}
          title={item.name}
        />
      </View>
    );
  };
  const renderEdetailedProduct = () => {
    return eDetailedList.map(value => {
      return <View key={value.motherBrandId}>{renderEDetailed(value)}</View>;
    });
  };

  const onCloseHandler = () => {
    setShowModal(false);
  };

  const doneHandler = (discussList, motherId, currentList) => {
    const otherProdctData = [...otherProductList];
    for (let product of otherProdctData) {
      if (product.motherBrandId === motherId) {
        const subArray = product?.subList;
        for (let index = 0; index < subArray.length - 1; index++) {
          let findIndex = currentList.findIndex(
            item => subArray[index].name === item.name,
          );
          if (findIndex !== -1) {
            const subObject = {
              ...subArray[index],
              isChecked: currentList[findIndex].isChecked,
            };
            subArray[index] = {
              ...subObject,
            };
          }
        }
      }
    }
    dispatch(
      dcrActions.setDiscussedProduct({
        discussList: discussList,
      }),
    );
    setOtherProductList([...otherProdctData]);
    //  setDiscussedList([...discussList]);
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
          {scrollOffset > 0 && eDetailedList.length > 5 && (
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
          {!hideEdtailRightArrow && eDetailedList.length > 5 && (
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
          {scrollOtherOffset > 0 && otherProduct.length > 5 && (
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
          {!hideOtherRightArrow && otherProduct.length > 5 && (
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
