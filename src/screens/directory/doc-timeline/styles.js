import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  timeline: {},
  timelineWrapper: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fcfcfc',
    paddingVertical: 21,
  },
  timelineYear: {
    textAlign: 'center',
    marginBottom: 19,
  },
  timelineDateContainer: {
    flex: 1,
    textAlign: 'justify',
    position: 'absolute',
    right: -20,
    borderColor: themes.colors.blue[200],
    borderWidth: 1,
    backgroundColor: themes.colors.white,
    borderRadius: 40,
    height: 40,
    width: 40,
    textAlignVertical: 'center',
    paddingVertical: 5,
    opacity: 1,
    alignItems: 'center',
  },
  timelineDateContainerMissed: {
    borderColor: '#aa0808',
  },
  timelineDateContainerCompleted: {
    borderColor: themes.colors.green[200],
  },
  timelineDate: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: themes.fonts.fontBold,
  },
  timelineDateMissed: {
    color: '#aa0808',
  },
  timelineDateCompleted: {
    color: themes.colors.green[200],
  },
  timelineMonth: {
    fontSize: 8,
    lineHeight: 14,
    fontFamily: themes.fonts.fontRegular,
  },
  timelineMonthMissed: {
    color: '#aa0808',
  },
  timelineMonthCompleted: {
    color: themes.colors.green[200],
  },
  timelineItem: {
    borderColor: themes.colors.grey[900],
    borderWidth: 0.5,
    borderStyle: 'solid',
    width: '87%',
    borderRadius: 13.3,
    marginHorizontal: 27,
  },
  timelineItemAccordion: {
    padding: 0,
  },
  timelineItemTitle: {
    fontSize: 10.7,
    fontFamily: themes.fonts.fontSemiBold,
  },
  itemDetailsTitle: {
    fontSize: 12.7,
    lineHeight: 13.3,
    color: '#3b3850',
    fontFamily: themes.fonts.fontSemiBold,
  },
  timelineItemIcon: {
    paddingLeft: 20,
    marginLeft: 20,
  },
  itemDetailsSection: {
    marginBottom: 10,
  },
});

export default styles;
