import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {Modal, Label} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Strings, Constants} from 'common';
import {StandardPlanContainer} from 'screens/tourPlan';
import {MonthlyView} from 'components/widgets';
import {NetworkService} from 'services';

const MonthlyTourPlan = () => {
  const {colors} = useTheme();

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
  const [planOptions, setPlanOptions] = useState(planArray);
  const [selectedTourPlan, setSelectedTourPlan] = useState(planOptions[0]);
  const [visible, setVisible] = React.useState(false);
  const [workingDays, setworkingDays] = useState([]);

  const handleDialog = () => setVisible(!visible);

  useEffect(() => {
    const fetchData = async () => {
      const result = await NetworkService.get('/api/workingDays');
      if (result.status === Constants.HTTP_OK) {
        setworkingDays(result.data);
      }
    };
    fetchData();
  }, []);

  const tourPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDialog}>
        <View style={styles.selectedTour}>
          <View style={styles.selectedTourTextContainer}>
            <Label
              type="bold"
              title={selectedTourPlan.text}
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
      <TouchableWithoutFeedback onPress={handleDialog}>
        <View style={styles.selectedTour}>
          <View style={styles.mySelectedTourTextContainer}>
            <Label
              type="bold"
              title={Strings.myPlan}
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
    setPlanOptions(options => {
      const newOptions = options.map(o => {
        o.selected = o.id === planOption.id;
        return o;
      });
      setPlanOptions(newOptions);
    });
    setSelectedTourPlan(planOption);
    handleDialog();
  };

  const getModalContent = () => {
    return (
      <View style={styles.contentView}>
        {planOptions.map((option, index) => (
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
    switch (selectedTourPlan.id) {
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
        <View style={styles.myPlanContainer}>{myPlanDropDown()}</View>
      </View>
      {openTourPlanDropDown()}
      {renderView()}
    </View>
  );
};

export default MonthlyTourPlan;
