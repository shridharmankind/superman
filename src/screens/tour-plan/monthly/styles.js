import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
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
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    marginLeft: 10,
    marginRight: 20,
  },
  selectedTourTextContainer: {
    minWidth: 220,
    width: 220,
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
});

export default styles;
