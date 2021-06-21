import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  product: {
    backgroundColor: themes.colors.white,
    borderRadius: 6.7,
    width: 200,
    padding: 16,
    elevation: 5,
  },
  productImage: {
    width: 168,
    height: 106,
    resizeMode: 'stretch',
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 16,
    fontFamily: themes.fonts.fontSemiBold,
  },
  productTag: {
    backgroundColor: themes.colors.grey[1500],
    fontSize: 9,
    fontFamily: themes.fonts.fontSemiBold,
  },
  productCheck: {
    position: 'absolute',
    right: 13,
    top: 13,
    zIndex: 1,
  },
});

export default styles;
