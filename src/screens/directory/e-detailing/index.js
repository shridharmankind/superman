import React, {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Label} from 'components/elements';
import {ContentWithSidePanel} from 'components/layouts';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Button, LabelVariant, Modal} from 'components/elements';
import styles from './styles';
import {TouchableOpacity, View, FlatList} from 'react-native';
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
  const LIMIT = 10; // limit of priority to be fetched from server
  const dispatch = useDispatch();
  const [scrollOffset, setScrollOffset] = useState(0);
  const [scrollOtherOffset, setScrollOtherOffset] = useState(0);
  const [skip, setSkip] = useState(0);
  const [otherSkip, setOtherSkip] = useState(0);
  const swiperRef = useRef(null);
  const swiperOtherRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

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
    setSkip(prev => prev + LIMIT);
    setOtherSkip(prev => prev + LIMIT);
  }, [dispatch]);

  const priorityProductList = useSelector(
    eDetailingSelector.getPriorityProduct(),
  );

  const otherProductList = useSelector(eDetailingSelector.getOtherProduct());
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

  const hideOtherScrollArrow = () => {
    dispatch(
      fetchDetailingOtherProductCreator({
        staffPositionID: 1,
        partyId: 1,
        skip: otherSkip,
        limit: LIMIT,
      }),
    );
    //Once API Done I will Uncomment this
    // setSkip(prev => prev + LIMIT);
  };

  const renderSwape = (item, index) => {
    return (
      <View style={styles.swapMain} key={item.motherBrandId}>
        <Product
          title={item.name}
          isChecked={!!item.isFeatured}
          tags={[`P${item.priority}`]}
          onProductClick={() => {
            setCurrentProduct(item);
            setShowModal(true);
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
          isChecked={false}
          imageStyle={styles.otherProductImage}
          productTitleStyle={styles.otherProductTitle}
          onProductClick={() => {
            setCurrentProduct(dataItem);
            setShowModal(true);
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

  const getModalContent = () => {
    return (
      <View style={[styles.subBrandList]}>
        {currentProduct?.subBrandList.map(item => (
          <Product
            title={item.name}
            isChecked={!!item.isFeatured}
            style={styles.subProduct}
          />
        ))}
      </View>
    );
  };

  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        {isWeb() ? null : (
          <TouchableOpacity
            testID="eDetail-modal-back"
            onPress={() => {
              setShowModal(false);
              setCurrentProduct(null);
            }}
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
        onClose={() => {
          setShowModal(false);
          setCurrentProduct(null);
        }}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        presentationStyle="fullScreen"
        customModalPosition={styles.modalPosition}
        customModalCenteredView={styles.centerModal}
      />
    );
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
      <View style={[styles.eDetailingPriorityProductsList]}>
        <View style={[styles.arrowContainer, styles.leftArrow]}>
          <TouchableOpacity onPress={() => handleOtherAreaLeftArrow()}>
            <View style={[styles.swiperArrow]}>
              {renderArrow('chevron-left')}
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          ref={swiperOtherRef}
          data={otherProductList}
          showsHorizontalScrollIndicator={true}
          onEndReached={hideOtherScrollArrow}
          onEndReachedThreshold={0.5}
          renderItem={({item, index}) => {
            return renderOtherSwape(item, index);
          }}
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
