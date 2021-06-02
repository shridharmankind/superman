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
    marginLeft: '20%',
  },
  tourPlanViewContainer: {
    marginTop: theme.spacing(15.5),
  },
});

export default styles;
