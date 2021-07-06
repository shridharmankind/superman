import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, LabelVariant, Modal} from 'components/elements';
import styles from './styles';
import {TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Strings, Constants} from 'common';
import {ArrowBack} from 'assets';
import theme from 'themes';
import {API_PATH} from 'screens/directory/apiPath';
import {NetworkService} from 'services';
import {showToast} from 'components/widgets/Toast';
import {
  fetchDetailingPriorityProductCreator,
  fetchDetailingOtherProductCreator,
  eDetailingSelector,
  ePriorityProductActions,
  eOtherProductActions,
} from './redux';
import {Product} from 'components/widgets';
import {translate} from 'locale';
import {ROUTE_PRESENTATION} from '../../../navigations/routes';

/**
 * E detailing component
 *
 * @param {Object} {navigation}
 * @return {JSX} Edetailing component
 */
const EDetailing = ({navigation, route}) => {
  let docData = route?.params?.data || null;
  const LIMIT = 0; // limit of priority to be fetched from server
  const dispatch = useDispatch();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollOtherOffset, setScrollOtherOffset] = useState(0);
  const swiperRef = useRef(null);
  const swiperOtherRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [isPriority, setIsPriority] = useState(null);
  const [selectedSKUs, setSelectedSKUs] = useState({});
  const [selectedSubBrands, setSelectedSubBrands] = useState({});

  useEffect(() => {
    dispatch(
      fetchDetailingPriorityProductCreator({
        staffPositionID: 1,
        partyId: 1,
        skip: 0,
        limit: LIMIT,
      }),
    );
    dispatch(
      fetchDetailingOtherProductCreator({
        staffPositionID: 1,
        partyId: 1,
        skip: 0,
        limit: LIMIT,
      }),
    );
  }, [dispatch]);

  const priorityProductList = useSelector(
    eDetailingSelector.getPriorityProduct(),
  );
  const selectedPriorityMotherBrands = useSelector(
    eDetailingSelector.getPrioritySelectedMotherBrands(),
  );
  const selectedPrioritySubBrands = useSelector(
    eDetailingSelector.getPrioritySelectedSubBrands(),
  );
  const selectedPrioritySKUs = useSelector(
    eDetailingSelector.getPrioritySelectedSKUs(),
  );
  const selectedOtherMotherBrands = useSelector(
    eDetailingSelector.getOtherSelectedMotherBrands(),
  );
  const selectedOtherSubBrands = useSelector(
    eDetailingSelector.getOtherSelectedSubBrands(),
  );
  const selectedOtherSKUs = useSelector(
    eDetailingSelector.getOtherSelectedSKUs(),
  );
  const isFeaturedEditable = useSelector(
    eDetailingSelector.getIsFeaturedEditable(),
  );

  const otherProductList = useSelector(eDetailingSelector.getOtherProduct());

  /**
   * Render header
   *
   * @param {Object} {navigation}
   */
  const renderHeader = () => (
    <View style={[styles.eDetailingHead]}>
      <View style={[styles.eDetailingHeadCol]}>
        <TouchableOpacity
          testID="eDetail-back"
          style={styles.eDetailingHeadBack}
          onPress={() => navigation.goBack()}>
          <ArrowBack width={24} height={24} />
        </TouchableOpacity>
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
          onPress={prepareDataForSlides}
        />
      </View>
    </View>
  );

  /**
   * find selected for prority products
   *
   * @param {Object} prod
   */
  const findPrioritySelected = prod => {
    const prodSKUs = {};
    const prodSubs = {};
    if (prod?.subList) {
      for (const sub of prod?.subList) {
        if (sub.skuId > 0) {
          prodSKUs[sub.skuId] = selectedPrioritySKUs[sub.skuId] || false;
        } else {
          prodSubs[sub.subBrandId] =
            selectedPrioritySubBrands[sub.subBrandId] || false;
        }
      }
    }
    setSelectedSKUs(prodSKUs);
    setSelectedSubBrands(prodSubs);
  };

  /**
   * Find others selected
   *
   * @param {Object} prod
   */
  const findOtherSelected = prod => {
    const prodSKUs = {};
    const prodSubs = {};
    if (prod?.subList) {
      for (const sub of prod?.subList) {
        if (sub.skuId > 0) {
          prodSKUs[sub.skuId] = selectedOtherSKUs[sub.skuId] || false;
        } else {
          prodSubs[sub.subBrandId] =
            selectedOtherSubBrands[sub.subBrandId] || false;
        }
      }
    }
    setSelectedSKUs(prodSKUs);
    setSelectedSubBrands(prodSubs);
  };

  /**
   * Render priority products
   *
   * @param {Object} item
   * @param {number} index
   * @return {JSX} Product
   */
  const renderSwape = (item, index) => {
    return (
      <View style={styles.swapMain} key={item.motherBrandId}>
        <Product
          title={item.name}
          style={item.isFeatured ? styles.featuredProduct : undefined}
          productTitleStyle={
            item.isFeatured ? styles.featuredProductTitle : undefined
          }
          isChecked={(() =>
            selectedPriorityMotherBrands[item.motherBrandId] || false)()}
          tags={item.priority > 0 ? [`P${item.priority}`] : []}
          onProductClick={() => {
            setCurrentProduct(item);
            setShowModal(true);
            setIsPriority(true);
            findPrioritySelected(item);
          }}
        />
      </View>
    );
  };

  /**
   * render other product
   *
   * @param {Object} dataItem
   * @param {number} index
   * @return {JSX} Other product
   */
  const renderOtherSwape = (dataItem, index) => {
    return (
      <View style={styles.swapMain} key={dataItem.motherBrandId}>
        <Product
          style={styles.otherProduct}
          title={dataItem.name}
          isChecked={(() =>
            selectedOtherMotherBrands[dataItem.motherBrandId] || false)()}
          imageStyle={styles.otherProductImage}
          productTitleStyle={styles.otherProductTitle}
          onProductClick={() => {
            setCurrentProduct(dataItem);
            setShowModal(true);
            setIsPriority(false);
            findOtherSelected(dataItem);
          }}
        />
      </View>
    );
  };

  /**
   * Handle arrow click
   *
   */
  const handleAreaRightArrow = () => {
    swiperRef.current.scrollToOffset({
      offset: scrollOffset + 150,
      animated: true,
    });
    setScrollOffset(scrollOffset + 100);
  };

  /**
   * Handle arrow click
   *
   */
  const handleOtherAreaRightArrow = () => {
    swiperOtherRef.current.scrollToOffset({
      offset: scrollOtherOffset + 150,
      animated: true,
    });
    setScrollOtherOffset(scrollOtherOffset + 100);
  };

  /**
   * Handle arrow click
   *
   */
  const handleOtherAreaLeftArrow = () => {
    swiperOtherRef.current.scrollToOffset({
      offset: scrollOtherOffset + 150,
      animated: true,
    });
    setScrollOtherOffset(scrollOtherOffset - 100);
  };

  /**
   * Handle arrow click
   *
   */
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

  /**
   * Get if item is checked
   *
   * @param {Object} item
   * @return {Boolean} isChecked
   */
  const getChecked = item => {
    if (item.skuId > 0) {
      return selectedSKUs[item.skuId] || false;
    } else {
      return selectedSubBrands[item.subBrandId] || false;
    }
  };

  /**
   * Perform selection
   *
   * @param {Object} item
   */
  const performSelection = item => {
    if (item.skuId > 0) {
      setSelectedSKUs(old => {
        const selected = {...old};
        selected[item.skuId] = !selected[item.skuId];
        return selected;
      });
    } else {
      setSelectedSubBrands(old => {
        const selected = {...old};
        selected[item.subBrandId] = !selected[item.subBrandId];
        return selected;
      });
    }
  };

  /**
   * Get modal content
   *
   * @return {JSX} Modal content
   */
  const getModalContent = () => {
    return (
      <View style={[styles.subBrandList]}>
        {currentProduct?.subList?.map((item, index) => (
          <Product
            key={index}
            title={item.name}
            isChecked={(() => getChecked(item))()}
            onProductClick={() => {
              performSelection(item);
            }}
            style={styles.subProduct}
          />
        ))}
      </View>
    );
  };

  /**
   * Close modal
   *
   */
  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
    setIsPriority(null);
  };

  /**
   * Get modal title
   *
   * @return {JSX} modal title
   */
  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        <TouchableOpacity
          testID="eDetail-modal-back"
          onPress={closeModal}
          style={[styles.modalTitleBack]}>
          <ArrowBack width={24} height={24} />
        </TouchableOpacity>
        <Label
          testID="eDetail-modal-title"
          variant={LabelVariant.h2}
          title={translate('eDetailing.modalTitle')}
        />
        <View style={[styles.modalTitleDone]}>
          <Button
            testID="eDetail-done"
            title={translate('eDetailing.done')}
            mode="contained"
            contentStyle={styles.eDetailingStartContent}
            labelStyle={styles.eDetailingStartText}
            disabled={isInvalid()}
            onPress={makeSelection}
          />
        </View>
      </View>
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
        onClose={closeModal}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        presentationStyle="fullScreen"
        customModalPosition={styles.modalPosition}
        customModalCenteredView={styles.centerModal}
      />
    );
  };

  /**
   * Check if sub brand and SKU selection is valid
   *
   * @return {*}
   */
  const isInvalid = () => {
    if (isPriority && currentProduct.isFeatured && !isFeaturedEditable) {
      const SKUs = Object.keys(selectedSKUs);
      const selectedSKU = SKUs.filter(item => selectedSKUs[item]).length;
      const subs = Object.keys(selectedSubBrands);
      const selectedSubs = subs.filter(item => selectedSubBrands[item]).length;
      return selectedSKU + selectedSubs === 0;
    }
    return false;
  };

  /**
   * Make selction
   *
   */
  const makeSelection = () => {
    if (isInvalid()) {
      return;
    }
    const SKUs = Object.keys(selectedSKUs);
    const selectedSKU = SKUs.filter(item => selectedSKUs[item]).length;
    const subs = Object.keys(selectedSubBrands);
    const selectedSubs = subs.filter(item => selectedSubBrands[item]).length;
    const selectedMotherBrands = {};
    selectedMotherBrands[currentProduct.motherBrandId] =
      selectedSKU + selectedSubs > 0;
    if (isPriority) {
      dispatch(
        ePriorityProductActions.setSelectedSubbrands({
          selectedMotherBrands,
          selectedSubbrands: selectedSubBrands,
          selectedSKUs,
        }),
      );
    } else {
      dispatch(
        eOtherProductActions.setSelectedSubbrands({
          selectedMotherBrands,
          selectedSubbrands: selectedSubBrands,
          selectedSKUs,
        }),
      );
    }
    closeModal();
  };

  const findSelected = hashMap => {
    return Object.keys(hashMap).filter(key => hashMap[key]);
  };

  const isValidOverall = () => {
    const pSKUs = findSelected(selectedPrioritySKUs).length;
    const pSub = findSelected(selectedPrioritySubBrands).length;
    const otherSKUs = findSelected(selectedOtherSKUs).length;
    const otherSubs = findSelected(selectedOtherSubBrands).length;
    return pSKUs + pSub + otherSKUs + otherSubs > 0;
  };

  const prepareDataForSlides = () => {
    if (!isValidOverall()) {
      showToast({
        type: Constants.TOAST_TYPES.ALERT,
        autoHide: true,
        props: {
          heading: translate('eDetailing.prodValidation'),
        },
      });
      return;
    }
    const prioritySelection = [];
    for (const mother of priorityProductList) {
      if (mother?.subList?.length) {
        for (const item of mother?.subList) {
          if (item.skuId > 0 && selectedPrioritySKUs[item.skuId]) {
            prioritySelection.push({
              ...item,
              ...{isFeatured: mother.isFeatured},
            });
          } else if (
            item.subBrandId > 0 &&
            selectedPrioritySubBrands[item.subBrandId]
          ) {
            prioritySelection.push({
              ...item,
              ...{isFeatured: mother.isFeatured},
            });
          }
        }
      }
    }
    const otherSelection = [];
    for (const mother of otherProductList) {
      if (mother?.subList?.length) {
        for (const item of mother?.subList) {
          if (item.skuId > 0 && selectedOtherSKUs[item.skuId]) {
            otherSelection.push(item);
          } else if (
            item.subBrandId > 0 &&
            selectedOtherSubBrands[item.subBrandId]
          ) {
            otherSelection.push(item);
          }
        }
      }
    }
    startPresentation(docData, navigation, {prioritySelection, otherSelection});
  };

  return (
    <ContentWithSidePanel header={renderHeader()}>
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
          <VirtualizedList
            horizontal
            ref={swiperRef}
            data={priorityProductList}
            showsHorizontalScrollIndicator={true}
            getItemCount={() => priorityProductList?.length}
            getItem={(data, index) => data[index]}
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
      <View style={[styles.eDetailingPriorityProductsList]}>
        <View style={[styles.arrowContainer, styles.leftArrow]}>
          <TouchableOpacity onPress={() => handleOtherAreaLeftArrow()}>
            <View style={[styles.swiperArrow]}>
              {renderArrow('chevron-left')}
            </View>
          </TouchableOpacity>
        </View>
        <VirtualizedList
          horizontal
          ref={swiperOtherRef}
          data={otherProductList}
          showsHorizontalScrollIndicator={true}
          getItemCount={() => otherProductList?.length}
          getItem={(data, index) => data[index]}
          renderItem={({item, index}) => {
            return renderOtherSwape(item, index);
          }}
          initialNumToRender={7}
          contentContainerStyle={[styles.priorityProducts]}
        />
        <View style={[styles.arrowContainer, styles.rightArrow]}>
          <TouchableOpacity onPress={() => handleOtherAreaRightArrow()}>
            <View style={[styles.swiperArrow]}>
              {renderArrow('chevron-right')}
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {renderModal()}
    </ContentWithSidePanel>
  );
};

// Function to be called on Start Presentation
const startPresentation = (docData, navigation, slideData) => {
  if (!!docData && !docData.isScheduledToday) {
    const addDocToDailyPlan = async () => {
      const result = await NetworkService.post(
        API_PATH.ADD_TODAY_PLAN,
        {},
        {staffPositionId: docData.staffPositionId, partyId: docData.doctorID},
      );
      if (result.status === Constants.HTTP_OK) {
        docData.updateCallbk(docData.doctorID);
        showToast({
          type: Constants.TOAST_TYPES.SUCCESS,
          autoHide: true,
          props: {
            heading: Strings.directory.docAddedTodayPlan,
          },
        });
        navigation.navigate(ROUTE_PRESENTATION, {
          data: {
            staffPositionId: docData.staffPositionId,
            doctorID: docData.id,
            slideData,
          },
        });
      } else {
        console.log('error', result.statusText);
      }
    };
    addDocToDailyPlan();
  } else {
    navigation.navigate(ROUTE_PRESENTATION, {
      data: {
        staffPositionId: docData?.staffPositionId,
        doctorID: docData?.id,
        slideData,
      },
    });
  }
};

export default EDetailing;
