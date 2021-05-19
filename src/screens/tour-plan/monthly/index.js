import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {Modal, Label} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Strings} from 'common';
import {StandardPlanContainer} from 'screens/tourPlan';

const MonthlyTourPlan = () => {
  const {colors} = useTheme();

  const planOptions = [
    {
      id: 1,
      text: 'Standard Tour Plan (STP)',
    },
    {
      id: 2,
      text: 'March 2021',
    },
    {
      id: 3,
      text: 'April 2021',
    },
    {
      id: 4,
      text: 'May 2021',
    },
  ];
  const [selectedTourPlan, setSelectedTourPlan] = useState(planOptions[0]);
  const [visible, setVisible] = React.useState(false);

  const handleDialog = () => setVisible(!visible);

  const tourPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDialog}>
        <View style={styles.selectedTour}>
          <Label
            type="bold"
            title={selectedTourPlan.text}
            size={16}
            style={styles.selectedTourText}
          />
          <View style={styles.iconContainer}>
            <Icon name="caret-down" size={30} color={colors.black} />
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
          size={16}
          style={styles.modalTitleText}
        />
      </View>
    );
  };

  const selectedTourPlanHandler = planOption => {
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
              type="regular"
              title={option.text}
              size={16}
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
        return <StandardPlanContainer />;
      default:
        return null;
    }
  };
  return (
    <View style={styles.container}>
      {tourPlanDropDown()}
      {openTourPlanDropDown()}
      {renderView()}
    </View>
  );
};

export default MonthlyTourPlan;
