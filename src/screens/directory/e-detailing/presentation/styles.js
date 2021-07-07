import {StyleSheet} from 'react-native';
import theme from 'themes';

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing(32),
    paddingBottom: theme.spacing(66.7),
    flex: 1,
    marginHorizontal: theme.spacing(101),
    marginVertical: theme.spacing(53.3),
    borderRadius: 13.3,
    backgroundColor: theme.colors.white,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 2,
  },
  paginationItemActive: {
    width: 48,
    backgroundColor: theme.colors.primary,
    opacity: 1,
  },
  paginationItem: {
    width: 6.7,
    height: 6.7,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    opacity: 1,
    padding: 0,
    marginLeft: -10,
  },
  pagination: {
    position: 'absolute',
    bottom: -23,
  },
  swiperList: {
    overflow: 'visible',
  },
  slideWrapper: {
    backgroundColor: theme.colors.white,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey[1000],
    justifyContent: 'center',
    marginRight: theme.spacing(20),
  },
  exitActionContent: {
    width: 66.7,
    marginHorizontal: theme.spacing(8),
    height: 42,
  },
  exitActionText: {
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    paddingVertical: theme.spacing(10),
    marginBottom: theme.spacing(26.7),
  },
  headCol: {
    flex: 1,
  },
  exitAction: {
    flex: 1,
    position: 'absolute',
    right: 0,
  },
  hamburger: {
    backgroundColor: theme.colors.primary,
    width: 48.3,
    height: 48.3,
    borderRadius: 6.7,
    padding: theme.spacing(10),
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 10,
    right: 30,
  },
  modalPosition: {
    width: '30%',
    right: 0,
    position: 'absolute',
    top: 0,
    height: '100%',
  },
  centerModal: {
    flex: 1,
    marginTop: 0,
  },
  modalTitle: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleCol: {
    flexGrow: 1,
    flexDirection: 'column',
  },
  modalTitleText: {
    lineHeight: 50,
  },
  mainSectionTitle: {
    fontSize: 16,
    fontFamily: theme.fonts.fontSemiBold,
  },
  subSection: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey[1000],
  },
  subSectionTitle: {
    fontSize: 14,
    fontFamily: theme.fonts.fontRegular,
    paddingLeft: theme.spacing(30),
  },
  subSectionContent: {
    paddingVertical: theme.spacing(16),
  },
  thumbnail: {
    width: 200,
    height: 106,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.grey[1000],
    backgroundColor: theme.colors.grey[1000],
    opacity: 0.5,
  },
  thumbnailSelected: {
    backgroundColor: theme.colors.checkCircleBlue,
  },
  uncheck: {
    height: 30,
    width: 30,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: theme.colors.checkCircleBlue,
  },
  productSlide: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: theme.spacing(18),
    marginBottom: theme.spacing(10.7),
  },
  productSlideCheck: {
    paddingRight: theme.spacing(13.3),
  },
  itemLeft: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
  },
});

export default styles;
