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
import {List} from 'react-native-paper';
import {CloseIcon} from 'assets';
import {
  dcrActions,
  dcrSelector,
  searchSamples,
  selectSamples,
} from 'screens/directory/doctorDetails/doctorFeedback/redux';
const SampleOpenTasks = ({index, width}) => {
  const [showModal, setShowModal] = useState(false);
  const [searchKeyword, updateSearch] = useState(null);
  const [selectedDocId, updateSelectedDocId] = useState(null);
  const [errorMsg, showError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(searchSamples({staffPositionId: 1, searchKey: 'a'}));
  }, [dispatch, searchKeyword]);

  const querySamples = useSelector(dcrSelector.getSamples());
  const doctors = useSelector(dcrSelector.getPartyData());
  const selectedSamples = useSelector(dcrSelector.getSelectedSamples());

  const onErrorHandler = () => {
    let sampleImage = require('assets/images/product.png');
    return sampleImage;
  };

  useEffect(() => {
    dispatch(dcrActions.clearSelectedSamples());
  }, [dispatch, doctors, showModal]);

  // To be called on click of Add Selected button from Modal
  const closeModal = () => {
    const isAdded = isAlreadyAdded(selectedDocId, selectedSamples);
    if (!isAdded) {
      setShowModal(false);
      const partyIndex = doctors.findIndex(
        item => item.partyId === selectedDocId,
      );
      let tempSampleArray = [
        ...doctors[partyIndex].sampleOpenTasks,
        ...selectedSamples,
      ];

      let tempDocObj = {...doctors[partyIndex]};
      tempDocObj.sampleOpenTasks = tempSampleArray;
      let newArr = [...doctors]; // copying the old datas array
      newArr[partyIndex] = tempDocObj;
      dispatch(dcrActions.updateDoctorDetails(newArr));
    } else {
      showError('Sample Already exists');
    }
  };

  // To check if sample already exists in the list
  const isAlreadyAdded = (docId, selectedSamps) => {
    const partyIndex = doctors.findIndex(item => item.partyId === docId);
    for (const sample of doctors[partyIndex].sampleOpenTasks) {
      // const keys1 = Object.keys(sample);
      // const keys2 = Object.keys(selectedSample);
      for (const selected of selectedSamps) {
        if (sample.skuId === selected.skuId) {
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
      selectedSamples.findIndex(ele => ele.skuId === sample.skuId) >= 0
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
          title={
            selectedSamples.length > 0
              ? `${Strings.doctorDetail.dcr.sampleReq.addSampleBtn}(${selectedSamples.length})`
              : `${Strings.doctorDetail.dcr.sampleReq.addSampleBtn}`
          }
          mode="outlined"
          contentStyle={styles.addSelectedBtn}
          onPress={closeModal}
        />
        <CloseIcon
          style={styles.closeIcon}
          width={32}
          height={32}
          onPress={() => {
            setShowModal(false), showError(null);
          }}
        />
      </View>
    );
  };

  // To add teh sample from the search Modal
  const selectAndAddSample = sample => {
    const checkIndex = selectedSamples.findIndex(
      ele => ele.skuId === sample.skuId,
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
                    style={styles.searchSampleImageStyle}
                    source={
                      sample.imageUrl ? sample.imageUrl : onErrorHandler()
                    }
                  />
                  {renderCircle(sample)}
                  <Label title={sample.skuName} />
                </TouchableOpacity>
              );
            })}
        </View>
        {errorMsg && (
          <View style={styles.toastContainer}>
            <Label title={errorMsg} />
          </View>
        )}
      </>
    );
  };

  // To open the modal on click of Add More link
  const addSample = partyId => {
    updateSelectedDocId(partyId);
    setShowModal(true);
  };

  const noSampleHandler = docId => {
    const checkIndex = doctors.findIndex(item => item.partyId === docId);
    if (checkIndex >= 0) {
      let tempObj = {...doctors[checkIndex]};
      tempObj.noSampleGiven = !doctors[checkIndex].noSampleGiven;

      let tempArray = [...doctors];
      tempArray[checkIndex] = tempObj;

      dispatch(dcrActions.updateDoctorDetails(tempArray));
    }
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
  const decReq = (docId, sample) => {
    let tempSamp = {...sample};
    tempSamp.actualQty = tempSamp.actualQty - 1;
    const partyIndex = doctors.findIndex(item => item.partyId === docId);
    const sampleIndex = doctors[partyIndex].sampleOpenTasks.findIndex(
      item => item.skuId === sample.skuId,
    );
    let tempSampleArray = [...doctors[partyIndex].sampleOpenTasks];
    tempSampleArray.splice(sampleIndex, 1, tempSamp);

    let tempDocObj = {...doctors[partyIndex]};
    tempDocObj.sampleOpenTasks = tempSampleArray;
    let newArr = [...doctors]; // copying the old datas array
    newArr[partyIndex] = tempDocObj;

    dispatch(dcrActions.updateDoctorDetails(newArr));
  };

  // For incrementing the sample strips
  const IncReq = (docId, sample) => {
    let tempSamp;
    if (sample?.actualQty === undefined) {
      tempSamp = {...sample, actualQty: 0};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      const partyIndex = doctors.findIndex(item => item.partyId === docId);
      const sampleIndex = doctors[partyIndex].sampleOpenTasks.findIndex(
        item => item.skuId === sample.skuId,
      );
      let tempSampleArray = [...doctors[partyIndex].sampleOpenTasks];
      tempSampleArray.splice(sampleIndex, 1, tempSamp);
      let tempDocObj = {...doctors[partyIndex]};
      tempDocObj.sampleOpenTasks = tempSampleArray;
      let newArr = [...doctors]; // copying the old datas array
      newArr[partyIndex] = tempDocObj;

      dispatch(dcrActions.updateDoctorDetails(newArr));
    } else {
      tempSamp = {...sample};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      const partyIndex = doctors.findIndex(item => item.partyId === docId);
      const sampleIndex = doctors[partyIndex].sampleOpenTasks.findIndex(
        item => item.skuId === sample.skuId,
      );
      let tempSampleArray = [...doctors[partyIndex].sampleOpenTasks];
      tempSampleArray.splice(sampleIndex, 1, tempSamp);
      let tempDocObj = {...doctors[partyIndex]};
      tempDocObj.sampleOpenTasks = tempSampleArray;
      let newArr = [...doctors]; // copying the old datas array
      newArr[partyIndex] = tempDocObj;
      dispatch(dcrActions.updateDoctorDetails(newArr));
    }
  };

  // const actualSamplesGiven = () => {

  // }

  // To render the specific data related to specific doctor
  const renderSamples = (docId, sampleOpenTaskArray) => {
    return (
      <View style={styles.sampleListContainer}>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.skuId}
          contentContainerStyle={styles.scrollPad}
          data={sampleOpenTaskArray}
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
                    style={styles.rowSampleStyle}
                    source={item.imageUrl ? item.imageUrl : onErrorHandler()}
                  />
                  <Label
                    title={item.skuName}
                    style={
                      item.completed === false
                        ? styles.highLightRowText
                        : styles.rowText
                    }
                  />
                </View>
                {item.requestQty && (
                  <View>
                    <Label
                      title={`Requested Qty : ${item.requestQty}`}
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
                      title={`Provided Qty :${item?.actualQty || 0} Strips`}
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
                    onPress={() => decReq(docId, item)}
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
                    onPress={() => IncReq(docId, item)}
                    disabled={item?.actualQty >= item?.StockQty ? true : false}
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  // Render footer section
  const renderFooter = partyId => {
    return (
      <TouchableOpacity style={styles.footerSection}>
        <Label
          style={{
            color: themes.colors.primary,
            fontFamily: themes.fonts.fontSemiBold,
          }}
          title={`+ ${Strings.doctorDetail.dcr.addMore}`}
          onPress={() => addSample(partyId)}
        />
      </TouchableOpacity>
    );
  };

  const renderIcon = ind => {
    if (doctors[ind]?.noSampleGiven) {
      if (doctors[ind].noSampleGiven === true) {
        return (
          <Icon name="check-circle" size={16} color={themes.colors.primary} />
        );
      } else {
        return (
          <Icon name="check-thin" size={16} color={themes.colors.primary} />
        );
      }
    } else {
      return (
        <Icon name="circle-thin" size={16} color={themes.colors.primary} />
      );
    }
  };

  return (
    <View style={[{width: width - 300}, styles.slideStyle]}>
      <View style={styles.questionSection}>
        <Text style={styles.question}>
          <Text style={{fontFamily: themes.fonts.fontBold}}>{index + 1}.</Text>
          {` ${Strings.doctorDetail.dcr.sampleReq.question.leftPart} `}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {`${Strings.doctorDetail.dcr.sampleReq.question.midPart} `}
          </Text>
          {`${Strings.doctorDetail.dcr.sampleReq.question.rightPart}`}
        </Text>
      </View>
      {doctors && doctors.length > 0 && (
        <View style={styles.answerSection}>
          <List.AccordionGroup>
            {doctors.map((docObj, ind) => {
              return (
                <View>
                  <View style={styles.noSampleCheck}>
                    <TouchableOpacity
                      style={styles.iconStyling}
                      onPress={() => noSampleHandler(docObj.partyId)}>
                      {renderIcon(ind)}
                    </TouchableOpacity>
                    <Label
                      title={Strings.doctorDetail.dcr.sampleReq.noSamplesGiven}
                    />
                  </View>
                  <List.Accordion
                    title={docObj.partyName}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{width: 500}}
                    // eslint-disable-next-line react-native/no-inline-styles
                    titleStyle={{justifyContent: 'flex-start', fontSize: 18}}
                    id={docObj.partyId}>
                    {renderSamples(docObj.partyId, docObj.sampleOpenTasks)}
                    {renderFooter(docObj.partyId)}
                  </List.Accordion>
                </View>
              );
            })}
          </List.AccordionGroup>
        </View>
      )}

      {renderModal()}
    </View>
  );
};

export default SampleOpenTasks;
