import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  timeline: {
    maxHeight: 350,
  },
  timelineWrapper: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fcfcfc',
    paddingVertical: 21,
    paddingLeft: 21,
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
    borderColor: themes.colors.primary,
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
    color: themes.colors.primary,
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
    borderRadius: 10,
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
    lineHeight: 14,
    color: '#3b3850',
    fontFamily: themes.fonts.fontSemiBold,
  },
  timelineItemIcon: {
    marginLeft: 18,
  },
  itemDetailsSection: {
    marginBottom: 10,
  },
  itemDetailsContainer: {
    marginLeft: -47,
    paddingTop: 13,
  },
  itemPlain: {
    paddingVertical: 10,
    paddingHorizontal: 21.3,
    flexDirection: 'row',
  },
  itemPlainIcon: {
    marginRight: 10,
  },
  timelineScrollContainer: {
    flexDirection: 'row',
  },
  timelineDots: {
    position: 'absolute',
    top: '50%',
    transform: [{rotate: '270deg'}],
  },
  timelineDotsContent: {
    display: 'flex',
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  timelineDot: {
    height: 8,
    width: 8,
    backgroundColor: '#BFBDD5',
    borderRadius: 4,
    marginTop: 8,
    marginRight: 8,
  },
  timelineDotSelected: {
    fontFamily: themes.fonts.fontRegular,
    fontSize: 10.7,
    paddingVertical: 2.3,
    paddingHorizontal: 7,
    backgroundColor: themes.colors.primary,
    color: themes.colors.white,
    lineHeight: 18.7,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: 8,
  },
});

export default styles;
