import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  doctorDetailWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  doctorDetailContainer: {
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 32,
    paddingVertical: 20,
    borderColor: theme.colors.grey[500],
    borderRadius: 10,
    borderWidth: 1,
    width: '100%',
  },
  heading: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
    minWidth: 350,
  },
  specialization: {
    paddingRight: 10,
  },
  divisionContainer: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    top: -21,
    left: -34,
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginTop: 8,
  },
  dailyTitle: {
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontRegular,
    fontSize: 16,
  },
  visitText: {
    color: theme.colors.grey[200],
    fontFamily: theme.fonts.fontBold,
  },
  removeCardButton: {
    height: '100%',
    width: 100,
    backgroundColor: theme.colors.red[200],
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    paddingHorizontal: 15,
  },
  removeCardButtonClose: {
    fontSize: 28,
  },
  removeCardButtonText: {
    color: theme.colors.white,
    fontFamily: theme.fonts.fontRegular,
    fontSize: 11,
    textAlign: 'center',
  },
  closeLabel: {
    paddingBottom: 1,
  },
});

export default styles;
