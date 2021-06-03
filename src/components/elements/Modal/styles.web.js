import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    backgroundColor: 'rgba(100,100,100, 0.7)',
    padding: 20,
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
});

export default styles;
