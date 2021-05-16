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
    padding: 40,
  },
  leftPanel: {
    flexGrow: 1,
    height: '100%',
  },
  mainPanel: {
    flex: 1,
    flexGrow: 7,
    backgroundColor: theme.colors.white,
    borderRadius: 40,
    height: '100%',
    margin: 20,
    padding: 20,
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
});

export default styles;
