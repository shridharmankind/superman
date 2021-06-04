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
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  headerButtonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 5,
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
    flex: 0.8,
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
    borderWidth: 2,
    borderColor: themes.colors.primary,
    borderRadius: 1000,
  },
  doctorDetailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingBottom: 20,
    borderBottomColor: themes.colors.grey[100],
    borderBottomWidth: 1,
  },
  doctorDetails: {
    flexDirection: 'row',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  areaFilter: {
    flex: 1,
    overflow: 'hidden',
  },
  swiper: {
    flex: 1,
    flexDirection: 'row',
  },
  swiperArrow: {
    backgroundColor: themes.colors.white,
    borderColor: themes.colors.blue,
    borderWidth: 1,
    borderRadius: 1000,
    width: 26,
    height: 26,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    top: 7,
  },
  leftArrow: {
    position: 'absolute',
    left: 0,
  },
  rightArrow: {
    position: 'absolute',
    right: 0,
  },
  areaChip: {marginRight: 14},
  areaType: {
    paddingHorizontal: 34,
    paddingVertical: 6,
  },
  patchContainer: {
    flex: 0.5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignContent: 'center',
    alignSelf: 'flex-end',
  },
  patchInputCotainer: {
    borderColor: themes.colors.borderColor,
    borderRadius: 7,
    borderWidth: 1,
    padding: 5,
    width: '100%',
  },
  patchInput: {
    fontSize: 14,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 16,
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
    position: 'absolute',
    right: 10,
    top: 10,
  },
  week: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
  },
  weekLabel: {
    color: themes.colors.grey[200],
    marginHorizontal: 20,
    textTransform: 'capitalize',
  },
  weekArrow: {
    height: 20,
    marginHorizontal: 5,
  },
  doctorSelectedContainer: {
    flexDirection: 'row',
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bottomContent: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingVertical: 22,
    borderTopColor: themes.colors.grey[100],
    borderTopWidth: 1,
  },
  addDoctors: {
    borderRightColor: themes.colors.grey[100],
    borderRightWidth: 2,

    paddingRight: 30,
    marginRight: 20,
  },
  paginationStyle: {
    position: 'absolute',
    bottom: -20,
  },
  activePaginationItem: {
    width: 72,
    backgroundColor: themes.colors.primary,
    opacity: 1,
  },
  paginationItem: {
    width: 12,
    height: 12,
    borderRadius: 1000,
    backgroundColor: themes.colors.primary,
    marginHorizontal: 12,
  },
  rightContent: {
    paddingLeft: themes.spacing(36),
  },
});

export default styles;
