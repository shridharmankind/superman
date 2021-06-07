import {StyleSheet} from 'react-native';
import theme from 'themes';

const borderColor = theme.colors.grey[100];

const styles = StyleSheet.create({
  flexFullSpace: {
    flex: 1,
  },
  container: {
    padding: 2,
  },
  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
  },
  rowContainer: {
    borderRightWidth: 1,
    borderColor,
  },
  row: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    textAlign: 'center',
  },
  cellContainer: {
    minHeight: 88.7,
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
  textAlignStart: {
    alignSelf: 'flex-start',
  },
  verticalHeader: {
    flex: 0.25,
    minWidth: 18,
  },
  flexCenterView: {
    justifyContent: 'center',
  },
  flexSpaceBetweenView: {
    justifyContent: 'space-between',
  },
});

export default styles;
