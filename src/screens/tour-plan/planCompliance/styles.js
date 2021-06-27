import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    borderColor: theme.colors.borderColor,
    borderRadius: 6.7,
    minWidth: 196,
    borderWidth: 0.7,
  },
  progressContainer: {
    minHeight: 83.3,
    borderRadius: 6.7,
    paddingVertical: theme.spacing(16),
    paddingHorizontal: theme.spacing(13.3),
  },
  rulesContainer: {
    paddingVertical: theme.spacing(4),
    paddingHorizontal: theme.spacing(13.3),
  },
  percentage: {
    paddingVertical: theme.spacing(18),
    paddingBottom: theme.spacing(10),
    fontSize: 26.7,
    fontFamily: theme.fonts.fontBold,
    color: theme.colors.white,
  },
  completedComplaince: {
    backgroundColor: theme.colors.green[100],
  },
  inProgressComplaince: {
    backgroundColor: theme.colors.red[400],
  },
  rulesTitle: {
    fontFamily: theme.fonts.fontLight,
    paddingTop: theme.spacing(5.3),
  },
  title: {
    fontFamily: theme.fonts.fontBold,
  },
  subtitle: {
    fontFamily: theme.fonts.fontLight,
  },
  rulesContainerSub: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingVertical: theme.spacing(4),
  },
  complianceIcon: {
    paddingRight: theme.spacing(8),
  },
  header: {
    flexDirection: 'row',
  },
});

export default styles;
