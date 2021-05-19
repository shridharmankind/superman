import React, {useState, useEffect} from 'react';
import {View, TouchableWithoutFeedback} from 'react-native';
import {useTheme} from 'react-native-paper';
import styles from './styles';
import {Modal, Label} from 'components/elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Strings} from 'common';
import {StandardPlanContainer} from 'screens/tourPlan';
import {getSubordinates, fetchSingleUser} from '../../../api';


const MonthlyTourPlan = () => {
  const {colors} = useTheme();

  useEffect(() => {
    console.log('here');
    const fetchData = async () => {
      const result = await fetchSingleUser('1');
      console.log('res', result);
      if (result.data) {
        console.log('singleuser', result.data);
        setUser(result.data);
      }
    };
    fetchData();
  }, []);
  const planArray = [
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
  const [myPlanOptions, setMyPlanOptions] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await getSubordinates();
      if (result.data) {
        console.log('subordinates', result.data);
        setMyPlanOptions(result.data);
      }
    };
    fetchData();
  }, []);

  const handleDialog = () => setVisible(!visible);

  const tourPlanDropDown = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDialog}>
        <View style={styles.selectedTour}>
          <Label
            type="bold"
            title={selectedTourPlan}
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
    setSelectedTourPlan(planOption.text);
    handleDialog();
  };

  const getModalContent = () => {
    let optionsToIterate = planOptions;
    if (user.staffPositions && user?.staffPositions[0].staffCode === 1) {
      optionsToIterate = myPlanOptions;
    }

    console.log('firstName', optionsToIterate);
    return (
      <View style={styles.contentView}>
        {optionsToIterate.map((option, index) => (
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

  return (
    <View style={styles.container}>
      <View style={styles.dropDownsContainer}>
        <View style={styles.tourPlanContainer}>{tourPlanDropDown()}</View>
        {user.staffPositions && user?.staffPositions[0].staffCode === 1 && (
          <View style={styles.myPlanContainer}>{myPlanDropDown()}</View>
        )}
      </View>
      {openTourPlanDropDown()}
    </View>
  );
};

export default MonthlyTourPlan;
