import {StyleSheet} from 'react-native';
import theme from 'themes';

const borderColor = theme.colors.grey[100];

const styles = StyleSheet.create({
  flexFullSpace: {
    flex: 1,
  },
  cellDataContainer: {
    justifyContent: 'space-around',
  },
  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingVertical: theme.spacing(5),
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
    height: 89,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    flex: 1,
    borderTopColor: borderColor,
    borderLeftColor: borderColor,
    flexDirection: 'row',
  },
  cellBorder: {
    padding: theme.spacing(8),
    paddingLeft: theme.spacing(9),
    flex: 1,
  },
  highVisitBar: {
    width: 5,
    backgroundColor: theme.colors.orange[300],
  },
  cellHeader: {
    flexDirection: 'row',
    height: 60,
  },
  cellFooter: {
    flexDirection: 'row',
    alignItems: 'center',
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
  locationLabelText: {
    paddingHorizontal: theme.spacing(2),
    alignContent: 'center',
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
});

export default styles;
