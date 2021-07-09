import {StyleSheet} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  header: {
    height: 98.7,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing(32),
    borderRadius: 26.7,
    width: '100%',
    backgroundColor: theme.colors.grayishBlue,
  },
  headerLabel: {
    fontSize: 18.7,
    color: theme.colors.primary,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
  },
  performanceSectionContainer: {
    width: '50%',
    backgroundColor: theme.colors.pink[200],
    borderRadius: 10,
    padding: theme.spacing(20),
  },
  leaderboardSectionContainer: {
    width: '50%',
    backgroundColor: theme.colors.blue[400],
    borderRadius: 10,
    padding: theme.spacing(20),
    marginLeft: theme.spacing(10),
  },
  sectionsTitle: {
    fontSize: 15,
    color: theme.colors.black,
    marginTop: theme.spacing(20),
    marginBottom: theme.spacing(20),
  },
  sectionNumber: {
    fontSize: 25,
    color: theme.colors.primary,
    marginTop: theme.spacing(-15),
  },
  sectionNumber2: {
    fontSize: 15,
    color: theme.colors.black,
  },
  sales: {
    marginBottom: theme.spacing(20),
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
});
