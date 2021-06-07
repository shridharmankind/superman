import React from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import {Frequency, Label} from 'components/elements';
import themes from 'themes';
import styles from './styles';
import {DoctorVisitStates} from 'components/widgets';
import {MoreVerticalIcon} from 'assets';
import {Strings, Constants} from 'common';

/**
 * Custom doctor details component using Chip from react-native-paper.
 * This serves the purpose to make the use of doctor details consistent throughtout the app
 * @param {String} title text of the chip
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
  isTicked,
  showTile,
  onTilePress,
  onTileNamePress,
  alreadyVisited,
  frequency,
  selectedVistedFrequency,
  partyType,
  isKyc,
  ...props
}) => {
  /**
   *  Renders Visited or non visited frequency CHicklet
   * @param {JSX} Component
   * @param {Number} length
   * @returns Component
   */
  const renderFrequencyChicklets = (Component, length) => {
    let frequencyComp = [];
    for (let i = 0; i < length; i++) {
      frequencyComp.push(<React.Fragment key={i}>{Component}</React.Fragment>);
    }
    return frequencyComp;
  };

  /**
   * Function to render the visits planned - upcoming, today, missed, completed
   * @returns the list of visits metadata
   */
  const renderVisitData = () => {
    return (
      <View style={styles.visitContainer}>
        {(visitData || []).map((visit, index) => (
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

  const renderTile = () => {
    return (
      <View style={styles.doctorTile}>
        <View style={styles.borderOuterContainer}>
          <View style={styles.borderInnerContainer} />
        </View>
        <View style={styles.tileContainer}>
          <View style={styles.tileRight}>
            <TouchableOpacity onPress={onTilePress}>
              <MoreVerticalIcon width={20} height={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
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
                <View
                  style={[
                    styles.divisionItem,
                    {
                      backgroundColor: getDivisionColor(
                        Constants.DIVISION_COLOR.KYC,
                      ),
                    },
                  ]}>
                  <Label
                    style={styles.divisionText}
                    title={Strings.kyc}
                    size={customStyle ? customStyle.divisionSize : 9}
                    type={'bold'}
                  />
                </View>
              )}
              {category && (
                <View
                  style={[
                    styles.divisionItem,
                    {backgroundColor: getDivisionColor(category)},
                  ]}>
                  <Label
                    style={styles.divisionText}
                    title={category}
                    size={customStyle ? customStyle.divisionSize : 9}
                    type={'bold'}
                  />
                </View>
              )}
            </View>
          )}
          <Image
            style={[styles.image, customStyle && customStyle.imageCustom]}
            source={require('../../../assets/images/avatar.png')}
          />
          <View style={styles.nameContainer}>
            <Label
              title={
                partyType === Constants.PARTY_TYPE.DOCTOR
                  ? `${Strings.dr} ${title}`
                  : title
              }
              size={customStyle ? customStyle.titleSize : 17}
              onPress={() => {
                onTileNamePress && onTileNamePress();
              }}
              type={'medium'}
            />
            <View style={customStyle && customStyle.nameContainerCustom}>
              <Label
                size={customStyle ? customStyle.subTitleSize : 12}
                title={(specialization || [])
                  .map(spec => spec?.name || spec)
                  .join(', ')}
                style={customStyle && customStyle.specialization}
              />

              {location && (
                <>
                  <Label
                    size={customStyle ? customStyle.subTitleSize : 18}
                    title={'|'}
                    style={styles.seperator}
                  />
                  <Label
                    size={customStyle ? customStyle.subTitleSize : 18}
                    title={location}
                  />
                </>
              )}
            </View>
          </View>
        </View>
        {showFrequencyChiclet && (
          <View style={styles.frequecyContainer}>
            {renderFrequencyChicklets(
              <Frequency visited />,
              selectedVistedFrequency,
            )}
            {renderFrequencyChicklets(
              <Frequency />,
              frequency - selectedVistedFrequency,
            )}
          </View>
        )}
        {isTicked && (
          <View style={styles.checkContainer}>
            <Icon
              name="check-circle"
              size={16}
              color={themes.colors.checkCircleBlue}
            />
          </View>
        )}
        {showVisitPlan && renderVisitData()}
      </View>
      {showTile && renderTile()}
    </View>
  );
};

const getDivisionColor = division => {
  switch (division && division.toLowerCase()) {
    case Constants.DIVISION_COLOR.KYC:
      return themes.colors.orange[100];
    case Constants.DIVISION_COLOR.A_PLUS:
      return themes.colors.darkBlue;
    case Constants.DIVISION_COLOR.A:
      return themes.colors.yellow[300];
    case Constants.DIVISION_COLOR.B:
      return themes.colors.lightBlue;
    case Constants.DIVISION_COLOR.C:
      return themes.colors.grey[1200];
    default:
      return themes.colors.transparent;
  }
};

DoctorDetails.defaultProps = {
  showFrequencyChiclet: true,
  showVisitPlan: false,
  selected: false,
  division: '',
  showTile: false,
};

DoctorDetails.propTypes = {
  title: PropTypes.string.isRequired,
  specialization: PropTypes.array,
  category: PropTypes.string,
  image: PropTypes.string,
  location: PropTypes.string,
  selected: PropTypes.bool,
  testID: PropTypes.string,
  onPress: PropTypes.func,
  customStyle: PropTypes.object,
  showFrequencyChiclet: PropTypes.bool,
  showVisitPlan: PropTypes.bool,
  isTicked: PropTypes.bool,
  onTileNamePress: PropTypes.func,
};

export default DoctorDetails;
