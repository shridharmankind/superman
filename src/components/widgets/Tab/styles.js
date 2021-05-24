import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  radioButtonTextContainer: {
    flex: 7,
    height: 30,
    justifyContent: 'center',
  },
  checkedButton: {
    borderBottomColor: theme.colors.primary,
    borderBottomWidth: 4,
    borderRadius: 0,
  },
  tabNotSelectedText: {
    fontFamily: theme.fonts.fontRegular,
  },
  tabSelectedText: {
    fontFamily: theme.fonts.fontBold,
  },
});

export default styles;
