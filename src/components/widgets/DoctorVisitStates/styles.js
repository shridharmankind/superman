import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    marginRight: theme.spacing(10),
    borderRadius: 10.7,
    borderWidth: 1.3,
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.white,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
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
  },
  visitDate: {
    fontFamily: theme.fonts.fontSemiBold,
    fontSize: 14,
    color: theme.colors.grey[200],
  },
  visitMonth: {
    fontFamily: theme.fonts.fontSemiBold,
    fontSize: 9.3,
    marginTop: theme.spacing(-7),
    color: theme.colors.grey[200],
  },
  completed: {
    borderColor: theme.colors.limeGreen,
  },
  upcoming: {
    borderColor: theme.colors.white,
  },
  missed: {
    borderColor: theme.colors.red[300],
  },
  today: {
    borderColor: theme.colors.grey[200],
  },
});

export default styles;
