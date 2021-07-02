import React, {useEffect, useReducer} from 'react';
import {useDispatch} from 'react-redux';
import {TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';
import {DoctorDetails} from 'components/elements';
import {standardPlanActions} from 'screens/tourPlan/standard/redux';
function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {
        ...state,
        alreadyVisitedCount: state.alreadyVisitedCount + 1,
      };
    case 'decrement':
      return {
        ...state,
        alreadyVisitedCount: state.alreadyVisitedCount - 1,
      };

    case 'init':
      return {...state, alreadyVisitedCount: action.value};
    default:
      return {...state, alreadyVisitedCount: state.alreadyVisited};
  }
}

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
 * @param {Boolean} isSameDoctorSelected is same doctore is selected in other area
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
  isCampaign,
  containerStyle,
  isSameDayPatch,
  isPartyInPatch,
  isSameDoctorSelected,
  ...props
}) => {
  //TO DO: not required - remove after team discusssion
  const {frequency, alreadyVisited} = party;
  const dispatch = useDispatch();
  const [state, dispatchFn] = useReducer(reducer, {
    ...party,
    alreadyVisitedCount: party?.alreadyVisited,
  });
  const isDisabled =
    (!isSameDayPatch && frequency === alreadyVisited && isPartyInPatch) ||
    (!isPartyInPatch && frequency <= alreadyVisited) ||
    isSameDoctorSelected;
  const showTicked =
    ((selected && frequency > alreadyVisited) ||
      (isSameDayPatch && selected && frequency <= alreadyVisited)) &&
    !isDisabled;

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
        dispatchFn({type: 'increment'});
      }
      if (!selected) {
        dispatchFn({type: 'decrement'});
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    dispatch(standardPlanActions.updatePartyAreasOnSelection(state));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, state]);

  const getSelectedFrequency = () => {
    if (isSameDayPatch && isPatchedData) {
      dispatchFn({type: 'init', value: alreadyVisited});
    } else if (!isSameDayPatch && isPatchedData) {
      if (selected && frequency > alreadyVisited) {
        dispatchFn({type: 'init', value: alreadyVisited + 1});
      } else {
        dispatchFn({type: 'init', value: alreadyVisited});
      }
    } else {
      const countData = selected ? alreadyVisited + 1 : alreadyVisited;
      dispatchFn({type: 'init', value: countData});
    }
  };

  useEffect(() => {
    getSelectedFrequency();
    // TO BE CALLED ONCE hence disabling dep hooks
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TouchableOpacity
      testID={testID}
      onPress={() => !isDisabled && handleDoctorSelection(!selected)}
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
        selectedVistedFrequency={state?.alreadyVisitedCount}
        frequency={frequency}
        partyType={party.partyTypes.name}
        isKyc={isKyc}
        isCampaign={isCampaign}
        onTileNamePress={() => handleDoctorSelection(!selected)}
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
