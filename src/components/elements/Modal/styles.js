import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    overflow: 'hidden',
  },
  modalView: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.roundness,
    paddingHorizontal: theme.spacing(20),
    paddingVertical: theme.spacing(10),
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: theme.spacing(500),
    height: theme.spacing(500),
  },
  titleView: {
    flexDirection: 'row',
  },
  title: {
    width: '95%',
  },
  close: {
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '5%',
  },
  closeIcon: {
    fontFamily: theme.fonts.fontRegular,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    padding: theme.spacing(20),
  },
});

export default styles;
