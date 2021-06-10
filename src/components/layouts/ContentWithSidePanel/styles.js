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
    width: 902.7,
    backgroundColor: theme.colors.white,
    borderRadius: 26.7,
    margin: 1,
    marginTop: 0,
    elevation: 1,
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
    width: 206.7,
    marginTop: theme.spacing(66.7),
    marginLeft: theme.spacing(21.3),
  },
});
