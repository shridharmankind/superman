import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  selectedTour: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    marginLeft: 80,
    marginRight: 20,
  },
  selectedTourText: {
    fontFamily: theme.fonts.fontBold,
    color: theme.colors.black,
    fontSize: 16,
  },
  modalTitleText: {
    fontSize: 16,
    color: theme.colors.primary,
    fontFamily: theme.fonts.fontBold,
  },
});

export default styles;
