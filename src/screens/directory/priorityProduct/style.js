import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  headerProduct: {
    flexDirection: 'row',
  },
  cardMainContainer: {
    flexDirection: 'row',
    width: '50%',
  },
  cardHeadContainer: {
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  cardViewHeight: {
    maxHeight: 350,
  },
  cardViewAllHeight: {
    maxHeight: 430,
  },
  footer: {
    fontSize: 12.7,
    fontFamily: theme.fonts.fontSemiBold,
    color: theme.colors.primary,
  },
  cardContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.grey[400],
    borderWidth: 1,
    marginRight: theme.spacing(13.7),
    marginBottom: theme.spacing(10),
    padding: theme.spacing(10.7, 13.3),
    borderRadius: 9.3,
    width: '95%',
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardHeaderTitle: {
    flexDirection: 'column',
    flexGrow: 5,
  },
  mainHeader: {
    marginBottom: theme.spacing(14),
    fontStyle: 'normal',
  },
  labelTitle: {
    fontStyle: 'normal',
    fontFamily: theme.fonts.fontBold,
  },
  labelSubTitle: {
    fontStyle: 'normal',
    paddingTop: theme.spacing(5),
    textAlign: 'center',
  },
  powerIcon: {
    flexDirection: 'column',
  },
  power: {
    backgroundColor: '#2293cb',
    borderRadius: 50,
    padding: theme.spacing(9),
    marginTop: theme.spacing(2),
  },
  ratioClass: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  gxClass: {
    flexDirection: 'row',
    flexGrow: 1,
  },
  focus: {
    flexDirection: 'column',
  },
  focusLabel: {
    fontFamily: theme.fonts.fontBold,
    backgroundColor: theme.colors.grey[1300],
    textAlign: 'center',
    borderRadius: 20,
    paddingHorizontal: theme.spacing(6),
    paddingVertical: theme.spacing(3),
  },
  priorityLabel: {
    fontSize: 8.7,
    fontFamily: theme.fonts.fontBold,
    color: theme.colors.grey[200],
    textAlign: 'center',
    backgroundColor: theme.colors.grey[1000],
    borderRadius: 50,
    paddingHorizontal: theme.spacing(5),
    paddingVertical: theme.spacing(3),
    marginLeft: theme.spacing(5),
  },
  cardHeaderRightTitle: {
    flexDirection: 'column',
  },
  cardDetail: {
    flexDirection: 'row',
    paddingBottom: theme.spacing(10),
  },
  labelSubHeader: {
    fontStyle: 'normal',
  },
  progressText: {
    fontSize: 22,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontBold,
  },
  cardBackground: {
    backgroundColor: theme.colors.orange[400],
  },
  progressLightText: {
    fontSize: 22,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontRegular,
  },
  arrowUp: {
    marginTop: theme.spacing(12),
  },
  percentageText: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(-2),
    fontSize: 14,
    fontStyle: 'normal',
    color: theme.colors.green[200],
    fontFamily: theme.fonts.fontRegular,
  },
  gxLabel: {
    color: theme.colors.grey[1100],
    marginTop: theme.spacing(12),
  },
  progreesBar: {
    paddingBottom: theme.spacing(8),
  },
  descriptionText: {
    fontStyle: 'normal',
  },
  openMainTask: {
    width: '37%',
  },
});

export default styles;
