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
 * @param {String} category category of doctor eg: KYC, AA, A+
 * @param {String} location location of the doctor
 */

const PartiesDirectory = ({
  title,
  gender,
  specialization,
  image,
  category,
  location,
  partyType,
  isKyc,
  isCampaign,
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
                style={styles.name}
                type={'medium'}
                numberOfLines={2}
              />
            </View>
            <View style={styles.itemContainer}>
              <Label
                title={(specialization || {})
                  .map(spec => spec?.name || spec)
                  .join(', ')}
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
  division: '',
  gender: 'Male',
};

PartiesDirectory.propTypes = {
  title: PropTypes.string.isRequired,
  specialization: PropTypes.array,
  category: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.array,
};

export default PartiesDirectory;
