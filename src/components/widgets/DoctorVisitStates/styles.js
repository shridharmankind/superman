import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
    width: 50,
    height: 50,
    position: 'relative',
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
  },
  visitContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    left: 10,
  },
  visitDate: {
    fontFamily: theme.fonts.fontRegular,
    color: theme.colors.grey[200],
  },
  visitMonth: {
    fontFamily: theme.fonts.fontRegular,
    marginTop: -5,
    color: theme.colors.grey[200],
  },
  completed: {
    borderColor: theme.colors.limeGreen,
  },
  upcoming: {
    borderColor: theme.colors.white,
  },
  missed: {
    borderColor: theme.colors.softRed,
  },
  today: {
    borderColor: theme.colors.grey[200],
  },
});

export default styles;
