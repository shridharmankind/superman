import React, {useState} from 'react';
import {View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {Frequency, Label} from 'components/elements';
import themes from 'themes';
import styles from './styles';

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
  ...props
}) => {
  const [select, setSelect] = useState(selected);

  return (
    <>
      <View style={styles.detailsContainer}>
        <View
          style={[
            styles.divisionContainer,
            {backgroundColor: getDivisionColor(category)},
          ]}>
          <Label
            style={styles.divisionText}
            title={category}
            size={14}
            type={'bold'}
          />
        </View>
        <Image
          style={styles.image}
          source={require('../../../assets/images/logo.png')}
        />
        <View style={styles.nameContainer}>
          <Label title={title} size={26} />
          <View>
            <Label title={specialization} />
            {location && <Label title={location} style={styles.location} />}
          </View>
        </View>
      </View>
      <View style={styles.frequecyContainer}>
        <Frequency visited={true} />
        <Frequency />
        <Frequency />
      </View>
      {select && (
        <View style={styles.checkContainer}>
          <Icon
            name="check-circle"
            size={32}
            color={themes.colors.checkCircleBlue}
          />
        </View>
      )}
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
};

export default DoctorDetails;
