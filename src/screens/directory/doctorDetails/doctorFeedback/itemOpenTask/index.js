import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import {Strings} from 'common';
import themes from 'themes';
import styles from './styles';
import {Label, Button} from 'components/elements';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {List} from 'react-native-paper';
import {
  dcrActions,
  dcrSelector,
} from 'screens/directory/doctorDetails/doctorFeedback/redux';
const ItemOpenTask = ({index, width, doctorData}) => {
  const dispatch = useDispatch();

  const querySamples = useSelector(dcrSelector.getItems());
  const doctors = useSelector(dcrSelector.getPartyData());

  const onErrorHandler = () => {
    let itemImage = require('assets/images/item.jpeg');
    return itemImage;
  };

  // useEffect(() => {
  //     let newArr = [...doctors];
  //     for (let i = 0; i < doctors.length; i++) {
  //       let tempSampleArray = [...doctors[i].itemOpenTasks, ...querySamples];
  //       let tempDocObj = {...doctors[i]};
  //       tempDocObj.itemOpenTasks = tempSampleArray;
  //       newArr[i] = tempDocObj;
  //     }
  //     dispatch(dcrActions.updateDoctorDetails(newArr));
  // }, [dispatch, querySamples]);

  const noSampleHandler = docId => {
    const checkIndex = doctors.findIndex(item => item.partyId === docId);
    if (checkIndex >= 0) {
      let tempObj = {...doctors[checkIndex]};
      tempObj.noItemGiven = !doctors[checkIndex].noItemGiven;
      tempObj.itemOpenTasks = [...doctors[checkIndex].itemOpenTasks];
      for (let i = 0; i < tempObj.itemOpenTasks.length; i++) {
        let temp2Obj = {
          ...doctors[checkIndex].itemOpenTasks[i],
        };
        temp2Obj.actualQty = 0;
        tempObj.itemOpenTasks[i] = temp2Obj;
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
    const sampleIndex = doctors[partyIndex].itemOpenTasks.findIndex(
      item => item.itemId === item.skuId,
    );
    let tempSampleArray = [...doctors[partyIndex].itemOpenTasks];
    tempSampleArray.splice(sampleIndex, 1, tempSamp);

    let tempDocObj = {...doctors[partyIndex]};
    tempDocObj.itemOpenTasks = tempSampleArray;
    let newArr = [...doctors]; // copying the old datas array
    newArr[partyIndex] = tempDocObj;

    dispatch(dcrActions.updateDoctorDetails(newArr));
  };

  // For incrementing the sample strips
  const IncReq = (docId, sample) => {
    let tempSamp;
    let tempSampleArray;
    if (sample?.actualQty === undefined) {
      tempSamp = {...sample, actualQty: 0};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      const partyIndex = doctors.findIndex(item => item.partyId === docId);
      const sampleIndex = doctors[partyIndex].itemOpenTasks.findIndex(
        item => item.itemId === sample.itemId,
      );
      if (sampleIndex < 0) {
        tempSampleArray = [...doctors[partyIndex].itemOpenTasks];
        tempSampleArray.splice(tempSampleArray.length, 0, tempSamp);
      } else {
        tempSampleArray = [...doctors[partyIndex].itemOpenTasks];
        tempSampleArray.splice(sampleIndex, 1, tempSamp);
      }
      let tempDocObj = {...doctors[partyIndex]};
      tempDocObj.itemOpenTasks = tempSampleArray;
      let newArr = [...doctors]; // copying the old datas array
      newArr[partyIndex] = tempDocObj;

      dispatch(dcrActions.updateDoctorDetails(newArr));
    } else {
      tempSamp = {...sample};
      tempSamp.actualQty = tempSamp.actualQty + 1;
      const partyIndex = doctors.findIndex(item => item.partyId === docId);
      const sampleIndex = doctors[partyIndex].itemOpenTasks.findIndex(
        item => item.itemId === sample.itemId,
      );
      let tempSampleArray = [...doctors[partyIndex].itemOpenTasks];
      tempSampleArray.splice(sampleIndex, 1, tempSamp);
      let tempDocObj = {...doctors[partyIndex]};
      tempDocObj.itemOpenTasks = tempSampleArray;
      let newArr = [...doctors]; // copying the old datas array
      newArr[partyIndex] = tempDocObj;
      dispatch(dcrActions.updateDoctorDetails(newArr));
    }
  };

  // const actualSamplesGiven = () => {

  // }

  const filterItems = (docId, ItemsList, noItemGiven) => {
    let filteredList = [...ItemsList];
    const partyIndex = doctors.findIndex(ele => ele.partyId === docId);
    const alreadySelectedItems = doctors[partyIndex].itemOpenTasks;
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
                      title={`${
                        item?.userItemInventory.stockQty || 0
                      } IN STOCK`}
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
                      item?.actualQty >= item?.StockQty || noItemGiven
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
  const renderItems = (docId, itemOpenTaskArray, noItemGiven) => {
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
                  item.taskStatusId === 1
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
                      item.taskStatusId === 1
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
                        item.taskStatusId === 1
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
                        item.taskStatusId === 1
                          ? styles.highLightRowText
                          : styles.rowText
                      }
                    />
                    <Label
                      title={`${item?.StockQty || 0} IN STOCK`}
                      style={
                        item.taskStatusId === 1
                          ? styles.highLightRowText
                          : styles.rowText
                      }
                    />
                  </View>
                  <Button
                    title="-"
                    mode="contained"
                    contentStyle={
                      item.taskStatusId === 1
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
                      item.taskStatusId === 1
                        ? styles.highLightBtnStyle
                        : styles.btnStyle
                    }
                    onPress={() => IncReq(docId, item)}
                    disabled={
                      item?.actualQty >= item?.StockQty || noItemGiven
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
    if (doctors[ind]?.noItemGiven) {
      if (doctors[ind].noItemGiven === true) {
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
          {`${Strings.doctorDetail.dcr.itemRequest.question.leftPart} `}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {`${Strings.doctorDetail.dcr.itemRequest.question.midPart} `}
          </Text>
          {`${Strings.doctorDetail.dcr.itemRequest.question.rightPart}`}
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
                      title={Strings.doctorDetail.dcr.itemRequest.noItemsGiven}
                    />
                  </View>
                  <List.Accordion
                    title={`Dr. ${docObj.partyName}`}
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{width: 500}}
                    // eslint-disable-next-line react-native/no-inline-styles
                    titleStyle={{justifyContent: 'flex-start', fontSize: 18}}
                    id={docObj.partyId}>
                    {renderItems(
                      docObj.partyId,
                      docObj.itemOpenTasks,
                      docObj.noItemGiven,
                    )}
                    {querySamples.length > 0 &&
                      filterItems(
                        docObj.partyId,
                        querySamples,
                        docObj.noItemGiven,
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

export default ItemOpenTask;
