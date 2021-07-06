import {PresentationSlide} from 'components/widgets';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import styles from './styles';
import {Button, Label, LabelVariant, Modal} from 'components/elements';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/FontAwesome';
import cloneDeep from 'lodash.clonedeep';
import {List} from 'react-native-paper';
import {Slide1, Slide2} from 'assets';
import theme from 'themes';
import {showToast} from 'components/widgets/Toast';
import {Constants} from 'common';
import {translate} from 'locale';

const {width} = Dimensions.get('window');

/**
 * Mock slide content
 *
 * @param {number} index
 * @return {Object} Slide
 */
const getIcon = index => {
  return (index + 1) % 2 === 0 ? Slide2 : Slide1;
};

const getSlideContent = (product, isPriority) => {
  const content = [];
  for (let index = 0; index < 2; index++) {
    const slide = {
      id: Math.floor(Math.random() * 1000),
      html: null,
      icon: getIcon(index),
      isSelected: true,
      prodId:
        product.skuId > 0
          ? `SKU_${product.skuId}`
          : `SUB_${product.subBrandId}`,
      isFeatured: product.isFeatured,
      priority: product.priority,
      isPriority,
      index,
    };
    content.push(slide);
  }
  return content;
};

/**
 * get selected slides
 *
 * @param {Array} selectedPriority
 * @param {Array} selectedOther
 * @return {Array} slides
 */
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

/**
 * Filter selected slides
 *
 * @param {Array} slideList
 * @return {Array} filtered slides
 */
const getSelectedSlides = slideList => {
  const list = [];
  for (const slide of slideList) {
    if (slide.isSelected) {
      list.push(slide);
    }
  }
  return list;
};

/**
 * Presentation Component
 *
 * @param {Object} {route, navigation}
 * @return {JSX} Presentation
 */
