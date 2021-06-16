/* eslint-disable indent */
import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {Modal, Label} from 'components/elements';
import {Strings} from 'common';
import {StandardPlanContainer} from 'screens/tourPlan';
import {MonthlyView, Legends, CongratulatoryModal} from 'components/widgets';
import {getTourPlanScheduleMonths} from 'screens/tourPlan/helper';
import {
  PLAN_TYPES,
  STAFF_CODES,
  TOUR_PLAN_TYPE,
} from 'screens/tourPlan/constants';
import userMock from '../../../data/mock/api/doctors.json';
import {DropdownIcon} from 'assets';
import {
  getSubordinatesCreator,
  monthlyTourPlanSelector,
  fetchWorkingDayCreator,
} from './redux';
import themes from 'themes';

/**
 * Check if same month is selected
 * @param {Object} monthFound
 * @param {Object} monthSelected
 * @returns Boolean
 */

const isSameMonthSelected = (monthFound, monthSelected) => {
  return (
    monthFound?.month === monthSelected?.month &&
    monthFound?.year === monthSelected?.year
  );
};
/**
 * @param {String} value
 * @returns ref value
 */
function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}
/**
 * This file renders the dropdowns to configure your monthly plan by creating your STP
 * or view your subOrdinates/STP if you are FLM/SLM.
 */
