import React, {useState, useEffect, useCallback} from 'react';
import {Dimensions, ScrollView, TouchableOpacity, View} from 'react-native';
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
import {Strings, Constants} from 'common';
import styles from './styles';
import {NetworkService} from 'services';

const data = [
  {
    name: 'Noida-Sec-1 (1)',
    value: 'Noida-Sec-1 (1)',
  },
  {
    name: 'Karol Bagh',
    value: 'Karol Bagh',
  },
  {
    name: 'Gurgaon',
    value: 'Gurgaon',
  },
  {
    name: 'Greater Noida',
    value: 'Greater Noida',
  },
];

/**
 * Standard Plan Modal component for setting daily standard plan.
 * This component use DoctorDetails, AreaChip, Label and Button component
 * @param {Function} handleSliderIndex to handle left/right movement of week
 */

const StandardPlanModal = ({handleSliderIndex}) => {
  const [patchValue, setPatchValue] = useState();
  const [areaSelected, setAreaSelected] = useState([]);
  const [patches, setPatches] = useState(data);

  const handleIndex = direction => {
    handleSliderIndex(direction);
  };

  useEffect(() => {
    const getPatches = async () => {
      const result = await NetworkService.get(`/getPatches/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setPatches(result.data);
      }
    };
    getPatches();
  }, []);

  useEffect(() => {
    console.log(patches && patches.filter(patch => patchValue === patch.name));
  }, [patches, patchValue]);

  const handleAreaSelected = val => {
    const index = areaSelected.indexOf(val);
    if (index > -1) {
      setAreaSelected(areaSelected.filter(item => item !== val));
    } else {
      setAreaSelected([...areaSelected, val]);
    }
  };

  const handleDonePress = async () => {
    await NetworkService.post('/savePatch', {
      id: 0,
      name: 'Test_Internal_123',
      staffPositionId: 1,
      createdOn: '2021-05-21T05:04:39.746Z',
      createdBy: 1,
      modifiedOn: '2021-05-21T05:04:39.746Z',
      modifiedBy: 0,
      patchPartyMaps: [
        {
          id: 0,
          partyId: 1,
          patchId: 1,
        },
      ],
    }).then(res => console.log(res.data));
  };

  const handleDeletePatch = async () => {
    await NetworkService.get('/deletePatch/1').then(res =>
      console.log(res.data),
    );
  };

  return (
    <ScrollView style={[styles.containerStyle, {height}]}>
      <View style={styles.modalHeader}>
        <View>
          <Label title={Strings.selectDoctorAndChemist} />
          <View style={styles.week}>
            <TouchableOpacity onPress={() => handleIndex('left')}>
              <Icon iconStyle={styles.weekArrow} name="angle-left" size={30} />
            </TouchableOpacity>
            <Label
              style={styles.weekLabel}
              title={'Week 1 - Monday'}
              size={24}
              type={'bold'}
            />
            <TouchableOpacity onPress={() => handleIndex('right')}>
              <Icon iconStyle={styles.weekArrow} name="angle-right" size={30} />
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={[styles.patchInputCotainer, {opacity: !patchValue ? 0.2 : 1}]}>
          <Label title={patchValue || Strings.patchName} />
          <View style={styles.patchIconContainer}>
            <TouchableOpacity style={[styles.patchIcon]}>
              <Icon name="edit" size={15} color={themes.colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.patchIcon}
              onPress={() => handleDeletePatch()}>
              <Icon name="trash" size={15} color={themes.colors.white} />
            </TouchableOpacity>
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
            onPress={() => handleDonePress()}
          />
          <Button
            mode="outlined"
            title={Strings.close}
            uppercase={true}
            contentStyle={styles.closeBtn}
            onPress={() => {}}
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
                data={getPatchesDropdownData(patches)}
                data={data}
                defaultLabel={Strings.selectPatch}
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
    </ScrollView>
  );
};

const {height} = Dimensions.get('window');

const getPatchesDropdownData = patches => {
  let patchData = [];
  patches && patches.map(patch => patchData.push({value: patch.name}));
  return patchData;
};

StandardPlanModal.defaultProps = {
  handleSliderIndex: () => {},
};

StandardPlanModal.propsTypes = {
  handleSliderIndex: PropTypes.func,
};

export default StandardPlanModal;
