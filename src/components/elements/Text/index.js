import * as React from 'react';
import {Text} from 'react-native';
import {useTheme} from 'react-native-paper';

/**
 * Custom text component using Text from react-native-paper.
 * This serves the purpose to make the use of text consistent throughtout the app
 * @param {String} title title of text
 * @param {Number} size size of text
 * @param {String} type font type of the text ,  can be regular|bold|semiBold,default is regular
 * @param {String} testID date test id
 * @param {Object} style custom style of text
 */
const CustomText = ({
  title,
  testID,
  style,
  size = 18,
  type = 'regular',
  ...props
}) => {
  const {fonts} = useTheme();
  return (
    <Text
      style={[{fontFamily: fonts[type], fontSize: size}, {...style}]}
      {...props}>
      {title}
    </Text>
  );
};

export default CustomText;
