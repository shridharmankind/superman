import {PresentationSlide} from 'components/widgets';
import React, {useEffect, useRef, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './styles';
import {Button, Label, LabelVariant, Modal} from 'components/elements';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';
import cloneDeep from 'lodash.clonedeep';

const {width} = Dimensions.get('window');

const getSlideContent = (product, isPriority) => {
  const content = [];
  for (let index = 0; index < 2; index++) {
    const slide = {
      id: Math.floor(Math.random() * 1000),
      html: null,
      icon: null,
      isSelected: true,
      prodId:
        product.skuId > 0
          ? `SKU_${product.skuId}`
          : `SUB_${product.subBrandId}`,
      isFeatured: product.isFeatured,
      priority: product.priority,
      isPriority: true,
      index,
    };
    content.push(slide);
  }
  return content;
};

const getSelectedProdSlides = (selectedPriority, selectedOther) => {
  let data = [];
  for (const product of selectedPriority) {
    if (product.isSelected) {
      const filtered = getSelectedSlides(product.slides);
      if (filtered.length > 0) {
        data = [...data, ...filtered];
      }
    }
  }
  for (const product of selectedOther) {
    if (product.isSelected) {
      const filtered = getSelectedSlides(product.slides);
      if (filtered.length > 0) {
        data = [...data, ...filtered];
      }
    }
  }
  return data;
};

const getSelectedSlides = slideList => {
  const list = [];
  for (const slide of slideList) {
    if (slide.isSelected) {
      list.push(slide);
    }
  }
  return list;
};

const Presentation = ({route}) => {
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [selectedOther, setSelectedOther] = useState([]);
  const [slides, setSelectedSlides] = useState([]);
  const [presentationTime, setPresentationTime] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({priority: [], other: []});
  useEffect(() => {
    const data = route.params?.data;
    const {prioritySelection, otherSelection} = data.slideData;
    const priorityList = [];
    for (const product of prioritySelection) {
      const mutated = {...product};
      mutated.isSelected = true;
      mutated.slides = getSlideContent(product, true);
      priorityList.push(mutated);
    }
    const otherList = [];
    for (const product of otherSelection) {
      const mutated = {...product};
      mutated.isSelected = true;
      mutated.slides = getSlideContent(product, false);
      otherList.push(mutated);
    }
    setSelectedPriority(priorityList);
    setSelectedOther(otherList);
  }, [route]);

  useEffect(() => {
    setSelectedSlides(getSelectedProdSlides(selectedPriority, selectedOther));
  }, [selectedPriority, selectedOther]);

  let caraouselRef = useRef(null);
  let currentSlideLoadTime = new Date();
  const renderSlide = index => {
    return (
      <View style={[styles.slideWrapper, {width: width - 265}]}>
        <PresentationSlide key={index} />
      </View>
    );
  };

  const handleSlideChange = ({index, prevIndex}) => {
    const seconds = dayjs(new Date()).diff(
      dayjs(currentSlideLoadTime),
      'seconds',
    );
    const slide = slides[prevIndex];
    const lastRecorded = presentationTime[slide.id] || 0;
    if (seconds > lastRecorded) {
      const mutated = {};
      mutated[slide.id] = seconds;
      setPresentationTime(old => {
        return {...old, ...mutated};
      });
      console.log('Unloading', prevIndex, 'in', seconds);
    }
    currentSlideLoadTime = new Date();
  };

  /**
   * Get modal title
   *
   * @return {JSX} modal title
   */
  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        <View style={[styles.titleCol]}>
          <Label
            testID="eDetail-modal-title"
            variant={LabelVariant.h4}
            title="View Products"
            style={styles.modalTitleText}
          />
        </View>
        <View style={[styles.titleCol, styles.modalTitleDone]}>
          <Button
            testID="eDetail-apply"
            title="Apply"
            mode="contained"
            contentStyle={styles.eDetailingStartContent}
            labelStyle={styles.eDetailingStartText}
            // disabled={isInvalid()}
            onPress={closeMenu}
          />
        </View>
      </View>
    );
  };

  /**
   * Get modal content
   *
   * @return {JSX} Modal content
   */
  const getModalContent = () => {
    return <View style={[]} />;
  };

  /**
   * Render modal
   *
   * @return {JSX} Modal
   */
  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        open={showModal}
        // onClose={closeModal}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        presentationStyle="fullScreen"
        customModalPosition={styles.modalPosition}
        customModalCenteredView={styles.centerModal}
      />
    );
  };

  const openMenu = () => {
    setModalContent({
      priority: cloneDeep(selectedPriority),
      other: cloneDeep(selectedOther),
    });
    setShowModal(true);
  };

  const closeMenu = () => {
    setShowModal(false);
  };

  return (
    <View style={[styles.container]}>
      <View style={[styles.header]}>
        <View style={[styles.headCol]}>
          <Label
            testID="eDetail-title"
            variant={LabelVariant.h2}
            title="Introduction"
          />
        </View>
        <View style={[styles.exitAction]}>
          <Button
            testID="eDetail-end-presentation"
            title="Exit"
            mode="contained"
            contentStyle={styles.exitActionContent}
            labelStyle={styles.exitActionText}
          />
        </View>
      </View>
      <SwiperFlatList
        data={slides}
        renderAll={false}
        showPagination
        paginationStyleItemActive={styles.paginationItemActive}
        paginationStyleItem={styles.paginationItem}
        paginationStyle={styles.pagination}
        style={styles.swiperList}
        renderItem={({index}) => renderSlide(index)}
        ref={caraouselRef}
        onChangeIndex={handleSlideChange}
      />
      <Icon
        style={[styles.hamburger]}
        name="bars"
        size={30}
        color="white"
        onPress={openMenu}
      />
      {renderModal()}
    </View>
  );
};

export default Presentation;
