import React, {useState} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {Label, LabelVariant} from 'components/elements';
import themes from 'themes';
import styles from './styles';
import {DoctorVisitStates, DoctorTag, DivisionType} from 'components/widgets';
import {MoreVerticalIcon} from 'assets';
import {Strings, Constants} from 'common';
import {isWeb} from 'helper';
import {returnUTCtoLocal} from 'utils/dateTimeHelper';
import {translate} from 'locale';
import {capitalize} from 'screens/tour-plan/helper';

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

const DailyPlanParties = ({
  title,
  gender,
  specialization,
  image,
  category,
  location,
  customStyle,
  showVisitPlan,
  visitData,
  showTile,
  onTilePress,
  onTileNamePress,
  partyType,
  isKyc,
  isCampaign,
  showCompletedTitle,
  showAdhocTitle,
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
   * Returns adhoc calls title  : Adhoc calls - x, x month
   * @returns the adhoc call title
   */
  const getAdhocCallTitle = () => {
    let adhocCallTitle = '';
    if (visitData.length > 0) {
      const month = returnUTCtoLocal(visitData[0].date, 'MMM');
      const adhocCallDates = visitData.reduce((accumulator, visit) => {
        if (visit?.isAdhoc) {
          const visitDate = returnUTCtoLocal(visit.date, 'D');
          const adhocList =
            accumulator === ''
              ? accumulator.concat(visitDate)
              : accumulator.concat(',').concat(visitDate);
          return adhocList;
        }
        return accumulator;
      }, '');

      if (adhocCallDates && adhocCallDates !== '') {
        adhocCallTitle = translate('tourPlan.monthly.adhocCalls', {
          data: `${adhocCallDates} ${month}`,
        });
      }
    }

    return adhocCallTitle;
  };

  /**
   * Function to render the visits planned - upcoming, today, missed, completed
   * @returns the list of visits metadata
   */
  const renderVisitData = () => {
    return (
      <View style={styles.visitsPanel}>
        <View style={styles.visitContainer}>
          {(visitData || []).map((visit, index) => {
            return (
              !visit.isAdhoc && (
                <DoctorVisitStates
                  key={index}
                  visitDate={returnUTCtoLocal(visit.date, 'D')}
                  visitMonth={returnUTCtoLocal(visit.date, 'MMM')}
                  visitState={visit.status}
                />
              )
            );
          })}
        </View>
        {showAdhocTitle && (
          <Label
            style={styles.labelContent}
            variant={LabelVariant.h6}
            textColor={themes.colors.orange[300]}
            title={getAdhocCallTitle()}
            type={'bold'}
          />
        )}
      </View>
    );
  };

  /**
   * Function to render extra space to show metadata for daily plan
   * @returns UI of tile
   */
  const renderTile = () => {
    return (
      <View style={[(isWeb() || showCompletedTitle) && styles.doctorTile]}>
        {(isWeb() || showCompletedTitle) && (
          <View style={styles.borderOuterContainer}>
            <View style={styles.borderInnerContainer} />
          </View>
        )}
        <View style={styles.tileContainer}>
          <View style={styles.tileRight}>
            {showCompletedTitle && (
              <Label
                variant={LabelVariant.h6}
                title={translate('tourPlan.daily.completed')}
                style={[styles.completed, isWeb() && styles.completedWeb]}
                type={'semiBold'}
              />
            )}
            <View style={isWeb() && styles.verticalIcon}>
              {isWeb() && (
                <TouchableOpacity onPress={onTilePress}>
                  <MoreVerticalIcon width={20} height={20} />
                </TouchableOpacity>
              )}
            </View>
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
      <View
        style={[
          styles.detailsContainer,
          customStyle && customStyle.detailsContainerCustom,
        ]}>
        <View style={styles.details}>
          {partyType === Constants.PARTY_TYPE.DOCTOR && (
            <View
              style={[
                styles.divisionContainer,
                customStyle && customStyle.divisionContainerCustom,
              ]}>
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
            style={[styles.image, customStyle && customStyle.imageCustom]}
            source={imageSrc}
            onError={OnErrorHandler()}
          />

          <View style={styles.nameContainer}>
            <View>
              <Label
                title={
                  partyType === Constants.PARTY_TYPE.DOCTOR
                    ? `${Strings.dr} ${capitalize(title)}`
                    : title
                }
                size={customStyle ? customStyle.titleSize : 17}
                onPress={() => {
                  onTileNamePress && onTileNamePress();
                }}
                type={'medium'}
                numberOfLines={2}
              />
            </View>
            <View style={customStyle && customStyle.nameContainerCustom}>
              <Label
                size={customStyle ? customStyle.subTitleSize : 12}
                title={`${capitalize(getSpecialization())}`}
                style={[
                  styles.capitalize,
                  getSpecialization() !== '' &&
                    customStyle &&
                    customStyle.specialization,
                ]}
                numberOfLines={1}
              />

              {location && (
                <>
                  {getSpecialization() !== '' && (
                    <Label
                      size={customStyle ? customStyle.subTitleSize : 18}
                      title={'|'}
                      style={styles.seperator}
                    />
                  )}
                  <Label
                    size={customStyle ? customStyle.subTitleSize : 18}
                    title={(location || {})
                      .map(spec => spec?.name || spec)
                      .join(', ')}
                    style={styles.capitalize}
                  />
                </>
              )}
            </View>
          </View>
        </View>
        {showVisitPlan && renderVisitData()}
      </View>
      {showTile && renderTile()}
    </View>
  );
};

DailyPlanParties.defaultProps = {
  showVisitPlan: false,
  showTile: false,
  gender: Constants.GENDER.MALE,
};

DailyPlanParties.propTypes = {
  title: PropTypes.string.isRequired,
  specialization: PropTypes.array,
  category: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.array,
  customStyle: PropTypes.object,
  showVisitPlan: PropTypes.bool,
  onTileNamePress: PropTypes.func,
};

export default DailyPlanParties;
