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
  modalPositionWeb: {
    marginTop: theme.spacing(-100),
    marginLeft: theme.spacing(180),
    height: 535,
  },
  modalPositionWebHalf: {
    marginTop: theme.spacing(-350),
    marginLeft: theme.spacing(180),
    height: 267.5,
  },
  modalHeightHalf: {
    height: 295.35,
  },
  dropdownLabel: {
    fontFamily: theme.fonts.fontRegular,
    color: theme.colors.grey[900],
  },
  tourPlanViewContainer: {
    marginTop: theme.spacing(2),
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
  chip: {
    fontSize: 9.3,
    lineHeight: 10.7,
    paddingHorizontal: theme.spacing(0),
  },
  submittedChip: {
    color: theme.colors.green[400],
  },
  tourPlanOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chipContainer: {
    height: 21.3,
    marginLeft: theme.spacing(20),
  },
  lockIcon: {
    marginBottom: theme.spacing(5),
    marginLeft: theme.spacing(4),
  },
  dueDateChip: {
    color: theme.colors.red[600],
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarContainer: {
    position: 'absolute',
    justifyContent: 'center',
    top: 20,
    left: -29,
    zIndex: 9999,
    width: 500,
  },
  calendar: {
    borderColor: theme.colors.borderColor,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.9,
    shadowRadius: 20,
    elevation: 3,
  },
  swapDate: {
    paddingVertical: theme.spacing(10),
    borderWidth: 1,
    borderColor: theme.colors.grey[300],
    marginBottom: theme.spacing(20),
  },
  swapDateText: {
    paddingHorizontal: theme.spacing(10),
  },
  swapContent: {
    paddingVertical: theme.spacing(50),
  },
  notSubmittedChip: {
    color: theme.colors.black,
  },
  modalHeight: {
    height: 'auto',
    paddingBottom: theme.spacing(0),
  },
});

export default styles;
