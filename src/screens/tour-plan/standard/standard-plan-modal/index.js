import React, {useState} from 'react';
import {View} from 'react-native';
import {Modal} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Area,
  DoctorDetails,
  Label,
  Button,
  Dropdown,
} from 'components/elements';
import themes from 'themes';
import {Strings} from 'common';
import styles from './styles';

const data = [
  {
    value: 'Noida-Sec-1 (1)',
  },
  {
    value: 'Noida-Sec-2 (1)',
  },
  {
    value: 'Noida-Sec-3 (1)',
  },
  {
    value: 'Noida-Sec-4 (1)',
  },
  {
    value: 'Noida-Sec-5 (3)',
  },
];

/**
 * Standard Plan Modal component for setting daily standard plan.
 * This component use DoctorDetails, AreaChip, Label and Button component
 * @param {Boolean} visible Modal to be set visible/hide
 * @param {Function} hideModal to hide modal
 */

const StandardPlanModal = ({visible, hideModal}) => {
  const [patchValue, setPatchValue] = useState('');
  const [areaSelected, setAreaSelected] = useState([]);

  const handleAreaSelected = val => {
    const index = areaSelected.indexOf(val);
    if (index > -1) {
      setAreaSelected(areaSelected.filter(item => item !== val));
    } else {
      setAreaSelected([...areaSelected, val]);
    }
  };

  return (
    <Modal
      visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={styles.containerStyle}>
      <View style={styles.container}>
        <View style={styles.modalHeader}>
          <View>
            <Label title={Strings.selectDoctorAndChemist} />
          </View>
          <View
            style={[
              styles.patchInputCotainer,
              {opacity: !patchValue ? 0.2 : 1},
            ]}>
            <Label title={patchValue || Strings.patchName} />
            <View style={styles.patchIconContainer}>
              <View style={[styles.patchIcon]}>
                <Icon name="edit" size={15} color={themes.colors.white} />
              </View>
              <View style={styles.patchIcon}>
                <Icon name="trash" size={15} color={themes.colors.white} />
              </View>
            </View>
          </View>
          <View style={styles.headerButtonGroup}>
            <Button
              mode="contained"
              title={Strings.saveDraft}
              uppercase={true}
              contentStyle={styles.doneBtn}
            />
            <Button
              mode="contained"
              title={Strings.done}
              uppercase={true}
              contentStyle={styles.doneBtn}
              onPress={() => hideModal()}
            />
            <Button
              mode="outlined"
              title={Strings.close}
              uppercase={true}
              contentStyle={styles.closeBtn}
              onPress={() => hideModal()}
            />
          </View>
        </View>
        <View style={styles.content}>
          <View style={styles.leftContent}>
            <View style={styles.selectAreaContainer}>
              <View>
                <Label title={Strings.selectArea} />
              </View>
              <View style={styles.areaFilterContainer}>
                <Dropdown
                  valueSelcted={val => setPatchValue(val)}
                  data={data}
                />
                <View style={styles.areaFilter}>
                  <Area
                    title={'Noida sec 1'}
                    value={1}
                    bgColor={'#524F670D'}
                    color={'#524F67'}
                    selectedColor={'#322B7C1A'}
                    selected={true}
                    selectedTextColor={themes.colors.primary}
                    style={{marginRight: 20}}
                    onPress={handleAreaSelected}
                  />
                  <Area
                    title={'Noida sec 1'}
                    bgColor={'#524F670D'}
                    color={'#524F67'}
                    value={2}
                    onPress={handleAreaSelected}
                  />
                </View>
              </View>
            </View>
            <View style={styles.doctorDetailsContainer}>
              <View>
                <View style={styles.doctorDetailsHeader}>
                  <View>
                    <Label title={Strings.selectVisit} />
                  </View>
                  <View style={styles.categoryFilterContainer}>
                    <Area
                      title={'All'}
                      bgColor={'#524F670D'}
                      color={'#524F67'}
                      selectedColor={themes.colors.primary}
                      selected={true}
                      selectedTextColor={themes.colors.white}
                    />
                    <Area
                      title={'Doctor'}
                      bgColor={themes.colors.white}
                      color={'#524F67'}
                    />
                    <Area
                      title={'Chemist'}
                      bgColor={themes.colors.white}
                      color={'#524F67'}
                    />
                  </View>
                </View>
                <View style={styles.doctorDetailsContainer}>
                  <Label title={'Noida Sec 1'} />
                  <View style={styles.doctorDetails}>
                    <DoctorDetails
                      title={'Dr Harish'}
                      specialization={'Cardiologist'}
                      category={'KYC'}
                      selected={true}
                      testID={''}
                    />
                    <DoctorDetails title={'Dr Harish'} />
                    <DoctorDetails title={'Dr Harish'} />
                    <DoctorDetails title={'Dr Harish'} />
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.rightContent}>
            <Label title={Strings.planCompliance} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

StandardPlanModal.defaultProps = {
  visible: false,
  hideModal: () => {},
};

StandardPlanModal.propsTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
};

export default StandardPlanModal;
