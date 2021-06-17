import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    borderRadius: 40,
  },
  title: {
    color: themes.colors.primary,
  },
  button: {
    backgroundColor: themes.colors.primary,
    paddingHorizontal: themes.spacing(40),
    paddingVertical: themes.spacing(12),
    flex: 0,
    maxWidth: 250,
    color: themes.colors.white,
    position: 'absolute',
    bottom: 50,
    left: 30,
  },
  bottomTextContent: {
    position: 'absolute',
    bottom: 110,
    left: 30,
  },
  leftBottomImage: {
    position: 'absolute',
    width: 100,
    zIndex: 1000,
    bottom: -38,
    left: -75,
    overflow: 'visible',
  },
  popImage: {
    width: 112,
    height: 112,
  },
  rightImages: {
    position: 'absolute',
    width: 200,
    top: -50,
    right: -150,
    overflow: 'visible',
  },
  topImage: {width: 80, height: 80},
  topRightImage: {width: 176, height: 176, marginLeft: themes.spacing(90)},
  topMiddleImage: {
    width: 68,
    height: 68,
    marginTop: themes.spacing(-50),
    marginLeft: themes.spacing(15),
  },
  topBottomImage: {width: 160, height: 160, marginTop: themes.spacing(30)},
});

export default styles;
