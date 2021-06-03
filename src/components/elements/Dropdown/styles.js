import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  container: {
    minWidth: 250,
    paddingRight: 20,
    borderRightColor: themes.colors.disabled,
    borderRightWidth: 2,
    marginRight: 20,
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
    padding: 15,
    alignContent: 'center',
    borderColor: themes.colors.grey[100],
    borderWidth: 1,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 3,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: themes.colors.primary,
    backgroundColor: 'transparent',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 7,
    paddingHorizontal: 15,
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
  sortDown: {marginTop: -10},
});

export default styles;
