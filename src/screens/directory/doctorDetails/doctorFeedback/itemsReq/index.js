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
import {showToast, hideToast} from 'components/widgets/Toast';
import {List} from 'react-native-paper';
import {CloseIcon} from 'assets';
import {
  dcrActions,
  dcrSelector,
} from 'screens/directory/doctorDetails/doctorFeedback/redux';
const ItemRequest = ({index, width}) => {
  const dispatch = useDispatch();

  const querySamples = useSelector(dcrSelector.getItems());
  const doctors = useSelector(dcrSelector.getPartyData());

  const onErrorHandler = () => {
    let itemImage = require('assets/images/item.jpeg');
    return itemImage;
  };

  const noSampleHandler = docId => {
    const checkIndex = doctors.findIndex(item => item.partyId === docId);
    if (checkIndex >= 0) {
      let tempObj = {...doctors[checkIndex]};
      tempObj.noItemRequested = !doctors[checkIndex].noItemRequested;

      tempObj.itemRequested = [...doctors[checkIndex].itemRequested];
      for (let i = 0; i < tempObj.itemRequested.length; i++) {
        let temp2Obj = {
          ...doctors[checkIndex].itemRequested[i],
        };
        temp2Obj.actualQty = 0;
        tempObj.itemRequested[i] = temp2Obj;
      }

      let tempArray = [...doctors];
      tempArray[checkIndex] = tempObj;
      dispatch(dcrActions.updateDoctorDetails(tempArray));
    }
  };

  // For decrementing the sample strips
  const decReq = (docId, sample) => {
    let tempSamp = {...sample};
    tempSamp.actualQty = tempSamp.actualQty - 1;
    const partyIndex = doctors.findIndex(item => item.partyId === docId);
    const sampleIndex = doctors[partyIndex].itemRequested.findIndex(
      item => item.itemId === item.skuId,
    );
    let tempSampleArray = [...doctors[partyIndex].itemRequested];
    tempSampleArray.splice(sampleIndex, 1, tempSamp);

    let tempDocObj = {...doctors[partyIndex]};
    tempDocObj.itemRequested = tempSampleArray;
    let newArr = [...doctors]; // copying the old datas array
    newArr[partyIndex] = tempDocObj;

    dispatch(dcrActions.updateDoctorDetails(newArr));
  };

  // For incrementing the sample strips
  const IncReq = (docId, sample) => {
    let tempSamp;
    let tempSampleArray = [];
    if (sample?.actualQty === undefined) {
      tempSamp = {...sample, actualQty: 0};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      const partyIndex = doctors.findIndex(item => item.partyId === docId);
      if (doctors[partyIndex].itemRequested === undefined) {
        tempSampleArray.splice(tempSampleArray.length, 0, tempSamp);
      } else {
        const sampleIndex = doctors[partyIndex].itemRequested.findIndex(
          item => item.itemId === sample.itemId,
        );
        if (sampleIndex < 0) {
          tempSampleArray = [...doctors[partyIndex].itemRequested];
          tempSampleArray.splice(tempSampleArray.length, 0, tempSamp);
        } else {
          tempSampleArray = [...doctors[partyIndex].itemRequested];
          tempSampleArray.splice(sampleIndex, 1, tempSamp);
        }
      }

      let tempDocObj = {...doctors[partyIndex]};
      tempDocObj.itemRequested = tempSampleArray;
      let newArr = [...doctors]; // copying the old datas array
      newArr[partyIndex] = tempDocObj;

      dispatch(dcrActions.updateDoctorDetails(newArr));
    } else {
      tempSamp = {...sample};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      const partyIndex = doctors.findIndex(item => item.partyId === docId);
      const sampleIndex = doctors[partyIndex].itemRequested.findIndex(
        item => item.itemId === sample.itemId,
      );
      let tempSampleArray = [...doctors[partyIndex].itemRequested];
      tempSampleArray.splice(sampleIndex, 1, tempSamp);
      let tempDocObj = {...doctors[partyIndex]};
      tempDocObj.itemRequested = tempSampleArray;
      let newArr = [...doctors]; // copying the old datas array
      newArr[partyIndex] = tempDocObj;
      dispatch(dcrActions.updateDoctorDetails(newArr));
    }
  };

  const filterItems = (docId, ItemsList, noItemRequested) => {
    let filteredList = [...ItemsList];
    const partyIndex = doctors.findIndex(ele => ele.partyId === docId);
    const alreadySelectedItems = doctors[partyIndex].itemRequested;
    if (!!alreadySelectedItems && alreadySelectedItems.length > 0) {
      for (let i = 0; i < alreadySelectedItems.length; i++) {
        for (let j = 0; j < ItemsList.length; j++) {
          if (ItemsList[j].itemId === alreadySelectedItems[i].itemId) {
            const repeatedIndex = filteredList.findIndex(
              ele => ItemsList[j].itemId === ele.itemId,
            );
            filteredList.splice(repeatedIndex, 1);
          }
        }
      }
    }

    return (
      <View style={styles.sampleListContainer}>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.itemId}
          contentContainerStyle={styles.scrollPad}
          data={filteredList}
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
                    title={item.itemName}
                    style={
                      item.completed === false
                        ? styles.highLightRowText
                        : styles.rowText
                    }
                  />
                </View>
                {item?.requestQty && (
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
                      title={`Provided Qty :${item?.actualQty || 0}`}
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
                    disabled={
                      item?.actualQty >= item?.StockQty || noItemRequested
                        ? true
                        : false
                    }
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  // To render the specific data related to specific doctor
  const renderItems = (docId, itemOpenTaskArray, noItemRequested) => {
    return (
      <View style={styles.sampleListContainer}>
        <FlatList
          nestedScrollEnabled
          keyExtractor={item => item.itemId}
          contentContainerStyle={styles.scrollPad}
          data={itemOpenTaskArray}
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
                    title={item.itemName}
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
                      title={`Provided Qty :${item?.actualQty || 0}`}
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
                    disabled={
                      item?.actualQty >= item?.StockQty || noItemRequested
                        ? true
                        : false
                    }
                  />
                </View>
              </View>
            );
          }}
        />
      </View>
    );
  };

  const renderIcon = ind => {
    if (doctors[ind]?.noItemRequested) {
      if (doctors[ind].noItemRequested === true) {
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
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {` ${Strings.doctorDetail.dcr.item.question.midPart} `}
          </Text>
          {`${Strings.doctorDetail.dcr.item.question.rightPart}`}
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
                    <Label title={Strings.doctorDetail.dcr.item.noItemReq} />
                  </View>
                  <List.Accordion
                    title={`Dr. ${docObj.partyName}`}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{width: 500}}
                    // eslint-disable-next-line react-native/no-inline-styles
                    titleStyle={{justifyContent: 'flex-start', fontSize: 18}}
                    id={docObj.partyId}>
                    {docObj.itemRequested &&
                      renderItems(
                        docObj.partyId,
                        docObj.itemRequested,
                        docObj.noItemRequested,
                      )}
                    {querySamples.length > 0 &&
                      filterItems(
                        docObj.partyId,
                        querySamples,
                        docObj.noItemRequested,
                      )}
                  </List.Accordion>
                </View>
              );
            })}
          </List.AccordionGroup>
        </View>
      )}
    </View>
  );
};

export default ItemRequest;
