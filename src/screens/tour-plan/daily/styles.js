import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    position: 'relative',
    borderWidth: 1,
    marginTop: 20,
    marginRight: 20,
    zIndex: 1,
  },
  heading: {
    paddingTop: 20,
    paddingBottom: 10,
  },
  nameContainer: {
    flexDirection: 'row',
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
});

export default styles;
