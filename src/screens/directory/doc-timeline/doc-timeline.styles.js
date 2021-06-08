import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  timeline__wrapper: {
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#fcfcfc',
    paddingVertical: 21,
  },
  timeline__year: {
    textAlign: 'center',
    marginBottom: 19,
  },
  timeline__dateContainer: {
    textAlign: 'justify',
    position: 'absolute',
    right: -20,
    borderColor: themes.colors.blue[200],
    borderWidth: 1,
    backgroundColor: themes.colors.white,
    borderRadius: 40,
    height: 40,
    width: 40,
    paddingLeft: 12,
    textAlignVertical: 'center',
    paddingVertical: 5,
    opacity: 1,
  },
  timeline__dateContainer__missed: {
    borderColor: '#aa0808',
  },
  timeline__dateContainer__completed: {
    borderColor: themes.colors.green[200],
  },
  timeline__date: {
    fontSize: 12,
    lineHeight: 16,
    fontFamily: themes.fonts.fontBold,
  },
  timeline__date__missed: {
    color: '#aa0808',
  },
  timeline__date__completed: {
    color: themes.colors.green[200],
  },
  timeline__month: {
    fontSize: 8,
    lineHeight: 14,
    fontFamily: themes.fonts.fontRegular,
  },
  timeline__month__missed: {
    color: '#aa0808',
  },
  timeline__month__completed: {
    color: themes.colors.green[200],
  },
  timeline__item: {
    borderColor: themes.colors.grey[900],
    borderWidth: 0.5,
    borderStyle: 'solid',
    width: '87%',
    borderRadius: 13.3,
    marginHorizontal: 27,
  },
  timeline__item__accordion: {
    padding: 0,
  },
  timeline__item__title: {
    fontSize: 10.7,
    fontFamily: themes.fonts.fontSemiBold,
  },
});

export default styles;
