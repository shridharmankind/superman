import {StyleSheet} from 'react-native';
import theme from 'themes';

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
    marginTop: theme.spacing(20),
  },
  iconContainer: {
    marginLeft: theme.spacing(20),
    marginTop: theme.spacing(2),
  },
  mySelectedTourTextContainer: {
    minWidth: 80,
    width: 80,
  },
  selectedTourText: {
    color: theme.colors.black,
  },
  modalText: {
    paddingVertical: theme.spacing(8),
    color: theme.colors.grey[200],
  },
  modalTextSelected: {
    paddingVertical: theme.spacing(5),
    color: theme.colors.primary,
  },
  modalTitleText: {
    paddingVertical: theme.spacing(5),
    color: theme.colors.black,
  },
  contentView: {
    justifyContent: 'flex-start',
  },
  modalPosition: {
    marginTop: '12%',
    marginLeft: '16%',
    width: 333.3,
    height: 590.7,
  },
  modalHeightHalf: {
    height: 295.35,
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
