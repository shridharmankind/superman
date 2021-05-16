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
});

export default styles;
