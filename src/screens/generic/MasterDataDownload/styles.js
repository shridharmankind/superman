import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progress: {
    marginTop: 40,
    alignSelf: 'center',
  },
  logo: {
    width: 133,
    height: 32,
    marginTop: 50,
    marginLeft: 59,
  },
  textStyle: {
    marginTop: 150,
    alignSelf: 'center',
  },
  downloadingTextStyle: {
    marginTop: 70,
    alignSelf: 'center',
  },
  downloadTextStyle: {
    marginLeft: 10,
    lineHeight: 20,
  },
  downloadIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 70,
    marginLeft: 59,
  },
  imageBg: {
    width: 1333,
    height: 800,
  },
});

export default styles;
