import { StyleSheet } from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  header: {
    height: 98.7,
    justifyContent: 'center',
    paddingHorizontal: theme.spacing(32),
    borderRadius: 26.7,
    width: '100%',
    backgroundColor: '#D5E2E7',
  },
  headerLabel: {
    fontSize: 18.7,
    color: theme.colors.primary,
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row'
  },
  performanceSectionContainer: {
    width: '50%',
    backgroundColor: '#F8ECEF',
    borderRadius: 10,
    padding: 20
  },
  leaderboardSectionContainer: {
    width: '50%',
    backgroundColor: '#EAE9F2',
    borderRadius: 10,
    padding: 20,
    marginLeft: 10
  },
  sectionsTitle: {
    fontSize: 15,
    color: theme.colors.black,
    marginTop: 20,
    marginBottom: 20
  },
  sectionNumber: {
    fontSize: 25,
    color: theme.colors.primary,
    marginTop: -15
  },
  sectionNumber2: {
    fontSize: 15,
    color: theme.colors.black
  },
  sales: {
    marginBottom: 20
  },
  colorPrimary: {
    color: theme.colors.primary
  }
});
