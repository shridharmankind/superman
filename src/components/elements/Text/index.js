import * as React from 'react';
import {Text} from 'react-native-paper';
import theme from 'themes';

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
  disabled,
  ...props
}) => {
  return (
    <Text
      testID={testID}
      style={[
        {fontFamily: theme.fonts[type].fontFamily, fontSize: size},
        {...style},
      ]}
      {...props}>
      {title}
    </Text>
  );
};

export default CustomText;
