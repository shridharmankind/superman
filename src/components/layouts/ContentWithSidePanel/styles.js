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
    width: '75%',
    backgroundColor: theme.colors.white,
    borderRadius: 16,
  },
  contentContainer: {
    padding: 40,
  },
  contentContainerHeader: {
    padding: 0,
  },
  headerContainer: {
    marginBottom: 8,
  },
  sidePanelContainer: {
    width: '25%',
    marginTop: 64,
    paddingLeft: 32,
  },
});
