import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  tabMainContainer: {
    flexDirection: 'row',
  },
  productMainContainer: {
    flexDirection: 'column',
    width: '63%',
  },
  headerProduct: {
    flexDirection: 'row',
  },
  cardMainContainer: {
    flexDirection: 'row',
  },
  cardContainer: {
    borderStyle: 'solid',
    borderColor: theme.colors.grey[400],
    borderWidth: 1,
    width: '47%',
    padding: theme.spacing(8.7),
    marginRight: theme.spacing(13.7),
    borderRadius: 9.3,
  },
  cardHeader: {
    flexDirection: 'row',
  },
  cardHeaderTitle: {
    flexDirection: 'column',
    width: '90%',
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
  cardHeaderRightTitle: {
    flexDirection: 'column',
    width: '10%',
    backgroundColor: theme.colors.grey[1000],
    borderRadius: 50,
    borderWidth: 0.3,
    borderStyle: 'solid',
  },
  cardDetail: {
    flexDirection: 'row',
    paddingBottom: theme.spacing(10),
  },
  labelSubHeader: {
    fontStyle: 'normal',
  },
  progressText: {
    fontSize: 20,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontBold,
  },
  progressLightText: {
    fontSize: 20,
    fontStyle: 'normal',
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontRegular,
  },
  arrowUp: {
    marginTop: theme.spacing(10),
  },
  percentageText: {
    marginTop: theme.spacing(8),
    marginLeft: theme.spacing(-2),
    fontSize: 14,
    fontStyle: 'normal',
    color: theme.colors.green[200],
    fontFamily: theme.fonts.fontRegular,
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
