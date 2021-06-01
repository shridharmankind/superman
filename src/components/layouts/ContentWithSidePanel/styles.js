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
    // width: '67.70%',
    width: 902.7,
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
    // width: '15.5%',
    width: 206.7,
    marginTop: theme.spacing(66.7),
    marginLeft: theme.spacing(21.3),
  },
});
