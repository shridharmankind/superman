import Colors from './colors';
export const fontFamilies = {
  fontRegular: 'Poppins-Regular',
  fontBold: 'Poppins-Bold',
  fontLight: 'Poppins-Light',
  fontSemiBold: 'Poppins-SemiBold',
  fontMedium: 'Poppins-Medium',
  fontItalic: 'Poppins-Italic',
};

const Typography = {
  h1: {
    fontSize: 32,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
  },
  h2: {
    fontSize: 22.7,
    fontFamily: fontFamilies.fontRegular, // Poppins-Medium
    color: Colors.grey[200],
  },
  h3: {
    fontSize: 18.7,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.grey[200],
  },
  h4: {
    fontSize: 14,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.grey[200],
  },
  h5: {
    fontSize: 12.7,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.primary,
  },
  body: {
    fontSize: 12.7,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.primary,
  },
  h6: {
    fontSize: 10.7,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.grey[200],
  },
  bodySmall: {
    fontSize: 10.7,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
  },

  subtitleSmall: {
    fontSize: 14,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
  },
  subtitleLarge: {
    fontSize: 16,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
  },

  label: {
    fontSize: 9.3,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
  },
};

export default Typography;
