import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftTabContainer: {
    width: '38%',
  },
  rightTabContainer: {
    justifyContent: 'flex-end',
    marginTop: 25,
  },
  buttonTabBar: {
    width: 200,
    marginHorizontal: 8,
    height: 45,
  },
});

export default styles;
