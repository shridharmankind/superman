import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flexFullSpace: {
    flex: 1,
  },
  weekViewContainer: {
    flex: 1,
    padding: '5%',
  },
  header: {
    justifyContent: 'center',
    flexDirection: 'row',
  },

  rowConatiner: {
    flex: 1,
    borderRightWidth: 1,
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
  },
  textCenterAlign: {
    textAlign: 'center',
  },
  VerticalHeader: {
    flex: 0.3,
  },
  upperCaseText: {
    textTransform: 'uppercase',
  },
  flexCenterView: {
    display: 'flex',
    justifyContent: 'center',
  },
  flexSpaceBetweenView: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

export default styles;
