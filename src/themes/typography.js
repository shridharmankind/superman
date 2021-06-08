import Colors from './colors';

export const fontFamilies = {
  fontRegular: 'Poppins-Regular',
  fontBold: 'Poppins-Bold',
  fontLight: 'Poppins-Light',
  fontSemiBold: 'Poppins-SemiBold',
  fontMedium: 'Poppins-Medium',
  fontItalic: 'Poppins-Italic',
};

const additionalProps = {
  lineHeight: 20,
  letterSpacing: 0,
};

const Typography = {
  h1: {
    fontSize: 32,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
    ...additionalProps,
  },
  h2: {
    fontSize: 22.7,
    fontFamily: fontFamilies.fontMedium,
    color: Colors.grey[200],
    ...additionalProps,
    lineHeight: 29.3,
    letterSpacing: -0.23,
  },
  h3: {
    fontSize: 18.7,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.grey[200],
    ...additionalProps,
  },
  h4: {
    fontSize: 14,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.grey[200],
    ...additionalProps,
  },
  h5: {
    fontSize: 12.7,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.primary,
    ...additionalProps,
  },
  h6: {
    fontSize: 10.7,
    fontFamily: fontFamilies.fontSemiBold,
    color: Colors.grey[200],
    ...additionalProps,
  },
  body: {
    fontSize: 12.7,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.primary,
    ...additionalProps,
  },
  bodySmall: {
    fontSize: 10.7,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
    ...additionalProps,
    lineHeight: 16,
    letterSpacing: 0.21,
  },
  subtitleLarge: {
    fontSize: 16,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
    ...additionalProps,
  },
  subtitleSmall: {
    fontSize: 14,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
    ...additionalProps,
  },
  label: {
    fontSize: 9.3,
    fontFamily: fontFamilies.fontRegular,
    color: Colors.grey[200],
    ...additionalProps,
    lineHeight: 13.3,
  },
};

export default Typography;
