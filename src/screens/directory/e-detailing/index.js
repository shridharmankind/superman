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
import {isWeb} from 'helper';
import theme from 'themes';
import {API_PATH} from 'screens/directory/apiPath';
import {NetworkService} from 'services';
import {showToast, hideToast} from 'components/widgets/Toast';
import {
  fetchDetailingPriorityProductCreator,
  fetchDetailingOtherProductCreator,
  eDetailingSelector,
  ePriorityProductActions,
  eOtherProductActions,
} from './redux';
import {Product} from 'components/widgets';

/**
 * Render header
 *
 * @param {Object} {navigation}
 */
const renderHeader = ({navigation, docData}) => (
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
        onPress={() => startPresentation(docData)}
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

  const otherProductList = useSelector(eDetailingSelector.getOtherProduct());

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

  const renderSwape = (item, index) => {
    return (
      <View style={styles.swapMain} key={item.motherBrandId}>
        <Product
          title={item.name}
          isChecked={(() =>
            selectedPriorityMotherBrands[item.motherBrandId] || false)()}
          tags={[`P${item.priority}`]}
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

  const handleAreaRightArrow = () => {
    swiperRef.current.scrollToOffset({
      offset: scrollOffset + 150,
      animated: true,
    });
    setScrollOffset(scrollOffset + 100);
  };

  const handleOtherAreaRightArrow = () => {
    swiperOtherRef.current.scrollToOffset({
      offset: scrollOtherOffset + 150,
      animated: true,
    });
    setScrollOtherOffset(scrollOtherOffset + 100);
  };

  const handleOtherAreaLeftArrow = () => {
    swiperOtherRef.current.scrollToOffset({
      offset: scrollOtherOffset + 150,
      animated: true,
    });
    setScrollOtherOffset(scrollOtherOffset - 100);
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

  const getChecked = item => {
    if (item.skuId > 0) {
      return selectedSKUs[item.skuId] || false;
    } else {
      return selectedSubBrands[item.subBrandId] || false;
    }
  };

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

  const closeModal = () => {
    setShowModal(false);
    setCurrentProduct(null);
    setIsPriority(null);
  };

  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        {isWeb() ? null : (
          <TouchableOpacity
            testID="eDetail-modal-back"
            onPress={closeModal}
            style={[styles.modalTitleBack]}>
            <ArrowBack width={24} height={24} />
          </TouchableOpacity>
        )}
        <Label
          testID="eDetail-modal-title"
          variant={LabelVariant.h2}
          title="Select Sub-brands"
        />
        <View style={[styles.modalTitleDone]}>
          <Button
            testID="eDetail-done"
            title="Done"
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

  const isInvalid = () => {
    if (isPriority && currentProduct.isFeatured) {
      const SKUs = Object.keys(selectedSKUs);
      const selectedSKU = SKUs.filter(item => selectedSKUs[item]).length;
      const subs = Object.keys(selectedSubBrands);
      const selectedSubs = subs.filter(item => selectedSubBrands[item]).length;
      return selectedSKU + selectedSubs === 0;
    }
    return false;
  };

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

  return (
    <ContentWithSidePanel header={renderHeader({navigation, docData})}>
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
const startPresentation = docData => {
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
      } else {
        console.log('error', result.statusText);
      }
    };
    addDocToDailyPlan();
  }
};

export default EDetailing;
