import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  dailyViewContainer: {
    alignSelf: 'stretch',
    borderRightWidth: 1,
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    minHeight: 80,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    alignContent: 'space-between',
  },
  bottomContent: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
});

export default styles;
