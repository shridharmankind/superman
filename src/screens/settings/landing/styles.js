import {StyleSheet} from 'react-native';
import theme from 'themes';
const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-between',
    fontSize: 10,
  },
  mainTabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: theme.spacing(21.3),
    paddingRight: theme.spacing(26.7),
    paddingTop: theme.spacing(32),
  },
  heading: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  syncCompletionHeading: {
    flexDirection: 'row',
    width: '100%',
  },
  subHeading: {
    flexDirection: 'row',
    width: '100%',
    padding: theme.spacing(5),
    marginTop: theme.spacing(10),
  },
  buttonTabBar: {
    width: 165,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  buttonTabBarText: {
    fontSize: 12,
  },
  syncHeading: {
    marginTop: theme.spacing(50),
    marginBottom: theme.spacing(10),
  },
  warningText: {
    color: 'red',
    backgroundColor: 'red',
  },
});

export default styles;
