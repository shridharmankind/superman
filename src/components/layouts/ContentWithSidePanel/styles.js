import {StyleSheet} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  contentContainer: {
    width: '67.7%',
    minHeight: 1120,
    padding: 40,
    borderRadius: 16,
    backgroundColor: theme.colors.white,
  },
  sidePanelContainer: {
    width: 310,
    marginTop: 64,
    paddingLeft: 32,
  },
});
