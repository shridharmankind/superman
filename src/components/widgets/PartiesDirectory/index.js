import React, {useState} from 'react';
import {View, Image} from 'react-native';
import PropTypes from 'prop-types';
import {Label} from 'components/elements';
import styles from './styles';
import {DoctorTag, DivisionType} from 'components/widgets';
import {Strings, Constants} from 'common';

/**
 * Custom doctor details component using Chip from react-native-paper.
 * This serves the purpose to make the use of doctor details consistent throughtout the app
 * @param {String} title text of the chip
 * @param {String} gender gender of party
 * @param {Array} specialization doctor specialization eg. Cardiologist, Neurologist
 * @param {String} image doctor image
 * @param {Boolean} selected doctor is selected or not
 * @param {String} category category of doctor eg: KYC, AA, A+
 * @param {String} location location of the doctor
 * @param {Object} customStyle style object passed fro consumer component
 * @param {Boolean} showFrequencyChiclet flag to show/hide frequency chiclet
 * @param {Boolean} showVisitPlan flag to show/hide doctor's daily visit plan
 * @param {Object} visitData doctor's visit plan speicify upcoming, today, missed etc. visits
 * @param {Boolean} isTicked flag to identify is user has clicked on chiclet
 * @param {Function} onTileNamePress Fire when click on tile name
 */

const PartiesDirectory = ({
  title,
  gender,
  specialization,
  image,
  category,
  selected,
  location,
  customStyle,
  showFrequencyChiclet,
  showVisitPlan,
  visitData,
  isTicked,
  showTile,
  onTilePress,
  onTileNamePress,
  alreadyVisited,
  frequency,
  selectedVistedFrequency,
  partyType,
  isKyc,
  isCampaign,
  locationSeperator = true,
  showTodayPlanButton = false,
  actionButton = null,
  ...props
}) => {
  const [imageSrc, setImageSrc] = useState({uri: image});
  const [isImageErrror, setIsImageErrror] = useState(false);

  /**
   *
   * Handle image error & return default image
   */
  const OnErrorHandler = () => {
    if (!isImageErrror) {
      const genderImage =
        Constants.GENDER.MALE === (gender || '').toUpperCase()
          ? require('assets/images/male.png')
          : require('assets/images/female.png');
      const src =
        Constants.PARTY_TYPE.DOCTOR === partyType
          ? genderImage
          : require('assets/images/chemist.png');

      setImageSrc(src);
      setIsImageErrror(true);
    }
  };

  const getSpecialization = specialities => {
    return (specialities || {}).map(spec => spec?.name || spec).join(', ');
  };

  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <View style={styles.details}>
          {partyType === Constants.PARTY_TYPE.DOCTOR && (
            <View style={styles.divisionContainer}>
              {isKyc && (
                <DoctorTag
                  division={DivisionType.KYC}
                  title={`${DivisionType.KYC}`}
                />
              )}
              {isCampaign && (
                <DoctorTag
                  division={DivisionType.CAMPAIGN}
                  title={`${DivisionType.CAMPAIGN}`}
                />
              )}
              {category && <DoctorTag division={category} title={category} />}
            </View>
          )}

          <Image
            style={styles.image}
            source={imageSrc}
            onError={OnErrorHandler()}
          />

          <View style={styles.nameContainer}>
            <View style={styles.itemContainer}>
              <Label
                title={
                  partyType === Constants.PARTY_TYPE.DOCTOR
                    ? `${Strings.dr} ${title}`
                    : title
                }
                // size={customStyle ? customStyle.titleSize : 17}
                style={styles.name}
                type={'medium'}
                numberOfLines={2}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label
                size={customStyle ? customStyle.subTitleSize : 12}
                title={getSpecialization(specialization)}
                style={[styles.capitalize, styles.name]}
                numberOfLines={1}
              />
            </View>
            <View>
              <Label
                title={(location || {})
                  .map(spec => spec?.name || spec)
                  .join(', ')}
                style={[styles.capitalize, styles.name]}
              />
            </View>
          </View>
        </View>
        {actionButton && actionButton()}
      </View>
    </View>
  );
};

PartiesDirectory.defaultProps = {
  showFrequencyChiclet: true,
  showVisitPlan: false,
  selected: false,
  division: '',
  showTile: false,
  gender: 'Male',
  locationSeperator: true,
};

PartiesDirectory.propTypes = {
  title: PropTypes.string.isRequired,
  specialization: PropTypes.array,
  category: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.array,
  selected: PropTypes.bool,
  testID: PropTypes.string,
  onPress: PropTypes.func,
  customStyle: PropTypes.object,
  showFrequencyChiclet: PropTypes.bool,
  showVisitPlan: PropTypes.bool,
  isTicked: PropTypes.bool,
  onTileNamePress: PropTypes.func,
};

export default PartiesDirectory;
