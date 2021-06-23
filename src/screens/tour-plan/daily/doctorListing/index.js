import React, {useState} from 'react';
import {View, TouchableOpacity, TouchableHighlight} from 'react-native';
import {useTheme} from 'react-native-paper';
import {SwipeListView, SwipeRow} from 'react-native-swipe-list-view';
import styles from '../styles';
import {Strings} from 'common';
import {Label, DoctorDetails} from 'components/elements';
import {deletePartyCreator, doctorDetailActions} from '../redux';
import {useDispatch} from 'react-redux';
import {showToast, hideToast} from 'components/widgets/Toast';
import {Constants} from 'common';
import {CloseIcon} from 'assets';
import {getFormatDate} from 'utils/dateTimeHelper';

/**
 * render list of doctors
 * @param {Object} dayPlanData array of parties
 * @param {Function} onTileNamePress click function on name of doctor in party tile
 * @param {Function} onTilePress click function on party tile
 */
const PartyList = ({dayPlanData, onTileNamePress, onTilePress}) => {
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const [isDeleteOperationInProgress, setIsDeleteOperationInProgress] =
    useState(false);

  const doctorDetailStyleObject = {
    nameContainerCustom: styles.nameContainer,
    specialization: styles.specialization,
    divisionContainerCustom: styles.divisionContainer,
    imageCustom: styles.image,
    detailsContainerCustom: styles.detailsContainer,
    titleSize: 21,
    subTitleSize: 14,
    divisionSize: 10,
  };
  /**
   * Function to close the swipe
   * @param {Object} rowMap object containing mapping of rows
   * @param {Object} rowKey object containing the swiped row and props
   */
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  /**
   * Function to delete the swiped row
   *@param {Object} rowMap object containing mapping of rows
   * @param {Object} rowKey object containing the swiped row and props
   * @param {Object} item daily plan object for a party
   */
  const deleteRow = (rowMap, rowKey, item) => {
    let undoclicked = false;
    setIsDeleteOperationInProgress(true);
    dispatch(
      doctorDetailActions.tempStoreRemovedDoctor({
        staffPositionid: 11,
        day: parseInt(getFormatDate({format: 'D'}), 10),
        month: parseInt(getFormatDate({format: 'M'}), 10),
        year: parseInt(getFormatDate({format: 'YYYY'}), 10),
        partyId: item.id,
      }),
    );
    showToast({
      type: Constants.TOAST_TYPES.ALERT,
      props: {
        onPressLeftBtn: () => {
          undoclicked = true;
          hideToast();
          closeRow(rowMap, rowKey);
          dispatch(doctorDetailActions.addDeletedParty());
        },
        onClose: () => {
          hideToast();
          closeRow(rowMap, rowKey);
        },
        heading: `${Strings.removed}!`,
        subHeading: `${Strings.removedDoctor}`,
        actionLeftTitle: `${Strings.undo}`,
        btnContainerStyle: styles.toastBtnContainer,
      },
      onHide: () => {
        closeRow(rowMap, rowKey);
        setIsDeleteOperationInProgress(false);
        if (!undoclicked) {
          dispatch(
            deletePartyCreator({
              staffPositionid: 11,
              day: parseInt(getFormatDate({format: 'D'}), 10),
              month: parseInt(getFormatDate({format: 'M'}), 10),
              year: parseInt(getFormatDate({format: 'YYYY'}), 10),
              partyId: item.id,
            }),
          );
        }
      },
    });
  };

  /**
   * Function to render parties list in swipe list view
   * @param {Object} data party data
   * @param {Object} rowMap object containing mapping of rows
   */
  const renderItem = (data, rowMap) => {
    return (
      <SwipeRow
        disableRightSwipe={true}
        stopLeftSwipe={isDeleteOperationInProgress}
        disableLeftSwipe={isDeleteOperationInProgress}
        leftOpenValue={20 + Math.random() * 150}
        rightOpenValue={-90}>
        <View style={styles.rowBack}>
          <TouchableOpacity
            style={[styles.backRightBtn, styles.backRightBtnRight]}
            onPress={() => deleteRow(rowMap, data.item.key, data.item)}>
            <View style={styles.closeLabel}>
              <CloseIcon width={32} height={32} fill={colors.white} />
            </View>
            <Label
              title={Strings.removeFromToday}
              style={styles.removeCardButtonText}
            />
          </TouchableOpacity>
        </View>
        <TouchableHighlight
          onPress={() => console.log('click event')}
          style={styles.rowFront}
          underlayColor={colors.transparent}>
          <View style={styles.doctorDetailWrapper}>
            <View key={data.item.key} style={styles.doctorDetailContainer}>
              <DoctorDetails
                title={data.item.name}
                specialization={data.item.specialities}
                isKyc={data.item.isKyc}
                gender={data.item.gender}
                category={data.item.category}
                location={data.item.location}
                partyType={data?.item?.partyTypes?.name}
                customStyle={doctorDetailStyleObject}
                showFrequencyChiclet={false}
                showVisitPlan={true}
                visitData={data.item.visitData}
                showTile={true}
                onTileNamePress={() => {
                  onTileNamePress(data.item);
                }}
                onTilePress={() => {
                  onTilePress(data);
                }}
              />
            </View>
          </View>
        </TouchableHighlight>
      </SwipeRow>
    );
  };
  return (
    <SwipeListView
      data={dayPlanData}
      renderItem={renderItem}
      stopLeftSwipe={isDeleteOperationInProgress}
    />
  );
};

export default PartyList;
