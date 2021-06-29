import React, {useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  VirtualizedList,
  TouchableOpacity,
} from 'react-native';
import styles from './style';
import {Strings} from 'common';
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
  const getItemCount = data => data.length;
  const getItem = (data, index) => data[index];
  const [otherProductList, setOtherProductList] = useState(
    JSON.parse(JSON.stringify(EDetailedList)),
  );
  const [discussedList, setDiscussedList] = useState([]);
  const [eDetailedIndex, setEDetailedIndex] = useState(0);
  const [otherProductIndex, setOtherProductIndex] = useState(0);
  const [discussedIndex, setDiscussedIndex] = useState(0);
  const eDetailedRef = useRef(null);
  const otherProduct = useRef(null);
  const discussproduct = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const renderArrow = icon => (
    <Icon name={icon} size={10} color={themes.colors.blue} />
  );
  const handleOtherAreaLeftArrow = () => {
    const eDetailedValue = eDetailedIndex - 2 < 0 ? 0 : eDetailedIndex - 2;
    if (eDetailedIndex) {
      eDetailedRef.current.scrollToIndex({
        index: eDetailedValue,
      });
      setEDetailedIndex(eDetailedValue);
    }
  };

  const handleDiscussedAreaLeftArrow = () => {
    const eDetailedValue = discussedIndex - 2 < 0 ? 0 : discussedIndex - 2;
    if (discussedIndex) {
      discussproduct.current.scrollToIndex({
        index: eDetailedValue,
      });
      setDiscussedIndex(eDetailedValue);
    }
  };
  const handleDiscussedAreaRightArrow = () => {
    const otherProductValue =
      discussedList.length - 1 <= discussedIndex
        ? discussedList.length - 1
        : discussedIndex + 2;
    if (discussedList.length - 1 > otherProductValue) {
      discussproduct.current.scrollToIndex({
        index: otherProductValue,
      });
      setDiscussedIndex(otherProductValue);
    }
  };
  const handleAreaLeftArrow = () => {
    const otherProductValue =
      otherProductIndex - 2 < 0 ? 0 : otherProductIndex - 2;
    if (otherProductIndex) {
      otherProduct.current.scrollToIndex({
        index: otherProductValue,
      });
      setOtherProductIndex(otherProductValue);
    }
  };
  const handleOtherAreaRightArrow = () => {
    const otherProductValue =
      EDetailedList.length - 1 <= otherProductIndex
        ? EDetailedList.length - 1
        : otherProductIndex + 2;
    if (EDetailedList.length - 1 > otherProductValue) {
      otherProduct.current.scrollToIndex({
        index: otherProductValue,
      });
      setOtherProductIndex(otherProductValue);
    }
  };
  const handleAreaRightArrow = () => {
    const eDetailedValue =
      EDetailedList.length - 1 <= eDetailedIndex
        ? EDetailedList.length - 1
        : eDetailedIndex + 2;
    if (EDetailedList.length - 1 > eDetailedValue) {
      eDetailedRef.current.scrollToIndex({
        index: eDetailedValue,
      });
      setEDetailedIndex(eDetailedValue);
    }
  };
  const renderDiscussedList = (item, index) => {
    return (
      <View key={item.motherBrandId}>
        <Label
          variant={LabelVariant.subtitleLarge}
          style={styles.discussList}
          title={item.name}
        />
      </View>
    );
  };
  const renderEDetailed = (item, index) => {
    return (
      <View>
        <Label
          variant={LabelVariant.subtitleLarge}
          style={
            item.isFeatured ? styles.eDetailed : styles.eDetailedNonFeature
          }
          title={item.name}
        />
      </View>
    );
  };
  const renderEdetailedProduct = (item, index) => {
    return (
      <View style={styles.swapMain} key={item.motherBrandId}>
        {renderEDetailed(item)}
      </View>
    );
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

  const renderOtherProduct = (item, index) => {
    return (
      <View style={styles.swapMain} key={item.motherBrandId}>
        <View>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={styles.eDetailedNonFeature}
            title={item.name}
            onPress={() => {
              setCurrentProduct({...item});
              setShowModal(true);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <View>
      <View style={styles.questionSection}>
        <Text style={styles.question}>
          <Text style={{fontFamily: themes.fonts.fontBold}}>{'2 '}</Text>
          {`${Strings.captureDCRSlideTwo.slideTitle} `}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {`${Strings.captureDCRSlideTwo.detail} `}
          </Text>
          {'& '}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {`${Strings.captureDCRSlideTwo.discuss} `}
          </Text>
          {`${Strings.captureDCRSlideTwo.toDoctor} `}
        </Text>
      </View>
      <View>
        <View style={styles.questionSection}>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={styles.priorityProduct}
            title={translate('dcrSecondTab.priorityProduct')}
          />
        </View>
        <SafeAreaView style={styles.virtualList}>
          <View style={[styles.arrowContainer, styles.leftArrow]}>
            <TouchableOpacity onPress={() => handleOtherAreaLeftArrow()}>
              <View style={[styles.swiperArrow]}>
                {renderArrow('chevron-left')}
              </View>
            </TouchableOpacity>
          </View>
          <VirtualizedList
            data={EDetailedList}
            initialNumToRender={6}
            renderItem={({item}) => renderEdetailedProduct(item)}
            getItemCount={getItemCount}
            getItem={getItem}
            horizontal={true}
            ref={eDetailedRef}
          />
          <View style={[styles.arrowContainer, styles.rightArrow]}>
            <TouchableOpacity onPress={() => handleAreaRightArrow()}>
              <View style={[styles.swiperArrow]}>
                {renderArrow('chevron-right')}
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={styles.discussedMain}>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={styles.discussProduct}
            title={translate('dcrSecondTab.discussedProduct')}
          />
        </View>
        <SafeAreaView style={styles.virtualList}>
          {!!(discussedList.length > 6) && (
            <View style={[styles.arrowContainer, styles.leftArrow]}>
              <TouchableOpacity onPress={() => handleDiscussedAreaLeftArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-left')}
                </View>
              </TouchableOpacity>
            </View>
          )}
          <VirtualizedList
            data={discussedList}
            initialNumToRender={6}
            renderItem={({item}) => renderDiscussedList(item)}
            getItemCount={getItemCount}
            getItem={getItem}
            horizontal={true}
            ref={discussproduct}
          />
          {!!(discussedList.length > 6) && (
            <View style={[styles.arrowContainer, styles.rightArrow]}>
              <TouchableOpacity onPress={() => handleDiscussedAreaRightArrow()}>
                <View style={[styles.swiperArrow]}>
                  {renderArrow('chevron-right')}
                </View>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
        <View>
          <Label
            variant={LabelVariant.subtitleLarge}
            style={styles.discussProduct}
            title={translate('dcrSecondTab.listOfProduct')}
          />
        </View>
        <SafeAreaView style={styles.virtualList}>
          <View style={[styles.arrowContainer, styles.leftArrow]}>
            <TouchableOpacity onPress={() => handleAreaLeftArrow()}>
              <View style={[styles.swiperArrow]}>
                {renderArrow('chevron-left')}
              </View>
            </TouchableOpacity>
          </View>
          <VirtualizedList
            data={otherProductList}
            initialNumToRender={6}
            renderItem={({item}) => renderOtherProduct(item)}
            getItemCount={getItemCount}
            getItem={getItem}
            horizontal={true}
            ref={otherProduct}
          />
          <View style={[styles.arrowContainer, styles.rightArrow]}>
            <TouchableOpacity onPress={() => handleOtherAreaRightArrow()}>
              <View style={[styles.swiperArrow]}>
                {renderArrow('chevron-right')}
              </View>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
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
