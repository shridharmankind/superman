import {StyleSheet} from 'react-native';
import theme from 'themes';

export default StyleSheet.create({
  header: {
    height: theme.sizing(98.7),
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
  sidePanel: {
    flex: 1,
  },
  descContainer: {
    marginBottom: theme.spacing(10.6),
  },
  desc: {
    marginTop: theme.spacing(20),
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 6.7,
    marginTop: theme.spacing(2.7),
    paddingHorizontal: theme.spacing(10.7),
    paddingVertical: theme.spacing(12),
  },
});
