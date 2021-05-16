import React, {useState} from 'react';
import {View, Text, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Button, TabBar} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Paragraph, Dialog, Portal} from 'react-native-paper';
import theme from 'themes';

const MonthlyTourPlan = () => {
  const {colors, fonts} = useTheme();

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
        <View style={styles.selectedTour} onPre>
          <Text style={styles.selectedTourText}>{selectedTourPlan}</Text>
          <View style={styles.iconContainer}>
            <Icon name="caret-down" size={30} color={colors.black} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {tourPlanDropDown()}
    </View>
  );
};

export default MonthlyTourPlan;
