import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  dropDownsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tourPlanContainer: {},
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
    width: 441.3,
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
    marginTop: theme.spacing(15),
  },
  stpLegend: {
    paddingLeft: theme.spacing(56),
  },
  congratsContent: {
    marginVertical: theme.spacing(20),
  },

  actionButtonGroup: {
    flexDirection: 'row',
  },
  saveBtn: {marginRight: theme.spacing(12)},
  actionBtn: {width: 165.3},
  submittedChip: {
    fontSize: 9.3,
    lineHeight: 10.7,
    color: theme.colors.green[400],
    paddingHorizontal: theme.spacing(5),
  },
  tourPlanOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipContainer: {
    height: 21.3,
    marginLeft: theme.spacing(32),
  },
  lockIcon: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(4),
  },
});

export default styles;
