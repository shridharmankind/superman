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
    bottom: -60,
    left: -70,
    overflow: 'visible',
  },
  popImage: {
    width: 100,
    height: 100,
  },
  rightImages: {
    position: 'absolute',
    width: 100,
    zIndex: 1000,
    top: -60,
    right: -70,
    overflow: 'visible',
  },
  topImage: {},
  topRightImage: {marginLeft: themes.spacing(100)},
  topMiddleImage: {},
  topBottomImage: {},
});

export default styles;
