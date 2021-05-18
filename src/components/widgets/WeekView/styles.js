import {StyleSheet} from 'react-native';
import theme from 'themes';

const borderColor = theme.colors.grey[100];

const styles = StyleSheet.create({
  flexFullSpace: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 2,
  },
  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  rowContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderColor,
  },
  row: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    textAlign: 'center',
  },
  cellContainer: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    borderColor,
  },
  cellHeader: {
    flexDirection: 'row',
    padding: 5,
    minHeight: 60,
  },
  cellFooter: {
    flexDirection: 'row',
    padding: 5,
  },
  lastCell: {
    borderBottomWidth: 1,
    borderColor,
  },
  textCenterAlign: {
    textAlign: 'center',
  },
  verticalHeader: {
    flex: 0.3,
    paddingHorizontal: 3,
  },
  flexCenterView: {
    justifyContent: 'center',
  },
  flexSpaceBetweenView: {
    justifyContent: 'space-between',
  },
});

export default styles;
