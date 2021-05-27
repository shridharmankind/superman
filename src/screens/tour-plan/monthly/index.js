/* eslint-disable indent */
import React, {useState, useEffect, useRef} from 'react';
import {View, TouchableWithoutFeedback, ScrollView} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {Modal, Label} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Strings} from 'common';
import {StandardPlanContainer} from 'screens/tourPlan';
import {MonthlyView, Legends} from 'components/widgets';
import {getTourPlanScheduleMonths} from 'screens/tourPlan/helper';
import {PLAN_TYPES, STAFF_CODES} from 'screens/tourPlan/constants';
import userMock from '../../../data/mock/api/doctors.json';

import {
  getSubordinatesCreator,
  monthlyTourPlanSelector,
  fetchWorkingDayCreator,
} from './redux';
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
  const {colors} = useTheme();

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
    subOrdinatesList.forEach((item, index) => {
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
            <Icon name="caret-down" size={20} color={colors.primary} />
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
            <Icon name="caret-down" size={20} color={colors.primary} />
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
                style={styles.modalText}
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
    return (
      <Modal
        open={visible}
        onClose={handleDialog}
        closeAction={true}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
        customModalPosition={styles.modalPosition}
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
          <>
            <StandardPlanContainer
              workingDays={workingDays}
              navigation={navigation}
            />
          </>
        ) : null;

      default: {
        return monthSelected && workingDays.length ? (
          <>
            <MonthlyView
              workingDays={workingDays}
              monthSelected={monthSelected}
              previousMonthSelected={previousMonthSelected}
            />
            <Legends />
          </>
        ) : null;
      }
    }
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
      {openTourPlanDropDown()}
      {renderView()}
    </View>
  );
};

export default MonthlyTourPlan;
