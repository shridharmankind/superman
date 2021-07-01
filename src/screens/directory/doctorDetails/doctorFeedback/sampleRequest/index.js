import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {Strings, Constants} from 'common';
import themes from 'themes';
import styles from './styles';
import {Label, Button, Modal, LabelVariant} from 'components/elements';
import {TextInput} from 'react-native-paper';
import {SearchIcon} from 'assets';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  searchSampleSelector,
  searchSamples,
  selectSamples,
  searchSamplesActions,
} from 'screens/directory/doctorDetails/doctorFeedback/sampleRequest/redux';
import {showToast, hideToast} from 'components/widgets/Toast';
const SampleRequest = ({index, width}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchKeyword, updateSearch] = useState(null);
  const [samples, updateSample] = useState([
    {
      SKUId: 1,
      SKUName: 'Amlokind',
      StockQty: 10,
      RequestQty: 13,
      completed: false,
    },
    {
      SKUId: 2,
      SKUName: 'Amlokind',
      StockQty: 200,
      RequestQty: 13,
      completed: false,
    },
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchSamples({staffPositionId: 1, searchKey: 'a'}));
  }, [dispatch, searchKeyword]);

  const querySamples = useSelector(searchSampleSelector.getSamples());
  const selectedSamples = useSelector(
    searchSampleSelector.getSelectedSamples(),
  );
  console.log(selectedSamples);

  const onErrorHandler = () => {
    let sampleImage = require('assets/images/product.png');
    return sampleImage;
  };

  useEffect(() => {
    dispatch(searchSamplesActions.clearSelectedSamples());
  }, [dispatch, samples]);

  // To be called on click of Add Selected button from Modal
  const closeModal = () => {
    const isAdded = isAlreadyAdded(selectedSamples);
    if (!isAdded) {
      setShowModal(false);
      updateSample([...samples, ...selectedSamples]);
    } else {
      // showToast({
      //   type: Constants.TOAST_TYPES.SUCCESS,
      //   autoHide: true,
      //   props: {
      //     heading: Strings.doctorDetail.dcr.sampleReq.error,
      //     onClose: () => hideToast(),
      //   },
      // });
    }
  };

  // To check if sample already exists in the list
  const isAlreadyAdded = selectedSamps => {
    for (const sample of samples) {
      // const keys1 = Object.keys(sample);
      // const keys2 = Object.keys(selectedSample);
      for (const selected of selectedSamps) {
        if (sample.SKUId === selected.SKUId) {
          return true;
        }
      }
    }
    return false;
  };

  // To render the selected item's circle
  const renderCircle = sample => {
    if (
      !!selectedSamples &&
      selectedSamples.length > 0 &&
      selectedSamples.findIndex(ele => ele.SKUId === sample.SKUId) >= 0
    ) {
      return (
        <View style={styles.checkStyling}>
          <Icon
            name="check-circle"
            size={16}
            color={themes.colors.checkCircleBlue}
          />
        </View>
      );
    }
  };

  // To render the modal title
  const getModalTitle = () => {
    return (
      <View style={styles.modalTitle}>
        <Label
          variant={LabelVariant.h2}
          title={Strings.doctorDetail.dcr.sampleReq.addSample}
        />
        <Button
          title={`${Strings.doctorDetail.dcr.sampleReq.addSampleBtn}(${selectedSamples.length})`}
          mode="outlined"
          contentStyle={styles.addSelectedBtn}
          onPress={closeModal}
        />
      </View>
    );
  };

  // To add teh sample from the search Modal
  const selectAndAddSample = sample => {
    const checkIndex = selectedSamples.findIndex(
      ele => ele.SKUId === sample.SKUId,
    );
    if (checkIndex >= 0) {
      let tempArr = [...selectedSamples];
      tempArr.splice(checkIndex, 1);
      dispatch(selectSamples(tempArr));
    } else {
      dispatch(selectSamples([...selectedSamples, sample]));
    }
  };

  // To render the modal content
  const getModalContent = () => {
    return (
      <>
        <View>
          <TextInput
            placeholder={Strings.doctorDetail.dcr.sampleReq.searchPlaceholder}
            style={styles.searchBar}
            value={searchKeyword}
            onChangeText={text => updateSearch(text)}
          />
          <SearchIcon style={styles.searchIcon} height={18} width={18} />
        </View>
        <View style={styles.resultSection}>
          {querySamples &&
            querySamples.map(sample => {
              return (
                <TouchableOpacity
                  style={styles.searchSampleStyling}
                  onPress={() => selectAndAddSample(sample)}>
                  <Image
                    style={styles.sampleImageStyle}
                    source={
                      sample.imageUrl ? sample.imageUrl : onErrorHandler()
                    }
                  />
                  {renderCircle(sample)}
                  <Label title={sample.SKUName} />
                </TouchableOpacity>
              );
            })}
        </View>
      </>
    );
  };

  // To open the modal on click of Add More link
  const addSample = () => {
    setShowModal(true);
  };

  // To render the Modal
  const renderModal = () => {
    return (
      <Modal
        animationType="fade"
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        presentationStyle="fullScreen"
        customModalPosition={styles.modalPosition}
        customModalCenteredView={styles.centerModal}
      />
    );
  };

  // For decrementing the sample strips
  const decReq = sample => {
    sample.actualQty = sample.actualQty - 1;
    const sampleIndex = samples.findIndex(item => item.SKUId === sample.SKUId);
    let tempArry = [...samples];
    tempArry.splice(sampleIndex, 1, sample);
    updateSample([...tempArry]);
  };

  // For incrementing the sample strips
  const IncReq = sample => {
    let tempSamp;
    if (sample?.actualQty === undefined) {
      tempSamp = {...sample, actualQty: 0};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      const sampleIndex = samples.findIndex(
        item => item.SKUId === sample.SKUId,
      );
      let tempArry = [...samples];
      tempArry.splice(sampleIndex, 1, tempSamp);
      updateSample([...tempArry]);
    } else {
      const sampleIndex = samples.findIndex(
        item => item.SKUId === sample.SKUId,
      );
      tempSamp = {...sample};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      let tempArry = [...samples];
      tempArry.splice(sampleIndex, 1, tempSamp);
      updateSample([...tempArry]);
    }
  };

  // const actualSamplesGiven = () => {

  // }

  return (
    <View style={[{width: width - 300}, styles.slideStyle]}>
      <View style={styles.questionSection}>
        <Text style={styles.question}>
          <Text style={{fontFamily: themes.fonts.fontBold}}>{index + 1}.</Text>
          {`${Strings.doctorDetail.dcr.sampleReq.question.leftPart} `}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {`${Strings.doctorDetail.dcr.sampleReq.question.midPart} `}
          </Text>
          {`${Strings.doctorDetail.dcr.sampleReq.question.rightPart}`}
        </Text>
      </View>
      <View style={styles.answerSection}>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.SKUId}
          contentContainerStyle={styles.scrollPad}
          data={samples}
          renderItem={({item}) => {
            return (
              <View
                style={
                  item.completed === false
                    ? [styles.sampleStyling, styles.highlightRow]
                    : styles.sampleStyling
                }>
                <View style={styles.leftAlign}>
                  <Image
                    style={styles.sampleImageStyle}
                    source={item.imageUrl ? item.imageUrl : onErrorHandler()}
                  />
                  <Label
                    title={item.SKUName}
                    style={
                      item.completed === false
                        ? styles.highLightRowText
                        : styles.rowText
                    }
                  />
                </View>
                {item.RequestQty && (
                  <View>
                    <Label
                      title={`Reuest Qty : ${item.RequestQty}`}
                      style={
                        item.completed === false
                          ? styles.highLightRowText
                          : styles.rowText
                      }
                    />
                  </View>
                )}

                <View style={styles.rightAlign}>
                  <View style={styles.stockData}>
                    <Label
                      title={`${item?.actualQty || 0} Strips`}
                      style={
                        item.completed === false
                          ? styles.highLightRowText
                          : styles.rowText
                      }
                    />
                    <Label
                      title={`${item?.StockQty || 0} IN STOCK`}
                      style={
                        item.completed === false
                          ? styles.highLightRowText
                          : styles.rowText
                      }
                    />
                  </View>
                  <Button
                    title="-"
                    mode="contained"
                    contentStyle={
                      item.completed === false
                        ? styles.highLightBtnStyle
                        : styles.btnStyle
                    }
                    onPress={() => decReq(item)}
                    disabled={item?.actualQty ? false : true}
                  />
                  <Button
                    title="+"
                    mode="outlined"
                    contentStyle={
                      item.completed === false
                        ? styles.highLightBtnStyle
                        : styles.btnStyle
                    }
                    onPress={() => IncReq(item)}
                    disabled={item?.actualQty >= item?.StockQty ? true : false}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
      <TouchableOpacity style={styles.footerSection}>
        <Label
          style={{
            color: themes.colors.primary,
            fontFamily: themes.fonts.fontSemiBold,
          }}
          title={`+ ${Strings.doctorDetail.dcr.addMore}`}
          onPress={addSample}
        />
      </TouchableOpacity>
      {renderModal()}
    </View>
  );
};

export default SampleRequest;
