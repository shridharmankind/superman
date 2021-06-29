import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  product: {
    backgroundColor: themes.colors.white,
    borderRadius: 6.7,
    width: 200,
    padding: themes.spacing(16),
    elevation: 10,
  },
  productImage: {
    width: 168,
    height: 106,
    resizeMode: 'stretch',
    marginBottom: themes.spacing(16),
  },
  productTitle: {
    fontSize: 16,
    fontFamily: themes.fonts.fontSemiBold,
    marginRight: themes.spacing(8),
  },
  productCheck: {
    position: 'absolute',
    right: 13,
    top: 13,
    zIndex: 1,
  },
  productTag: {
    fontSize: 9,
    fontFamily: themes.fonts.fontSemiBold,
    backgroundColor: themes.colors.grey[1000],
    textAlign: 'center',
    borderRadius: 16,
    height: 16,
    width: 16,
    marginRight: themes.spacing(4),
  },
  productTitleWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productTags: {
    flexDirection: 'row',
  },
});

export default styles;
