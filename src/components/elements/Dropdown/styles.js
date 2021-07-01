import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  backgroundLayout: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    backgroundColor: themes.colors.black,
    left: 0,
    top: 0,
    zIndex: 1,
  },
  container: {
    minWidth: 250,
    paddingRight: themes.spacing(20),
    borderRightColor: themes.colors.disabled,
    borderRightWidth: 2,
    marginRight: themes.spacing(20),
    position: 'relative',
    zIndex: 2,
  },
  pickerContainer: {
    borderRadius: 10,
    position: 'absolute',
    top: 50,
    width: '100%',
    backgroundColor: themes.colors.white,
    zIndex: 2,
    padding: themes.spacing(15),
    alignContent: 'center',
    borderColor: themes.colors.grey[100],
    borderWidth: 1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 3,
    height: 400,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: themes.colors.primary,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: themes.spacing(15),
    height: 40,
  },
  pickerLabel: {
    paddingVertical: 5,
    position: 'relative',
    zIndex: 2,
    borderBottomColor: themes.colors.grey[300],
    borderBottomWidth: 1,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  sortDown: {marginTop: themes.spacing(-10)},
});

export default styles;
