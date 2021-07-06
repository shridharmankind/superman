import {StyleSheet} from 'react-native';
import themes from 'themes';

const styles = StyleSheet.create({
  modalTitleBack: {
    marginLeft: themes.spacing(10.7),
    marginRight: themes.spacing(5),
  },
  modalPosition: {
    width: '80%',
    left: '4%',
  },
  modalTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: themes.spacing(20),
  },
  subBrandList: {
    display: 'flex',
    flexWrap: 'wrap',
    marginLeft: themes.spacing(20),
    flexDirection: 'row',
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: themes.spacing(22),
  },
  modalTitleDone: {
    position: 'absolute',
    right: 0,
  },
  eDetailingStartContent: {
    width: 165,
    marginHorizontal: themes.spacing(8),
    height: 42,
  },
  eDetailingStartText: {
    fontSize: 12,
  },
});

export default styles;
