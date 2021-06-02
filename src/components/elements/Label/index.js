import * as React from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native';
import theme from 'themes';
import styles from './styles';

/** typography types */
export const LabelVariant = Object.entries(theme.typography).reduce(
  (acc, item) => Object.assign(acc, {[item[0]]: item[0]}),
  {},
);

/**
 * Label component using Text from react-native.
 * This serves the purpose to make the use of text consistent throughtout the app
 * @param {String} title title of text
 * @param {Number} size size of text
 * @param {String} type font type of the text ,  can be regular|bold|semiBold,default is regular
 * @param {String} testID date test id
 * @param {Object} style custom style of text
 */
const Label = ({
  title,
  testID,
  style,
  size = 18,
  textColor = theme.colors.grey[200],
  isUpperCase = false,
  type,
  variant,
  ...props
}) => {
  return (
    <Text
      testID={testID}
      style={[
        size && {fontSize: size},
        type && {fontFamily: getFontFamily(type)},

        variant && {...theme.typography[variant]},
        textColor && {color: textColor},
        isUpperCase && styles.upperCase,
        style,
      ]}
      {...props}>
      {title || props.children || ''}
    </Text>
  );
};

const getFontFamily = type => {
  switch (type) {
    case 'bold':
      return theme.fonts.fontBold;
    case 'regular':
      return theme.fonts.fontRegular;
    case 'semiBold':
      return theme.fonts.fontSemiBold;
    case 'medium':
      return theme.fonts.fontMedium;
    default:
      return theme.fonts.fontRegular;
  }
};
Label.propTypes = {
  type: PropTypes.oneOf(['bold', 'regular', 'semiBold']),
  title: PropTypes.any,
  size: PropTypes.number,
  testID: PropTypes.string,
};
export default Label;
