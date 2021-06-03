import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  tab: {
    flex: 1,
  },
  tabText: {
    color: theme.colors.primary,
    textAlign: 'center',
  },
  tabBarContainer: {
    flexDirection: 'row',
    width: theme.spacing(190),
  },
});

export default styles;
