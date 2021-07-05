import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, Dimensions, Text} from 'react-native';
import styles from './styles';
import {Label, Button, LabelVariant} from 'components/elements';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {ArrowBack} from 'assets';
import dayjs from 'dayjs';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Strings} from 'common';
import {getFormatDate} from 'utils/dateTimeHelper';
import EDetailingDCR from './discussed';
import themes from 'themes';
import VisitDetail from './visitDetail';
import SampleOpenTasks from './sampleRequest';
import ItemOpenTask from './itemOpenTask';
import SamplesRequest from './samplesReq';
import ItemRequest from './itemsReq';
import {
  fetchDcrDetail,
  fetchStaffDetail,
  fetchDcrData,
  fetchDoctorList,
  fetchEDetailedList,
  fetchOtherProducts,
} from './redux/dcrSlice';
import {useDispatch, useSelector} from 'react-redux';
import {dcrSelector, dcrActions} from './redux';
import {Helper} from 'database';
import EDetailingDCR from './discussed';
import VoiceNote from './voiceNote';
import InfoOpenTasks from './infoOpenTasks';
import Icon from 'react-native-vector-icons/FontAwesome';
import AddDoctor from './addDoctor';

const DoctorFeedback = ({navigation, route}) => {
  const doctorData = route?.params?.data || null;
  const [showModal, setShowModal] = useState(false);
  const [staffPositionId, setStaffPositionId] = useState(null);
  const [hideRightArrow, toggleRightArrow] = useState(false);
  const [hideLeftArrow, toggleLeftArrow] = useState(false);
  // const [disableSwipeGesture, updateSwipeGesture] = useState(false);
  const items = [
    {name: 'question1', key: 1},
    {name: 'question2', key: 2},
    {name: 'question3', key: 3},
    {name: 'question4', key: 4},
    {name: 'question5', key: 5},
    {name: 'question6', key: 6},
    {name: 'question7', key: 7},
    {name: 'question8', key: 5},
    // {name: 'question5', key: 5},
    // {name: 'question5', key: 5},
  ];
  const {width} = Dimensions.get('window');
  const swiperRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const id = await Helper.getStaffPositionId();
      setStaffPositionId(id);
    })();
  });
  useEffect(() => {
    if (staffPositionId) {
      dispatch(
        fetchOtherProducts({
          staffPositionId: staffPositionId,
          partyId: doctorData?.id,
        }),
      );
    }
  }, [dispatch, staffPositionId]);
  useEffect(() => {
    if (staffPositionId) {
      dispatch(
        fetchEDetailedList({
          staffPositionId: staffPositionId,
          partyIds: [doctorData?.id],
        }),
      );
    }
  }, [dispatch, staffPositionId]);
  // dispatching the action
  useEffect(() => {
    dispatch(
      fetchDoctorList({
        staffPositionId: staffPositionId,
      }),
    );
  }, [dispatch, staffPositionId]);

  useEffect(() => {
    dispatch(fetchStaffDetail({staffPositionId: staffPositionId}));
  }, [dispatch, staffPositionId]);

  useEffect(() => {
    if (!!doctors && doctors.length <= 0) {
      dispatch(fetchDcrData({staffPositionId: staffPositionId}));
    }
  }, [dispatch, staffPositionId, doctors]);

  // To close Feedback screen
  const closeFeedback = () => {
    navigation.pop();
  };

  // const swipeGestureClk = useCallback(isSwipe => {
  //   updateSwipeGesture(isSwipe);
  // }, []);

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
  const seniorList = useSelector(dcrSelector.getSeniors());
  const doctors = useSelector(dcrSelector.getPartyData());

  const renderSlide = useCallback(
    index => {
      if (index === 0) {
        return (
          <VisitDetail
            index={index}
            width={width}
            seniorList={seniorList}
            addDoctorHandler={AddDoctorHandler}
            hideShowRightArrow={show => hideShowRightArrow(show)}
          />
        );
      } else if (index === 1) {
        return (
          <View style={[{width: width - 300}, styles.slideStyle]}>
            <EDetailingDCR />
          </View>
        );
      } else if (index === 2) {
        return (
          <SampleOpenTasks index={index} width={width} doctorData={doctors} />
        );
      } else if (index === 3) {
        return (
          <ItemOpenTask index={index} width={width} doctorData={doctors} />
        );
      } else if (index === 4) {
        return <SamplesRequest index={index} width={width} />;
      } else if (index === 5) {
        return <ItemRequest index={index} width={width} />;
      } else if (index === 6) {
        return <InfoOpenTasks index={index} width={width} />;
      } else if (index === 7) {
        return (
          <View style={[{width: width - 300}, styles.slideStyle]}>
            <VoiceNote />
          </View>
        );
      }
    },
    [doctors, seniorList, width],
  );

  const renderArrow = icon => (
    <Icon name={icon} size={16} color={themes.colors.primary} />
  );

  const handleRightArrow = () => {
    let currentIndex = swiperRef.current.getCurrentIndex();
    let scrollindex = currentIndex + 1;
    if (scrollindex < items.length) {
      swiperRef.current.scrollToIndex({index: scrollindex});
    }
  };

  const handleLeftArrow = () => {
    let currentIndex = swiperRef.current.getCurrentIndex();
    let scrollindex = currentIndex - 1;
    if (scrollindex < 0) {
      return;
    }
    swiperRef.current.scrollToIndex({index: scrollindex});
  };

  const hideShowRightArrow = show => {
    toggleRightArrow(show);
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
          {!hideRightArrow && (
            <View style={styles.rightArrow}>
              <TouchableOpacity onPress={() => handleRightArrow()}>
                {renderArrow('chevron-right')}
              </TouchableOpacity>
            </View>
          )}
          {!hideLeftArrow && (
            <View style={styles.LeftArrow}>
              <TouchableOpacity onPress={() => handleLeftArrow()}>
                {renderArrow('chevron-left')}
              </TouchableOpacity>
            </View>
          )}

          <SwiperFlatList
            data={items}
            ref={swiperRef}
            renderAll={false}
            showPagination
            paginationStyleItemActive={styles.activePaginationItem}
            paginationStyleItem={styles.paginationItem}
            paginationStyle={styles.paginationStyle}
            style={styles.swiperListStyle}
            renderItem={({index}) => renderSlide(index)}
            disableGesture={true}
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
