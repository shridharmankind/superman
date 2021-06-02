import {StyleSheet, Dimensions} from 'react-native';
import theme from 'themes';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  dropDownsContainer: {
    flexDirection: 'row',
  },
  tourPlanContainer: {
    width: '90%',
    alignItems: 'flex-start',
  },
  myPlanContainer: {
    width: '10%',
    alignItems: 'flex-end',
  },
  selectedTour: {
    flexDirection: 'row',
    marginTop: 20,
  },
  iconContainer: {
    marginLeft: 20,
    marginTop: 2,
  },
  mySelectedTourTextContainer: {
    minWidth: 80,
    width: 80,
  },
  selectedTourText: {
    color: theme.colors.black,
  },
  modalText: {
    paddingVertical: 5,
    color: theme.colors.grey[200],
  },
  modalTextSelected: {
    paddingVertical: 5,
    color: theme.colors.primary,
  },
  modalTitleText: {
    paddingVertical: 5,
    color: theme.colors.black,
  },
  contentView: {
    justifyContent: 'flex-start',
  },
  modalPosition: {
    marginTop: '12%',
    marginLeft: `${((windowWidth * 0.24) / windowWidth) * 100}%`,
  },
  dropdownLabel: {
    fontFamily: theme.fonts.fontRegular,
    color: theme.colors.grey[900],
  },
  tourPlanViewContainer: {
    marginTop: theme.spacing(15.5),
  },
});

export default styles;
