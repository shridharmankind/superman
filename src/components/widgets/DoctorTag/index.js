import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import styles from './styles';
import themes from 'themes';
import {Constants} from 'common';

//defines type of divisions doctor have
export const DivisionType = Constants.DIVISION_COLOR;
/**
 *
 * @param {Array|| string} customStyle prop
 * @param {string} division type of doctor (kyc, A+ ,A, B or C)
 * @param {string} title content
 * @param {string} title to display the content of tag
 * @param {string} labelVariant labelVariant for label tag
 * @returns Doctor Tag component on basis of division type
 */
const DoctorTag = ({
  customStyle,
  division,
  title = division,
  textColor = themes.colors.white,
  labelVariant = LabelVariant.label,
}) => {
  return (
    <View
      style={[
        styles.container,
        {backgroundColor: getDivisionColor(division)},
        customStyle,
      ]}>
      <Label
        style={styles.labelContent}
        variant={labelVariant}
        textColor={textColor}
        title={title}
        type={'bold'}
        testID={`doctorTag-${title}-${division}-test`}
      />
    </View>
  );
};

/**
 *
 * @param {String} division
 * @returns  the color on basis of division type
 */
const getDivisionColor = division => {
  switch (division && division.toLowerCase()) {
    case Constants.DIVISION_COLOR.KYC:
    case Constants.DIVISION_COLOR.CAMPAIGN:
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
DoctorTag.propTypes = {
  title: PropTypes.any,
  textColor: PropTypes.string,
  labelVariant: PropTypes.string,
  customStyle: PropTypes.any,
};

export default DoctorTag;
