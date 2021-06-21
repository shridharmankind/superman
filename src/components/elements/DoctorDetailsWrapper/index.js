import React, {useState, useEffect} from 'react';
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
 * @param {Object} containerStyle contains styles for the main View
 * @param {Boolean} isKyc boolean value passed for KYC status
 * @param {Boolean} isPatchedData is patched is selected or not passed as Boolean
 * @param {Object} party party information is passed as an object
 * @param {Boolean} isPartyInPatch is party is availble in patch
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
  party,
  isPatchedData,
  isKyc,
  containerStyle,
  isSameDayPatch,
  isPartyInPatch,
  ...props
}) => {
  //TO DO: not required - remove after team discusssion
  const {frequency, alreadyVisited} = party;
  const [count, setCount] = useState();
  const isDisabled = !isSameDayPatch && frequency <= alreadyVisited;
  const showTicked =
    (selected && frequency > alreadyVisited) ||
    (isSameDayPatch && selected && frequency <= alreadyVisited);

  /**
   *  Select and deselect the card ,also
   *  update the frequency count
   * @param {Boolean} sel
   */
  const handleDoctorSelection = sel => {
    onPress(id);
  };

  useEffect(() => {
    if (
      frequency > alreadyVisited ||
      (frequency === alreadyVisited && isSameDayPatch)
    ) {
      if (selected) {
        setCount(count + 1);
      }
      if (!selected) {
        setCount(count - 1);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  const getSelectedFrequency = () => {
    if (isSameDayPatch && isPatchedData) {
      setCount(alreadyVisited);
    } else if (!isSameDayPatch && isPatchedData) {
      if (selected && frequency > alreadyVisited) {
        setCount(alreadyVisited + 1);
      } else {
        setCount(alreadyVisited);
      }
    } else {
      const countData = selected ? alreadyVisited + 1 : alreadyVisited;
      setCount(countData);
    }
  };

  useEffect(() => {
    getSelectedFrequency();
    // TO BE CALLED ONCE hence disabling dep hooks
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isPartyInPatch && frequency <= alreadyVisited && !isSameDayPatch) {
    return null;
  }

  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => handleDoctorSelection(!selected)}
      style={[styles.container, containerStyle, isDisabled && styles.disabled]}
      disabled={isDisabled}
      activeOpacity={1}>
      <DoctorDetails
        title={title}
        specialization={specialization}
        image={image}
        category={category}
        location={location}
        isTicked={showTicked || false}
        selectedVistedFrequency={count}
        frequency={frequency}
        partyType={party.partyTypes.name}
        isKyc={isKyc}
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
