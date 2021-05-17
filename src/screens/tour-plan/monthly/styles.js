import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  selectedTour: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    width: 250,
    minWidth: 250,
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
  modalText: {
    fontSize: 16,
    fontFamily: theme.fonts.fontRegular,
    paddingVertical: 10,
    color: theme.colors.primary,

  },
  modalTitleText: {
    color: theme.colors.black,
    fontFamily: theme.fonts.fontBold,
  },
  contentView: {
    // alignItems: 'center',
    justifyContent: 'flex-start',
  },

});

export default styles;
