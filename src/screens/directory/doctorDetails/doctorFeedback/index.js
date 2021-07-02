import React, {useEffect, useState} from 'react';
import {View, Dimensions} from 'react-native';
import styles from './styles';
import {Label, Button, LabelVariant} from 'components/elements';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {ArrowBack} from 'assets';
import dayjs from 'dayjs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Strings} from 'common';
import {getFormatDate} from 'utils/dateTimeHelper';
import AddDoctor from './addDoctor';
import VisitDetail from './visitDetail';
import {fetchDcrDetail, fetchDoctorList} from './redux/dcrSlice';
import {useDispatch, useSelector} from 'react-redux';
import {dcrSelector, dcrActions} from './redux';
import {Helper} from 'database';
import EDetailingDCR from './discussed';

const DoctorFeedback = ({navigation, route}) => {
  const doctorData = route?.params?.data || null;
  const [showModal, setShowModal] = useState(false);
  const [staffPositionId, setStaffPositionId] = useState(null);
  const [disableSwipeGesture, updateSwipeGesture] = useState(false);
  const items = [
    {name: 'question1', key: 1},
    {name: 'question1', key: 2},
  ];
  const {width} = Dimensions.get('window');
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const id = await Helper.getStaffPositionId();
      setStaffPositionId(id);
    })();
  });

  // dispatching the action
  useEffect(() => {
    dispatch(
      fetchDoctorList({
        staffPositionId: staffPositionId,
      }),
    );
  }, [dispatch, staffPositionId]);

  useEffect(() => {
    dispatch(fetchDcrDetail({staffPositionId: staffPositionId}));
  }, [dispatch, staffPositionId]);

  // To close Feedback screen
  const closeFeedback = () => {
    navigation.pop();
  };

  const closeAddHandler = () => {
    setShowModal(false);
  };
  const AddDoctorHandler = () => {
    setShowModal(true);
  };

  const updateSelectedData = (doctorData, selectedDocData) => {
    setShowModal(false);
    dispatch(
      dcrActions.setDoctorList({
        doctorData: doctorData,
        selectedDocData: selectedDocData,
      }),
    );
  };
  const swipeGestureClk = isSwipe => {
    updateSwipeGesture(isSwipe);
  };

  const seniorList = useSelector(dcrSelector.getSeniors());

  const renderSlide = index => {
    if (index === 0) {
      return (
        <VisitDetail
          index={index}
          width={width}
          seniorList={seniorList}
          disSwipeGesture={disable => {
            swipeGestureClk(disable);
          }}
          addDoctorHandler={AddDoctorHandler}
        />
      );
    } else if (index === 1) {
      return (
        <View style={[{width: width - 300}, styles.slideStyle]}>
          <EDetailingDCR />
        </View>
      );
    }
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <View style={styles.headerDataStyle}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={closeFeedback}
                testID="back_btn">
                <ArrowBack width={34.7} height={34.7} />
              </TouchableOpacity>
              <Label
                variant={LabelVariant.h2}
                title={`${Strings.doctorDetail.dcr.feedback} - `}
              />
              <Label
                style={styles.nameStyling}
                variant={LabelVariant.h2}
                testID="doctor_name"
                title={`Dr. ${doctorData.name}`}
              />
            </View>
            <View>
              <Label
                style={styles.dateStyling}
                title={getFormatDate({date: dayjs(), format: 'DD MMM YYYY'})}
              />
            </View>
          </View>
          <Button
            title={Strings.doctorDetail.dcr.btnDone}
            disabled={true}
            contentStyle={styles.button}
          />
        </View>
        <View style={styles.section}>
          <SwiperFlatList
            data={items}
            renderAll={false}
            showPagination
            paginationStyleItemActive={styles.activePaginationItem}
            paginationStyleItem={styles.paginationItem}
            paginationStyle={styles.paginationStyle}
            style={styles.swiperListStyle}
            renderItem={({index}) => renderSlide(index)}
            disableGesture={disableSwipeGesture}
          />
        </View>
      </View>
      {!!showModal && (
        <AddDoctor
          showModal={showModal}
          closeModal={closeAddHandler}
          updateSelectedData={updateSelectedData}
        />
      )}
    </>
  );
};

export default DoctorFeedback;
