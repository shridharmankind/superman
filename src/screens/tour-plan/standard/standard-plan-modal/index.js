import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  ScrollView,
  TouchableOpacity,
  View,
  ListVi,
} from 'react-native';
import {Modal} from 'react-native-paper';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Area,
  Label,
  Button,
  Dropdown,
  DoctorDetailsWrapper,
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
  const [areaList, setAreaList] = useState([]);
  const [patches, setPatches] = useState();
  const [patchSelected, setPatchSelected] = useState();
  const [parties, setParties] = useState([]);

  const handleIndex = direction => {
    handleSliderIndex(direction);
  };

  useEffect(() => {
    const getParty = async () => {
      const result = await NetworkService.get(`/party/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setParties(result.data);
      }
    };
    getParty();
  }, []);

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
    const getAreas = async () => {
      const result = await NetworkService.get(`/area/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setAreaList(result.data);
      }
    };
    getAreas();
  }, []);

  useEffect(() => {
    const patch = patches && patches.filter(val => patchValue === val.name);
    setPatchSelected(patch && patch.length > 0 && patch[0].name);
  }, [patches, patchValue]);

  const handleAreaSelected = val => {
    const index = areaSelected.filter(area => area.id === val);
    if (index.length > 0) {
      setAreaSelected(areaSelected.filter(item => item.id !== val));
    } else {
      setAreaSelected([
        ...areaSelected,
        areaList.find(area => area.id === val),
      ]);
    }
  };

  useEffect(() => {
    if (!patchValue) {
      const patchString =
        areaSelected.length > 0 &&
        areaSelected.map(area => area.name).join('+');
      setPatchSelected(patchString);
    }
  }, [areaSelected, patchValue]);

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
          style={[
            styles.patchInputCotainer,
            {opacity: !patchValue || !patchSelected ? 0.2 : 1},
          ]}>
          <Label
            title={
              patchSelected ||
              (patchValue && patchValue.name) ||
              Strings.patchName
            }
          />
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
                defaultLabel={Strings.selectPatch}
              />
              <View style={styles.areaFilter}>
                {areaList.map(area => {
                  return (
                    <Area
                      title={area.name}
                      value={area.id}
                      bgColor={'#524F670D'}
                      color={'#524F67'}
                      selectedColor={'#322B7C1A'}
                      selected={isAreaSelected(area.id, areaSelected)}
                      selectedTextColor={themes.colors.primary}
                      style={{marginRight: 20}}
                      onPress={handleAreaSelected}
                    />
                  );
                })}
                {/* <Area
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
                /> */}
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
                    {parties.map(party => (
                      <DoctorDetailsWrapper
                        title={party.name}
                        specialization={party.speciality}
                        category={party.isKyc ? Strings.kyc : party.category}
                        selected={false}
                        testID={`card_standard_plan_doctor_${party.id}_test`}
                      />
                    ))}
                  </View>
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

const isAreaSelected = (area, areaList) => {
  return areaList.filter(val => val.id === area).length > 0;
};

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
