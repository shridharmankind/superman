import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 50,
    backgroundColor: themes.colors.white,
    padding: 40,
    marginHorizontal: 50,
    marginTop: 40,
    marginBottom: 100,
  },
  container: {
    flexDirection: 'column',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  headerButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  doneBtn: {
    paddingVertical: 10,
    paddingHorizontal: 60,
    marginRight: 15,
  },
  closeBtn: {
    paddingVertical: 10,
    paddingHorizontal: 60,
  },
  content: {
    flexDirection: 'row',
  },
  leftContent: {
    flex: 0.9,
    flexDirection: 'column',
    paddingBottom: 40,
  },
  rightContnet: {
    flex: 1,
  },
  selectAreaContainer: {
    flexDirection: 'column',
  },
  doctorDetailsContainer: {
    marginVertical: 20,
  },
  areaFilterContainer: {
    flexDirection: 'row',
    marginVertical: 20,
  },
  categoryFilterContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: themes.colors.primary,
    borderRadius: 20,
  },
  doctorDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomColor: themes.colors.borderColor,
    borderBottomWidth: 1,
  },
  doctorDetails: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
  },
  areaFilter: {
    flexDirection: 'row',
    flex: 1,
  },
  patchInputCotainer: {
    flex: 0.4,
    borderColor: themes.colors.borderColor,
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  patchIcon: {
    backgroundColor: themes.colors.darkBlue,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    padding: 5,
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 5,
  },
  patchIconContainer: {
    flexDirection: 'row',
    marginLeft: 50,
  },
  week: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  weekLabel: {
    marginHorizontal: 20,
  },
  weekArrow: {
    height: 20,
    marginHorizontal: 5,
  },
});

export default styles;
