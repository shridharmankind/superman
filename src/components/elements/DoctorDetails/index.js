import React, {useState} from 'react';
import {View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {Frequency, Label} from 'components/elements';
import themes from 'themes';
import styles from './styles';
import {DoctorVisitStates} from 'components/widgets';

/**
 * Custom doctor details component using Chip from react-native-paper.
 * This serves the purpose to make the use of doctor details consistent throughtout the app
 * @param {String} title text of the chip
 * @param {String} specialization doctor specialization eg. Cardiologist, Neurologist
 * @param {String} image doctor image
 * @param {Boolean} selected doctor is selected or not
 * @param {String} category category of doctor eg: KYC, AA, A+
 * @param {String} location location of the doctor
 * @param {Function} onPress click event
 * @param {String} testID date test id
 */

const DoctorDetails = ({
  title,
  specialization,
  image,
  category,
  selected,
  location,
  customStyle,
  showFrequencyChiclet,
  showVisitPlan,
  visitData,
  ...props
}) => {
  const [select, setSelect] = useState(selected);

  const renderVisitData = () => {
    return (
      <View style={styles.visitContainer}>
        {visitData.map((visit, index) => (
          <DoctorVisitStates
            key={index}
            visitDate={visit.date}
            visitMonth={visit.month}
            visitState={visit.state}
          />
        ))}
      </View>
    );
  };

  return (
    <>
      <View style={styles.detailsContainer}>
        <View
          style={[
            styles.divisionContainer,
            customStyle && customStyle.divisionContainerCustom,
            {backgroundColor: getDivisionColor(category)},
          ]}>
          <Label
            style={styles.divisionText}
            title={category && category.toUpperCase()}
            size={customStyle ? customStyle.divisionSize : 14}
            type={'bold'}
          />
        </View>
        <Image
          style={[styles.image, customStyle && customStyle.imageCustom]}
          source={require('../../../assets/images/logo.png')}
        />
        <View style={styles.nameContainer}>
          <Label
            title={title}
            size={customStyle ? customStyle.titleSize : 26}
          />
          <View style={customStyle && customStyle.nameContainerCustom}>
            <Label
              size={customStyle ? customStyle.titleSize : 18}
              title={specialization}
              style={customStyle && customStyle.specialization}
            />
            {location && (
              <Label
                size={customStyle ? customStyle.titleSize : 18}
                title={location}
                style={styles.location}
              />
            )}
          </View>
        </View>
      </View>
      {showFrequencyChiclet && (
        <View style={styles.frequecyContainer}>
          <Frequency visited={true} />
          <Frequency />
          <Frequency />
        </View>
      )}
      {select && (
        <View style={styles.checkContainer}>
          <Icon
            name="check-circle"
            size={32}
            color={themes.colors.checkCircleBlue}
          />
        </View>
      )}
      {showVisitPlan && renderVisitData()}
    </>
  );
};

const getDivisionColor = division => {
  switch (division && division.toLowerCase()) {
    case 'kyc':
      return themes.colors.orange;
    case 'a+':
      return themes.colors.darkBlue;
    case 'b':
      return themes.colors.lightBlue;
    default:
      return themes.colors.white;
  }
};

DoctorDetails.defaultProps = {
  showFrequencyChiclet: true,
  showVisitPlan: false,
  selected: false,
  division: '',
};

DoctorDetails.propTypes = {
  title: PropTypes.string.isRequired,
  specialization: PropTypes.string,
  category: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.string,
  selected: PropTypes.bool,
  testID: PropTypes.string,
  onPress: PropTypes.func,
  customStyle: PropTypes.object,
};

export default DoctorDetails;
