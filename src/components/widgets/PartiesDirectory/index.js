import React, {useState} from 'react';
import {View, Image} from 'react-native';
import * as converter from 'number-to-words';
import PropTypes from 'prop-types';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import {DoctorTag, DivisionType} from 'components/widgets';
import {Strings, Constants} from 'common';
import {translate} from 'locale';
import {capitalize} from 'screens/tour-plan/helper';
import {returnUTCtoLocal} from 'utils/dateTimeHelper';

/**
 * component to return parties list
 * @param {String} title text of the chip
 * @param {String} gender gender of party
 * @param {Array} specialization doctor specialization eg. Cardiologist, Neurologist
 * @param {String} image doctor image
 * @param {String} category category of doctor eg: KYC, AA, A+
 * @param {String} location location of the doctor
 * @param {String} partyType type of party - doctor/chemist
 * @param {Boolean} isKyc flag for kyc category
 * @param {Boolean} isCampaign flag for campaign category
 * @param {JSX} actionButton JSX for action button
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
  actionButton,
  visits,
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

  /**
   * Function to show missed count
   * @returns UI of tile
   */
  const getMissedCountTitle = () => {
    let adhocCallTitle = '';
    if (visits && Array.isArray(visits) && visits.length > 1) {
      const month = returnUTCtoLocal(visits[0].date, 'MMM');
      const adhocCallDates = (visits || []).reduce(
        (accumulator, visit, index) => {
          const visitDate = returnUTCtoLocal(visit.date, 'D');
          const seperator = index === visits.length - 1 ? ' & ' : ', ';
          const adhocList =
            accumulator === ''
              ? accumulator.concat(visitDate)
              : accumulator.concat(seperator).concat(visitDate);
          return adhocList;
        },
        '',
      );

      if (adhocCallDates && adhocCallDates !== '') {
        adhocCallTitle = translate('tourPlan.monthly.missedCount', {
          count: capitalize(converter.toWords(visits.length)),
          dates: `${adhocCallDates} ${month}`,
        });
      }
    }

    return adhocCallTitle;
  };

  /**
   * Function to render extra space to show metadata
   * @returns UI of tile
   */
  const renderTile = () => {
    return (
      <View style={styles.doctorTile}>
        <View style={styles.borderOuterContainer}>
          <View style={styles.borderInnerContainer} />
        </View>
        <View style={styles.tileContainer}>
          <View style={styles.tileLeft}>
            <Label
              style={styles.missedCountTitle}
              variant={LabelVariant.h6}
              title={getMissedCountTitle()}
              type={'semiBold'}
            />
          </View>
        </View>
      </View>
    );
  };

  /**
   * Return string of specializations of parties
   */
  const getSpecialization = () => {
    return (specialization || {}).map(spec => spec?.name || spec).join(', ');
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
              {category ? (
                <DoctorTag division={category} title={category} />
              ) : null}
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
                    ? `${Strings.dr} ${capitalize(title)}`
                    : title
                }
                style={styles.name}
                type={'medium'}
                numberOfLines={2}
              />
            </View>
            <View style={styles.itemContainer1}>
              <Label
                title={
                  partyType === Constants.PARTY_TYPE.DOCTOR
                    ? `${translate('dr')}`
                    : `${translate('ch')}`
                }
                style={styles.name}
                numberOfLines={2}
              />
            </View>
            <View style={styles.itemContainer1}>
              <Label
                title={capitalize(getSpecialization())}
                style={[styles.capitalize, styles.name]}
                numberOfLines={1}
              />
            </View>
            <View style={styles.itemContainer1}>
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
      {renderTile()}
    </View>
  );
};

PartiesDirectory.defaultProps = {
  gender: 'Male',
  actionButton: null,
};

PartiesDirectory.propTypes = {
  title: PropTypes.string.isRequired,
  specialization: PropTypes.array,
  category: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.array,
};

export default PartiesDirectory;
