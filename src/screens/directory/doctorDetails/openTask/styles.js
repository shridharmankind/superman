import {StyleSheet} from 'react-native';
import themes from 'themes';

const taskStyles = StyleSheet.create({
  headerTitle: {
    fontSize: 18.7,
    color: themes.colors.grey[200],
    fontFamily: themes.fonts.fontSemiBold,
  },
  taskHeader: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  taskTitle: {
    fontSize: 14,
    color: themes.colors.grey[200],
    fontFamily: themes.fonts.fontMedium,
  },
  taskContainer: {
    paddingVertical: themes.spacing(13.3),
    paddingHorizontal: themes.spacing(16.7),
    borderColor: themes.colors.grey[400],
    borderWidth: 1,
    borderStyle: 'solid',
    marginBottom: themes.spacing(13.3),
    borderRadius: themes.spacing(6.7),
  },
  taskDueDate: {
    borderRadius: 6.7,
    paddingHorizontal: themes.spacing(7.3),
    paddingVertical: themes.spacing(2),
    alignItems: 'center',
    flexDirection: 'row',
    height: 16,
  },
  section: {
    marginTop: 14,
    maxHeight: 390,
  },
  taskList: {
    paddingLeft: 20,
    borderLeftWidth: 0.7,
    borderLeftColor: '#3b524f67',
    flex: 1,
    backgroundColor: themes.colors.white,
    marginLeft: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  count: {
    borderColor: '#ccc',
    borderRadius: 50,
    borderWidth: 1,
    textAlign: 'center',
    backgroundColor: themes.colors.grey[1000],
    marginLeft: themes.spacing(10),
    width: 18,
    height: 18,
    alignItems: 'center',
  },
  leftAlign: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskDesc: {
    fontSize: 10.7,
    color: themes.colors.grey[200],
    fontFamily: themes.fonts.fontRegular,
  },
  footer: {
    fontSize: 12.7,
    fontFamily: themes.fonts.fontSemiBold,
    color: themes.colors.primary,
  },
  footerMargin: {
    marginTop: themes.spacing(13.3),
  },
});

export default taskStyles;
