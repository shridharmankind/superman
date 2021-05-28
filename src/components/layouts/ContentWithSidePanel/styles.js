import {StyleSheet} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  centerPanelContainer: {
    flex: 1,
    width: '67.65%',
    backgroundColor: theme.colors.white,
    borderRadius: 26.7,
  },
  contentContainer: {
    padding: 26.7,
  },
  contentContainerHeader: {
    padding: 0,
  },
  headerContainer: {
    marginBottom: 8,
  },
  sidePanelContainer: {
    width: '15.5%',
    marginTop: theme.spacing(40),
    paddingLeft: theme.spacing(21.3),
  },
});
