import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {Modal, Label} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Strings, Constants} from 'common';
import {StandardPlanContainer} from 'screens/tourPlan';
import {getSubordinates, fetchSingleUser} from '../../../api';
import {getTourPlanScheduleMonths} from 'screens/tourPlan/helper';

const MonthlyTourPlan = () => {
  const {colors} = useTheme();
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchSingleUser(1);
      if (result.data) {
        setUser(result.data);
        let schedule = getTourPlanScheduleMonths();
        if (result.data.staffPositions[0].staffCode === 1) {
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
  }, [planOptions, user]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSubordinates();
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

  const [planOptions, setPlanOptions] = useState([]);
  const [selectedTourPlan, setSelectedTourPlan] = useState({});
  const [selectedMyPlan, setSelectedMyPlan] = useState({});
  const [visible, setVisible] = useState(false);
  const [myPlanOptions, setMyPlanOptions] = useState([]);
  const [user, setUser] = useState({});
  const [dropDownClicked, setDropDownClicked] = useState(
    Constants.planTypes.TOURPLAN,
  );

  const handleDialog = () => setVisible(!visible);

  const tourPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setDropDownClicked(Constants.planTypes.TOURPLAN);
          setVisible(!visible);
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

  const myPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          setDropDownClicked(Constants.planTypes.MYPLAN);
          setVisible(!visible);
        }}>
        <View style={styles.selectedTour}>
          <View style={styles.mySelectedTourTextContainer}>
            <Label
              type="bold"
              title={selectedMyPlan.text}
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

  const selectedTourPlanHandler = planOption => {
    let optionsToIterate = [];
    let isTourPlan = dropDownClicked === Constants.planTypes.TOURPLAN;
    optionsToIterate = isTourPlan ? planOptions : myPlanOptions;
    const newOptions = optionsToIterate.map(o => {
      o.selected = o.id === planOption.id;
      return o;
    });

    if (isTourPlan) {
      setPlanOptions(newOptions);
      setSelectedTourPlan(planOption);
    } else {
      setMyPlanOptions(newOptions);
      setSelectedMyPlan(planOption);
    }

    handleDialog();
  };

  const getModalContent = () => {
    let optionsToIterate = [];
    optionsToIterate =
      dropDownClicked === Constants.planTypes.TOURPLAN
        ? planOptions
        : myPlanOptions;
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
        return <StandardPlanContainer />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.dropDownsContainer}>
        <View style={styles.tourPlanContainer}>{tourPlanDropDown()}</View>
        {user.staffPositions && user?.staffPositions[0].staffCode === 2 && (
          <View style={styles.myPlanContainer}>{myPlanDropDown()}</View>
        )}
      </View>
      {openTourPlanDropDown()}
      {renderView()}
    </View>
  );
};

export default MonthlyTourPlan;
