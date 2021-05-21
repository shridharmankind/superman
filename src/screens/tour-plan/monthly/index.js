import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {Modal, Label} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Strings, Constants} from 'common';
import {StandardPlanContainer} from 'screens/tourPlan';
import {MonthlyView} from 'components/widgets';
import {getTourPlanScheduleMonths} from 'screens/tourPlan/helper';
import {PLAN_TYPES, STAFF_CODES} from 'screens/tourPlan/constants';
import {NetworkService} from 'services';

/**
 * This file renders the dropdowns to configure your monthly plan by creating your STP
 * or view your subOrdinates/STP if you are FLM/SLM.
 */
const MonthlyTourPlan = () => {
  const {colors} = useTheme();
  // constants
  const planArray = [
    {
      id: 1,
      text: 'Standard Tour Plan (STP)',
      selected: true,
    },
    {
      id: 2,
      text: 'March 2021',
      selected: false,
    },
    {
      id: 3,
      text: 'April 2021',
      selected: false,
    },
    {
      id: 4,
      text: 'May 2021',
      selected: false,
    },
  ];
  const [workingDays, setworkingDays] = useState([]);
  const [planOptions, setPlanOptions] = useState([]);
  const [selectedTourPlan, setSelectedTourPlan] = useState({});
  const [selectedMyPlan, setSelectedMyPlan] = useState({});
  const [visible, setVisible] = useState(false);
  const [myPlanOptions, setMyPlanOptions] = useState([]);
  const [user, setUser] = useState({});
  const [dropDownClicked, setDropDownClicked] = useState(PLAN_TYPES.TOURPLAN);

  //effects
  useEffect(() => {
    const fetchData = async () => {
      const result = await NetworkService.get('/single-user');
      if (result.data) {
        setUser(result.data);
        let schedule = getTourPlanScheduleMonths();
        if (result.data.staffPositions[0].staffCode === STAFF_CODES.MR) {
          schedule = [Strings.stp, ...schedule];
        }
        let newSchedule = schedule.map((option, index) => {
          return {
            id: index + 1,
            text: option,
            selected: index === 0,
          };
        });
        setPlanOptions(newSchedule);
        setSelectedTourPlan(newSchedule[0]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await NetworkService.get('/getSubordinates');
      if (result.data) {
        let myPlan = [
          {
            id: 1,
            text: Strings.myPlan,
            selected: true,
          },
        ];
        result.data.map((option, index) => {
          myPlan.push({
            id: index + 2,
            text: `${option.firstName} ${option.middleName} ${option.lastName}`,
            selected: false,
          });
        });
        setMyPlanOptions(myPlan);
        setSelectedMyPlan(myPlan[0]);
      }
    };
    fetchData();
  }, []);

  //Effect to get working Days from API on load of page
  useEffect(() => {
    const fetchData = async () => {
      const result = await NetworkService.get('/api/workingDays');
      if (result.status === Constants.HTTP_OK) {
        setworkingDays(result.data);
      }
    };
    fetchData();
  }, []);

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
          <View style={styles.selectedTourTextContainer}>
            <Label
              type="bold"
              title={selectedTourPlan?.text}
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
        return <StandardPlanContainer workingDays={workingDays} />;
      default:
        return (
          <MonthlyView
            selectedMonth={new Date().getMonth() + 1} //TODO:: integrate with pop-up
            workingDays={workingDays}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropDownsContainer}>
        <View style={styles.tourPlanContainer}>{tourPlanDropDown()}</View>
        {user?.staffPositions &&
          user?.staffPositions[0].staffCode === STAFF_CODES.FLM && (
            <View style={styles.myPlanContainer}>{myPlanDropDown()}</View>
          )}
      </View>
      {openTourPlanDropDown()}
      {renderView()}
      {renderView()}
    </View>
  );
};

export default MonthlyTourPlan;
