import {StyleSheet} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
  },
  centerPanelContainer: {
    width: '70%',
    minHeight: 1120,
    backgroundColor: theme.colors.white,
    borderRadius: 16,
  },
  contentContainer: {
    flex: 1,
    padding: 40,
  },
  contentContainerHeader: {
    padding: 0,
  },
  headerContainer: {
    marginBottom: 8,
  },
  sidePanelContainer: {
    width: 310,
    marginTop: 64,
    marginLeft: 32,
  },
});
