import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  container: {
    minWidth: 250,
    paddingRight: 20,
    borderRightColor: themes.colors.disabled,
    borderRightWidth: 2,
    marginRight: 20,
  },
  dropDownContainer: {
    borderWidth: 1,
    borderColor: themes.colors.grey,
    borderRadius: 10,
    padding: 10,
    margin: 0,
    height: 30,
    alignContent: 'center',
    backgroundColor: 'transparent',
  },
  offset: {
    top: 120,
    left: 20,
  },
  picker: {
    shadowColor: themes.colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default styles;
