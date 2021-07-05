import {PresentationSlide} from 'components/widgets';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
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

const {width} = Dimensions.get('window');

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
            onPress={() => {
              updateContent(modalContent);
            }}
          />
        </View>
      </View>
    );
  };

  const updateContent = mutatedContent => {
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

  const renderSlideSelection = (index, item, isPriority) => {
    return (
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
                  {!slide.isSelected ? <View style={[styles.uncheck]} /> : null}
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
            title="Priority"
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
            title="Other Products"
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
