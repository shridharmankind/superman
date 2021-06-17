import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  timeline: {
    maxHeight: 350,
  },
  timelineWrapper: {
    borderColor: themes.colors.grey[1900],
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: themes.colors.grey[2000],
    paddingVertical: themes.spacing(21),
    paddingLeft: themes.spacing(21),
  },
  timelineYear: {
    textAlign: 'center',
    marginBottom: themes.spacing(19),
  },
  timelineDateContainer: {
    flex: 1,
    textAlign: 'justify',
    position: 'absolute',
    right: themes.spacing(-20),
    borderColor: themes.colors.primary,
    borderWidth: 1,
    backgroundColor: themes.colors.white,
    borderRadius: 40,
    height: 40,
    width: 40,
    textAlignVertical: 'center',
    paddingVertical: themes.spacing(5),
    opacity: 1,
    alignItems: 'center',
  },
  timelineDateContainerMissed: {
    borderColor: themes.colors.red[500],
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
    color: themes.colors.red[500],
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
    color: themes.colors.red[500],
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
    marginHorizontal: themes.spacing(27),
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
    color: themes.colors.grey[2100],
    fontFamily: themes.fonts.fontSemiBold,
  },
  timelineItemIcon: {
    marginLeft: themes.spacing(18),
  },
  itemDetailsSection: {
    marginBottom: themes.spacing(10),
  },
  itemDetailsContainer: {
    marginLeft: themes.spacing(-47),
    paddingTop: themes.spacing(13),
    paddingRight: themes.spacing(10),
    // maxHeight: 200,
    // overflow: 'scroll',
  },
  itemPlain: {
    paddingVertical: themes.spacing(10),
    paddingHorizontal: themes.spacing(21.3),
    flexDirection: 'row',
  },
  itemPlainIcon: {
    marginRight: themes.spacing(10),
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
    backgroundColor: themes.colors.grey[2200],
    borderRadius: 4,
    marginTop: themes.spacing(5),
    marginRight: themes.spacing(8),
  },
  timelineDotSelected: {
    fontFamily: themes.fonts.fontRegular,
    fontSize: 10,
    paddingVertical: themes.spacing(2.3),
    paddingHorizontal: themes.spacing(7),
    backgroundColor: themes.colors.primary,
    color: themes.colors.white,
    lineHeight: 14,
    display: 'flex',
    alignItems: 'center',
    borderRadius: 10,
    marginRight: themes.spacing(8),
  },
  timelineHighlitedItem: {
    marginBottom: themes.spacing(10),
    maxWidth: '43.5%',
  },
});

export default styles;
