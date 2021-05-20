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
    top: 60,
    width: '100%',
    backgroundColor: themes.colors.white,
    zIndex: 2,
    padding: 20,
    alignContent: 'center',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 10,
  },
  selectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderColor: themes.colors.grey[100],
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  pickerLabel: {
    paddingVertical: 5,
    position: 'relative',
    zIndex: 2,
  },
});

export default styles;
