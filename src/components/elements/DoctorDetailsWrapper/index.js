import React from 'react';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {DoctorDetails} from 'components/elements';

/**
 * Wrapper component of doctor details giving the click event over the detail box
 * @param {String} title text of the chip
 * @param {String} id unique id of the doctor
 * @param {Array} specialization doctor specialization eg. Cardiologist, Neurologist
 * @param {String} image doctor image
 * @param {Boolean} selected doctor is selected or not
 * @param {String} category category of doctor eg: KYC, AA, A+
 * @param {String} location location of the doctor
 * @param {Function} onPress doctor card click handled
 */

const DoctorDetailsWrapper = ({
  title,
  specialization,
  image,
  category,
  selected,
  location,
  testID,
  id,
  onPress,
  ...props
}) => {
  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => onPress(id)}
      style={styles.container}
      activeOpacity={1}>
      <DoctorDetails
        title={title}
        specialization={specialization}
        image={image}
        category={category}
        location={location}
        isTicked={selected}
        {...props}
      />
    </TouchableOpacity>
  );
};

DoctorDetailsWrapper.defaultProps = {
  selected: false,
};

DoctorDetailsWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  specialization: PropTypes.array,
  category: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.string,
  selected: PropTypes.bool,
  testID: PropTypes.string,
};

export default DoctorDetailsWrapper;
