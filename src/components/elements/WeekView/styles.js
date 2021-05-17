import {StyleSheet} from 'react-native';
import theme from 'themes';

const border_color = theme.colors.grey[100];

const styles = StyleSheet.create({
  flexFullSpace: {
    flex: 1,
  },
  weekViewContainer: {
    flex: 1,
    padding: 2,
  },
  headerContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 1,
  },

  rowConatiner: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: border_color,
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
    borderColor: border_color,
  },
  cellHeader: {
    flexDirection: 'row',
    padding: 5,
  },
  cellFooter: {
    flexDirection: 'row',
    padding: 5,
  },
  lastCell: {
    borderBottomWidth: 1,
    borderColor: border_color,
  },
  textCenterAlign: {
    textAlign: 'center',
  },
  VerticalHeader: {
    flex: 0.3,
  },

  flexCenterView: {
    justifyContent: 'center',
  },
  flexSpaceBetweenView: {
    justifyContent: 'space-between',
  },
});

export default styles;
