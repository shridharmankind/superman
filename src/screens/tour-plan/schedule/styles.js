import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGrayishBlue,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: '100%',
    padding: 20,
  },
  leftPanel: {
    flexGrow: 1,
    height: '100%',
  },
  mainPanel: {
    flex: 1,
    flexGrow: 7,
    backgroundColor: theme.colors.white,
    borderRadius: 20,
    height: '100%',
    paddingVertical: 5,
    paddingHorizontal: 30,
  },
  header: {
    backgroundColor: theme.colors.grayishBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightPanel: {
    flexGrow: 1,
    height: '100%',
  },
  settingScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  leftTabContainer: {
    width: '54%',
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