const Presentation = ({route, navigation}) => {
  const [selectedPriority, setSelectedPriority] = useState([]);
  const [selectedOther, setSelectedOther] = useState([]);
  const [slides, setSlides] = useState([]);
  const [presentationTime, setPresentationTime] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({priority: [], other: []});
  const [jumpId, setJumpId] = useState(-1);

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
    setSlides(getSelectedProdSlides(selectedPriority, selectedOther));
  }, [selectedPriority, selectedOther]);

  useEffect(() => {
    if (jumpId > -1) {
      const goToIndex = slides.findIndex(sld => sld.id === jumpId);
      if (goToIndex > -1) {
        caraouselRef.current.scrollToIndex({index: goToIndex, animated: true});
        setJumpId(-1);
      }
    }
  }, [slides, jumpId]);

  let caraouselRef = useRef(null);
  let currentSlideLoadTime = new Date();
  const renderSlide = index => {
    const item = slides[index];
    return (
      <View style={[styles.slideWrapper, {width: width - 265}]}>
        <PresentationSlide key={index} image={item.icon} />
      </View>
    );
  };

  /**
   * Handle slide change
   *
   * @param {Object} {index, prevIndex}
   */
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
            variant={LabelVariant.h3}
            title={translate('eDetailing.viewProducts')}
            style={styles.modalTitleText}
          />
        </View>
        <View style={[styles.titleCol, styles.modalTitleDone]}>
          <Button
            testID="eDetail-apply"
            title={translate('eDetailing.apply')}
            mode="contained"
            contentStyle={styles.eDetailingStartContent}
            labelStyle={styles.eDetailingStartText}
            disabled={isInvalid()}
            onPress={() => {
              updateContent(modalContent);
            }}
          />
        </View>
      </View>
    );
  };

  const isInvalid = () => {
    return getSelectedSlideCount(modalContent) === 0;
  };

  const getSelectedSlideCount = mutatedContent => {
    let selectedSlideCount = 0;
    const content = mutatedContent;
    for (const prod of content.priority) {
      const selectedCount = prod.slides.filter(
        slide => slide.isSelected,
      ).length;
      selectedSlideCount += selectedCount;
    }
    for (const prod of content.other) {
      const selectedCount = prod.slides.filter(
        slide => slide.isSelected,
      ).length;
      selectedSlideCount += selectedCount;
    }
    return selectedSlideCount;
  };

  /**
   * Update selected content
   *
   * @param {object} mutatedContent
   */
  const updateContent = mutatedContent => {
    const selectedSlideCount = getSelectedSlideCount(mutatedContent);
    const content = mutatedContent;
    if (selectedSlideCount === 0) {
      showToast({
        type: Constants.TOAST_TYPES.ALERT,
        autoHide: true,
        props: {
          heading: 'Please choose atleast one slide to present!',
        },
      });
      return;
    }
    setSelectedPriority(content.priority);
    setSelectedOther(content.other);
    closeMenu();
  };

  /**
   * select unselect slide on change
   *
   * @param {object} item
   * @param {object} slide
   * @param {number} itemIndex
   * @param {slideIndex} slideIndex
   * @param {boolean} isPriority
   * @return {object} mutated list
   */
  const selectUnselectSlide = (
    item,
    slide,
    itemIndex,
    slideIndex,
    isPriority,
  ) => {
    const isSelected = !slide.isSelected;
    if (item.isFeatured && !isSelected) {
      const selectedItems = item.slides.filter(
        sld => sld.isSelected && sld.id !== slide.id,
      ).length;
      if (selectedItems === 0) {
        return;
      }
    }
    const mutatatedItem = {
      ...item,
    };
    mutatatedItem.slides = [...item.slides];
    mutatatedItem.slides[slideIndex] = {
      ...slide,
      isSelected,
    };
    mutatatedItem.isSelected =
      mutatatedItem.slides.filter(sld => sld.isSelected).length > 0;
    const mutatedContent = {...modalContent};
    if (isPriority) {
      const mutatedList = [...modalContent.priority];
      mutatedList[itemIndex] = mutatatedItem;
      mutatedContent.priority = mutatedList;
    } else {
      const mutatedList = [...modalContent.other];
      mutatedList[itemIndex] = mutatatedItem;
      mutatedContent.other = mutatedList;
    }
    return mutatedContent;
  };

  const selectUnselectItem = (item, itemIndex, isPriority) => {
    let isSelected = !item.isSelected;
    if (!isSelected && item.isFeatured) {
      const selected = item.slides.filter(sld => sld.isSelected).length;
      if (selected === item.slides.length) {
        return;
      } else {
        isSelected = true;
      }
    }
    const mutatatedItem = {
      ...item,
      isSelected,
    };
    mutatatedItem.slides = [];
    for (const slide of item.slides) {
      const mutatedSlide = {
        ...slide,
        isSelected,
      };
      mutatatedItem.slides.push(mutatedSlide);
    }
    const mutatedContent = {...modalContent};
    if (isPriority) {
      const mutatedList = [...modalContent.priority];
      mutatedList[itemIndex] = mutatatedItem;
      mutatedContent.priority = mutatedList;
    } else {
      const mutatedList = [...modalContent.other];
      mutatedList[itemIndex] = mutatatedItem;
      mutatedContent.other = mutatedList;
    }
    return mutatedContent;
  };

  /**
   * Go to slide
   *
   * @param {Object} item
   * @param {Object} slide
   * @param {number} itemIndex
   * @param {number} slideIndex
   * @param {boolean} isPriority
   */
  const goToSlide = (item, slide, itemIndex, slideIndex, isPriority) => {
    if (!slide.isSelected) {
      const mutatedContent = selectUnselectSlide(
        item,
        slide,
        itemIndex,
        slideIndex,
        isPriority,
      );
      updateContent(mutatedContent);
      setJumpId(slide.id);
    } else {
      const goToIndex = slides.findIndex(sld => sld.id === slide.id);
      if (goToIndex > -1) {
        caraouselRef.current.scrollToIndex({index: goToIndex, animated: true});
        closeMenu();
      }
    }
  };

  const renderProductCheck = (index, item, isPriority) => {
    return (
      <TouchableOpacity
        style={[styles.productSlideCheck, styles.itemLeft]}
        onPress={() => {
          const mutatedContent = selectUnselectItem(item, index, isPriority);
          if (!mutatedContent) {
            return;
          }
          setModalContent(mutatedContent);
        }}>
        {item.isSelected ? (
          <Icon
            name="check-circle"
            size={35}
            color={theme.colors.checkCircleBlue}
          />
        ) : null}
        {!item.isSelected ? <View style={[styles.uncheck]} /> : null}
      </TouchableOpacity>
    );
  };

  /**
   * render selected slides
   *
   * @param {number} index
   * @param {object} item
   * @param {boolean} isPriority
   * @return {JSX} Slide list
   */
  const renderSlideSelection = (index, item, isPriority) => {
    return (
      <View>
        {renderProductCheck(index, item, isPriority)}
        <List.Accordion
          id={`Sub_${index}`}
          key={index}
          title={item.name}
          titleStyle={[styles.subSectionTitle]}
          style={[styles.subSection]}>
          <View style={[styles.subSectionContent]}>
            {item.slides.map((slide, idx) => {
              return (
                <View key={slide.id} style={[styles.productSlide]}>
                  <TouchableOpacity
                    style={[styles.productSlideCheck]}
                    onPress={() => {
                      const mutatedContent = selectUnselectSlide(
                        item,
                        slide,
                        index,
                        idx,
                        isPriority,
                      );
                      if (!mutatedContent) {
                        return;
                      }
                      setModalContent(mutatedContent);
                    }}>
                    {slide.isSelected ? (
                      <Icon
                        name="check-circle"
                        size={35}
                        color={theme.colors.checkCircleBlue}
                      />
                    ) : null}
                    {!slide.isSelected ? (
                      <View style={[styles.uncheck]} />
                    ) : null}
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      goToSlide(item, slide, index, idx, isPriority)
                    }>
                    <Image
                      style={[
                        styles.thumbnail,
                        slide.isSelected ? styles.thumbnailSelected : undefined,
                      ]}
                      source={slide.icon}
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </List.Accordion>
      </View>
    );
  };

  /**
   * Get modal content
   *
   * @return {JSX} Modal content
   */
  const getModalContent = () => {
    return (
      <ScrollView style={[styles.modalContent]}>
        {modalContent.priority?.length > 0 ? (
          <List.Accordion
            title={translate('eDetailing.priority')}
            id="1"
            titleStyle={[styles.mainSectionTitle]}
            style={[styles.mainSection]}>
            {modalContent.priority.map((item, index) => {
              return renderSlideSelection(index, item, true);
            })}
          </List.Accordion>
        ) : null}
        {modalContent.other?.length > 0 ? (
          <List.Accordion
            title={translate('eDetailing.otherProducts')}
            titleStyle={[styles.mainSectionTitle]}
            style={[styles.mainSection]}
            id="2">
            {modalContent.other.map((item, index) => {
              return renderSlideSelection(index, item, false);
            })}
          </List.Accordion>
        ) : null}
      </ScrollView>
    );
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
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        presentationStyle="fullScreen"
        customModalPosition={styles.modalPosition}
        customModalCenteredView={styles.centerModal}
      />
    );
  };

  /**
   * Open menu
   *
   */
  const openMenu = () => {
    setModalContent({
      priority: cloneDeep(selectedPriority),
      other: cloneDeep(selectedOther),
    });
    setShowModal(true);
  };

  /**
   * Close menu
   *
   */
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
            title={translate('eDetailing.introduction')}
          />
        </View>
        <View style={[styles.exitAction]}>
          <Button
            testID="eDetail-end-presentation"
            title={translate('eDetailing.exit')}
            mode="contained"
            contentStyle={styles.exitActionContent}
            labelStyle={styles.exitActionText}
            onPress={() => navigation.goBack()}
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
      <TouchableOpacity style={[styles.hamburger]} onPress={openMenu}>
        <Icon name="bars" size={30} color={theme.colors.white} />
      </TouchableOpacity>
      {renderModal()}
    </View>
  );
};

export default Presentation;