const MonthlyTourPlan = ({navigation}) => {
  const dispatch = useDispatch();

  const user = userMock.users[0];

  const [workingDays, setworkingDays] = useState();
  const [planOptions, setPlanOptions] = useState([]);
  const [selectedTourPlan, setSelectedTourPlan] = useState({});
  const [selectedMyPlan, setSelectedMyPlan] = useState({});
  const [visible, setVisible] = useState(false);
  const [myPlanOptions, setMyPlanOptions] = useState([]);
  const [dropDownClicked, setDropDownClicked] = useState(PLAN_TYPES.TOURPLAN);
  const [monthSelected, setMonthSelected] = useState();

  const previousMonthSelected = usePrevious(monthSelected);
  const [showCongratsModal, setShowCongratsModal] = useState(false); // TODO - to open congratulatory modal need to setShowCongratsModal to true

  const subOrdinatesList = useSelector(
    monthlyTourPlanSelector.allSubOrdinates(),
  );
  const workindDay = useSelector(monthlyTourPlanSelector.allWorkingDay());

  useEffect(() => {
    dispatch(
      getSubordinatesCreator({
        staffPositionid: 2,
      }),
    );
  }, [dispatch]);

  useEffect(() => setworkingDays(workindDay), [workindDay]);

  useEffect(() => {
    const myPlan = {
      id: 1,
      text: Strings.myPlan,
      selected: true,
    };

    const subOrdinateListNew = [myPlan];
    subOrdinatesList?.forEach((item, index) => {
      subOrdinateListNew.push({
        id: index + 2,
        text: `${item.firstName} ${item.middleName} ${item.lastName}`,
        selected: false,
      });
    });

    setMyPlanOptions(subOrdinateListNew);
    setSelectedMyPlan(subOrdinateListNew[0]);
  }, [subOrdinatesList]);
  //effects
  useEffect(() => {
    let schedule = getTourPlanScheduleMonths();
    if (user.staffPositions[0].staffCode === STAFF_CODES.MR) {
      schedule = [
        {
          text: Strings.stpWithAbbreviation,
          month: 0,
          year: 0,
        },
        ...schedule,
      ];
    }
    let newSchedule = schedule.map((option, index) => {
      return {
        id: index + 1,
        text: option.text,
        selected:
          user.staffPositions[0].staffCode === STAFF_CODES.MR
            ? index === 1
            : index === 0,
        month: option.month,
        year: option.year,
      };
    });
    setPlanOptions(newSchedule);
    user.staffPositions[0].staffCode === STAFF_CODES.MR
      ? setSelectedTourPlan(newSchedule[1])
      : setSelectedTourPlan(newSchedule[0]);
  }, [user]);

  //Effect to get working Days from API on load of page
  useEffect(() => {
    dispatch(fetchWorkingDayCreator({userId: 1}));
  }, [dispatch]);

  useEffect(() => {
    const monthFound = getTourPlanScheduleMonths().find(schedule => {
      return schedule.text.indexOf(selectedTourPlan.text) > -1;
    });
    if (monthFound?.month && !isSameMonthSelected(monthFound, monthSelected)) {
      setMonthSelected(monthFound);
    }
  }, [selectedTourPlan, monthSelected]);
  /**
   * toggles modal
   */
  const handleDialog = () => setVisible(!visible);

  /**
   * on clicking the dropdown, set type of dropdown clicked and also toggle the modal visibility
   * @param {String} type type of dropdwon - tour-plan or my-plan
   */
  const dropDownClickHandler = type => {
    setDropDownClicked(type);
    setVisible(!visible);
  };

  /**
   * renders tourplan dropdown selected values
   * @returns dropdown for tour plan
   */
  const tourPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dropDownClickHandler(PLAN_TYPES.TOURPLAN);
        }}>
        <View style={styles.selectedTour}>
          <View>
            <Label
              type="bold"
              title={
                selectedTourPlan.id === 1 &&
                user.staffPositions[0].staffCode === STAFF_CODES.MR
                  ? `${Strings.stp}`
                  : (selectedTourPlan?.text || '').split(' ').join(', ')
              }
              size={16}
              style={styles.selectedTourText}
            />
          </View>
          <View style={styles.iconContainer}>
            <DropdownIcon width={20} height={20} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  /**
   * renders myPlan dropdown selected value
   * @return dropdown for my plan
   */
  const myPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          dropDownClickHandler(PLAN_TYPES.MYPLAN);
        }}>
        <View style={styles.selectedTour}>
          <View style={styles.mySelectedTourTextContainer}>
            <Label
              type="bold"
              title={selectedMyPlan?.text}
              size={16}
              style={styles.selectedTourText}
            />
          </View>
          <View style={styles.iconContainer}>
            <DropdownIcon width={20} height={20} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  /**
   * configures the modal title
   * @returns modal title
   */
  const getModalTitle = () => {
    return (
      <View>
        <Label
          type="bold"
          title={Strings.viewTourPlan}
          size={14}
          style={styles.modalTitleText}
        />
      </View>
    );
  };

  /**
   * return the dropdown options for tourplan or myplan
   * @returns tourplan/myplan options
   */
  const getOptionsToIterateForDropDown = () => {
    const isTourPlan = dropDownClicked === PLAN_TYPES.TOURPLAN;
    const optionsToIterate = isTourPlan ? planOptions : myPlanOptions;
    return optionsToIterate;
  };

  /**
   * handles the click event on dropdown value.
   * Once a value is clicked, set its selected property to true
   * @param {Object} planOption dropdown option clicked
   */
  const selectedTourPlanHandler = planOption => {
    const isTourPlan = dropDownClicked === PLAN_TYPES.TOURPLAN;
    let optionsToIterate = getOptionsToIterateForDropDown();
    const newOptions = optionsToIterate.map(o => {
      o.selected = o.id === planOption.id;
      return o;
    });

    // TODO: try using useReducer
    if (isTourPlan) {
      setPlanOptions(newOptions);
      setSelectedTourPlan(planOption);
    } else {
      setMyPlanOptions(newOptions);
      setSelectedMyPlan(planOption);
    }

    handleDialog();
  };

  /**
   * renders modal content area
   * @returns modal content
   */
  const getModalContent = () => {
    const optionsToIterate = getOptionsToIterateForDropDown();
    return (
      <ScrollView>
        <View style={styles.contentView}>
          {optionsToIterate.map((option, index) => (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => selectedTourPlanHandler(option)}>
              <Label
                type={option.selected ? 'bold' : 'regular'}
                title={option.text}
                size={14}
                style={
                  option.selected ? styles.modalTextSelected : styles.modalText
                }
              />
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    );
  };

  /**
   * opens the modal
   * @returns modal
   */
  const openTourPlanDropDown = () => {
    const optionsToIterate = getOptionsToIterateForDropDown();
    return (
      <Modal
        open={visible}
        onClose={handleDialog}
        closeAction={true}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        customModalPosition={
          optionsToIterate?.length < 7
            ? [styles.modalPosition, styles.modalHeightHalf]
            : styles.modalPosition
        }
      />
    );
  };

  /**
   *  Renders View on basis of selected tour plan
   * @returns view selected
   */

  const renderView = () => {
    switch (selectedTourPlan?.id) {
      case 1:
        return workingDays.length ? (
          <View style={styles.tourPlanViewContainer}>
            <StandardPlanContainer
              workingDays={workingDays}
              navigation={navigation}
            />
            <View style={styles.stpLegend}>
              <Legends tourType={TOUR_PLAN_TYPE.STANDARD} />
            </View>
          </View>
        ) : null;

      default: {
        return monthSelected && workingDays.length ? (
          <View style={styles.tourPlanViewContainer}>
            <MonthlyView
              workingDays={workingDays}
              monthSelected={monthSelected}
              previousMonthSelected={previousMonthSelected}
            />

            <Legends />
          </View>
        ) : null;
      }
    }
  };

  const renderCongratsContent = () => {
    return (
      <View style={styles.congratsContent}>
        <Label
          type={'regular'}
          size={18}
          textColor={themes.colors.grey[900]}
          title={Strings.successfullyCreatedSTP}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.dropDownsContainer}>
        <View style={styles.tourPlanContainer}>{tourPlanDropDown()}</View>
        {user?.staffPositions &&
          user?.staffPositions[0].staffCode === STAFF_CODES.FLM && (
            <View style={styles.myPlanContainer}>{myPlanDropDown()}</View>
          )}
      </View>
      {user.staffPositions[0].staffCode === STAFF_CODES.MR &&
        selectedTourPlan.id === 1 && (
          <Label
            title={Strings.createNewStp}
            size={10}
            style={styles.dropdownLabel}
          />
        )}
      {openTourPlanDropDown()}
      {renderView()}
      <CongratulatoryModal
        open={showCongratsModal}
        actionTitle={Strings.takeMeToHome}
        content={renderCongratsContent()}
        bottomText={Strings.beginJourney}
        btnAction={() => {}}
      />
    </View>
  );
};

export default MonthlyTourPlan;
