import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 50,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
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
    justifyContent: 'center',
  },
  title: {
    width: '80%',
  },
  close: {
    alignItems: 'flex-end',
    width: '20%',
  },
  closeIcon: {
    fontFamily: theme.fonts.fontRegular,
  },
});

export default styles;
