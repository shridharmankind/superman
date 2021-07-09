import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  circles: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  logo: {
    width: 133,
    height: 32,
    marginTop: 50,
    marginLeft: 59,
  },
  textStyle: {
    marginTop: 200,
    alignSelf: 'center',
  },
  downloadingTextStyle: {
    marginTop: 80,
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
    width: '100%',
    height: '100%',
  },
  noInternetTextStyle: {
    marginTop: 10,
    alignSelf: 'center',
  },
});

export default styles;
