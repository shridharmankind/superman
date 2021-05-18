import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.roundness,
    paddingHorizontal: 20,
    paddingVertical: 10,
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: 500,
    height: 500,
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
});

export default styles;
