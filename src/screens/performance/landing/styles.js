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
  sectionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  performanceSectionContainer: {
    width: '50%',
    backgroundColor: '#F8ECEF',
    borderRadius: 10,
    padding: 10
  },
  leaderboardSectionContainer: {
    width: '50%',
    backgroundColor: '#EAE9F2',
    borderRadius: 10,
    padding: 10,
    marginLeft: 10
  },
  birthdayBorder: {
    borderRadius: 50,
    borderColor: theme.colors.grey[100],
    backgroundColor: theme.colors.white,
    borderWidth: 0.5,
    marginTop: theme.spacing(2),
  },
});
