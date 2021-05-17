import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {Modal} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';

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
  const [selectedTourPlan, setSelectedTourPlan] = useState(planOptions[0].text);
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const tourPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback onPress={showDialog}>
        <View style={styles.selectedTour}>
          <Text style={styles.selectedTourText}>{selectedTourPlan}</Text>
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
        <Text style={[styles.modalText, styles.modalTitleText]}>
          View Tour Plan for
        </Text>
      </View>
    );
  };

  const selectedTourPlanHandler = planOption => {
    setSelectedTourPlan(planOption.text);
    hideDialog();
  };

  const getModalContent = () => {
    return (
      <View style={styles.contentView}>
        {planOptions.map((option, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => selectedTourPlanHandler(option)}>
            <Text style={styles.modalText}>{option.text}</Text>
          </TouchableWithoutFeedback>
        ))}
      </View>
    );
  };

  const openTourPlanDropDown = () => {
    return (
      <Modal
        open={visible}
        onClose={hideDialog}
        closeAction={true}
        modalTitle={getModalTitle()}
        modalContent={getModalContent()}
      />
    );
  };

  return (
    <View style={styles.container}>
      {tourPlanDropDown()}
      {openTourPlanDropDown()}
    </View>
  );
};

export default MonthlyTourPlan;
