import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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

/**
 * Standard Plan Modal component for setting daily standard plan.
 * This component use DoctorDetails, AreaChip, Label and Button component
 * @param {Function} handleSliderIndex to handle left/right movement of week
 * @param {Object} navigation contains react navigation method
 * @param {String} week week has been passed from parent component
 * @param {String} weekDay weekDay has been passed from parent component
 */

const StandardPlanModal = ({handleSliderIndex, navigation, week, weekDay}) => {
  const [patchValue, setPatchValue] = useState();
  const [areaSelected, setAreaSelected] = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [patches, setPatches] = useState();
  const [patchSelected, setPatchSelected] = useState();
  const [patchDefaultValue, setPatchDefaultValue] = useState();
  const [partiesList, setPartiesList] = useState([]);
  const [parties, setParties] = useState([]);
  const [partiesType, setPartiesType] = useState([]);
  const [selectedDoctorType, setSelectedDoctorType] = useState(Strings.all);
  const [doctorsSelected, setDoctorSelected] = useState([]);
  const [showPatchError, setShowPatchError] = useState(false);
  const [patchError, setPatchError] = useState();
  const swiperRef = useRef(null);

  /**
   * callback function to return direction left/right of day swiper
   * @param {String} direction
   */
  const handleIndex = direction => {
    handleSliderIndex(direction);
  };

  useEffect(() => {
    const getParty = async () => {
      const result = await NetworkService.get(`/party/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setPartiesList(result.data);
        filterPartyByType(result.data);
      }
    };
    getParty();
  }, []);

  useEffect(() => {
    const getPartyByPatchId = async () => {
      if (patchValue) {
        const result = await NetworkService.get(
          `/party/partybyspid/${1}/${patchValue.id}`,
        );
        if (result.status === Constants.HTTP_OK) {
          setDoctorSelected(result.data.partyIds);
          getSelectedArea(result.data.partyIds);
        }
      }
    };
    getPartyByPatchId();
  }, [patchValue, getSelectedArea]);

  const getSelectedArea = useCallback(
    ids => {
      if (ids.length > 0) {
        let patchAreaList = [];
        (partiesList || []).map(party => {
          if (ids.some(id => id === party.id)) {
            party.areas.map(area => {
              if (patchAreaList.indexOf(area.id) === -1) {
                patchAreaList.push(area.id);
              }
            });
          }
        });
        const a = areaList.filter(
          area => patchAreaList.indexOf(area.id) !== -1,
        );
        setAreaSelected(a);
      }
    },
    [partiesList, areaList],
  );

  useEffect(() => {
    const getPatches = async () => {
      const result = await NetworkService.get(`/getPatches/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setPatches(result.data);
      }
    };
    getPatches();
  }, []);

  const filterPartyByType = partyList => {
    const doctorType = [Strings.all];
    partyList.map(party => {
      if (doctorType.indexOf(party.partyType) === -1) {
        doctorType.push(party.partyType);
      }
    });
    setPartiesType(doctorType);
  };

  useEffect(() => {
    const getAreas = async () => {
      const result = await NetworkService.get(`/area/${1}`);
      if (result.status === Constants.HTTP_OK) {
        setAreaList(result.data);
      }
    };
    getAreas();
  }, []);

  const handleAreaSelected = val => {
    const index = (areaSelected || []).filter(area => area.id === val);
    if (index.length > 0) {
      setAreaSelected(areaSelected.filter(item => item.id !== val));
    } else {
      setAreaSelected([
        ...areaSelected,
        areaList.find(area => area.id === val),
      ]);
    }

    removeSelectedDoctorFromArea(val);
    setSelectedDoctorType(Strings.all);
  };

  const getPartyCountFromArea = useCallback(() => {
    const areaData = (areaList || []).map(area => {
      return {
        name: area.name,
        id: area.id,
        totalPartiesInArea: getDoctorsByArea(area.id).length,
      };
    });
    return areaData;
  }, [getDoctorsByArea, areaList]);

  const removeSelectedDoctorFromArea = useCallback(
    areaId => {
      const doctorToRemove = partiesList.find(party =>
        doctorsSelected.some(
          obj => obj === party.id && party.areas.some(par => par.id === areaId),
        ),
      );
      if (doctorToRemove) {
        doctorToRemove.selected = false;
        doctorToRemove.selectedVistedFrequency = doctorToRemove.alreadyVisited;
        setDoctorSelected(
          doctorsSelected.filter(doc => doc !== doctorToRemove.id),
        );
      }
    },
    [doctorsSelected, partiesList],
  );

  const createPatchString = useCallback(() => {
    let patchString = (areaSelected || [])
      .filter(area => {
        const partyData = partiesList.find(party =>
          doctorsSelected.some(
            obj =>
              obj === party.id && party.areas.some(par => par.id === area.id),
          ),
        );
        return partyData ? true : false;
      })
      .map(patch => patch.name)
      .join(' + ');
    const patchCount = (patches || []).filter(
      p => p.displayName === patchString || p.defaultName === patchString,
    );
    if (patchCount) {
      patchString = patchString
        ? patchString +
          ` (${patchCount.length === 0 ? 1 : patchCount.length + 1})`
        : '';
    }
    return patchString;
  }, [areaSelected, doctorsSelected, partiesList, patches]);

  useEffect(() => {
    if (!patchValue) {
      const string = createPatchString();
      setPatchSelected(string);
      setPatchDefaultValue(string);
    }
  }, [
    areaSelected,
    patchValue,
    doctorsSelected,
    partiesList,
    createPatchString,
  ]);

  const getDoctorsByArea = useCallback(
    area => {
      const partiesData = partiesList.filter(party => {
        const isArea = party.areas.find(obj => {
          return (
            obj.id === area &&
            (party.partyType === selectedDoctorType ||
              selectedDoctorType === Strings.all)
          );
        });
        if (isArea) {
          return party;
        }
      });
      return partiesData;
    },
    [partiesList, selectedDoctorType],
  );

  const handleDonePress = async () => {
    const obj = {
      displayName: patchSelected,
      defaultName: patchDefaultValue,
      partyIds: doctorsSelected,
      week: week.split(' ')[1],
      weekDay,
    };
    const isValidated = await NetworkService.post('/patch/validate/1', {
      displayName: patchSelected,
      defaultName: patchDefaultValue,
    });
    if (isValidated.status === Constants.HTTP_OK) {
      const result = await NetworkService.post('/patch/1', obj);
      if (result.status === Constants.HTTP_OK) {
        console.log(result.data);
        navigation.navigate('TourPlan');
      }
    } else if (isValidated.status === Constants.HTTP_PATCH_CODE.VALIDATED) {
      if (
        isValidated.data.details[0].code ===
        Constants.HTTP_PATCH_CODE.ALREADY_EXITS
      ) {
        setPatchError(Strings.patchAlreadyExists);
      } else {
        setPatchError(Strings.already30PatchesCreated);
      }
      setShowPatchError(true);
    } else {
      setPatchError(Strings.somethingWentWrong);
      setShowPatchError(true);
    }
  };

  const handlePartyByType = val => {
    if (val !== Strings.all) {
      setParties(parties.filter(party => party.partyType === val));
      setSelectedDoctorType(val);
    } else {
      setParties(parties);
      setSelectedDoctorType(Strings.all);
    }
  };

  /**
   *  Handles Card click event& accept an id of party
   * @param {Number} id
   */
  const handleDoctorCardPress = id => {
    const indexAvailable = doctorsSelected.some(party => party === id);
    if (indexAvailable) {
      setDoctorSelected(doctorsSelected.filter(party => party !== id));
    } else {
      setDoctorSelected([...doctorsSelected, id]);
    }
  };

  const handleAreaLeftArrow = () => {
    swiperRef.current.scrollTo({x: 0, y: 0, animated: true});
  };

  const handleAreaRightArrow = () => {
    swiperRef.current.scrollTo({x: 400, y: 0, animated: true});
  };

  const handlePatchInputChange = val => {
    const regex = /^[ A-Za-z0-9-+&()]*$/;
    if (val.length < 64 && regex.test(val)) {
      setPatchSelected(val);
    }
  };

  const handleDropDownValue = useCallback(val => {
    if (val) {
      setPatchValue(val);
      setPatchSelected(val.value);
      setPatchDefaultValue(val.defaultName);
    }
  }, []);

  const getSelectedPartyByArea = id => {
    let count = 0;
    getDoctorsByArea(id).map(party => {
      if (doctorsSelected.filter(doc => doc === party.id).length > 0) {
        count = count + 1;
      }
    });
    return count;
  };

  const getSelectedPartyByType = useCallback(() => {
    const obj = {doctors: 0, chemist: 0};
    partiesList.map(party => {
      if (doctorsSelected.some(id => id === party.id)) {
        if (party.partyType === 'Doctor') {
          obj.doctors = obj.doctors + 1;
        } else {
          obj.chemist = obj.chemist + 1;
        }
      }
    });
    return `${
      doctorsSelected.length > 0 ? ` - ${doctorsSelected.length} (` : ''
    }${
      obj.doctors > 0
        ? `${obj.doctors} doctor${obj.doctors > 1 ? 's' : ''}`
        : ''
    }${obj.doctors > 0 && obj.chemist > 0 ? ', ' : ''}${
      obj.doctors > 0 && obj.chemist === 0 ? ')' : ''
    }${obj.chemist > 0 ? `${obj.chemist} chemist)` : ''}`;
  }, [doctorsSelected, partiesList]);

  return (
    <ScrollView style={[styles.containerStyle, {height}]}>
      <View style={styles.modalHeader}>
        <View>
          <Label title={Strings.selectDoctorAndChemist} size={18.7} />
          <View style={styles.week}>
            <TouchableOpacity onPress={() => handleIndex('left')}>
              <Icon iconStyle={styles.weekArrow} name="angle-left" size={24} />
            </TouchableOpacity>
            <Label
              style={styles.weekLabel}
              title={`${week} - ${weekDay}`}
              size={18.7}
              type={'bold'}
            />
            <TouchableOpacity onPress={() => handleIndex('right')}>
              <Icon iconStyle={styles.weekArrow} name="angle-right" size={24} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.patchContainer]}>
          <View style={styles.patchInputCotainer}>
            <TextInput
              value={patchSelected}
              placeholder={Strings.patchName}
              style={styles.patchInput}
              editable={!patchValue && !patchSelected ? false : true}
              onChangeText={val => handlePatchInputChange(val)}
              maxLength={64}
            />
          </View>
          {showPatchError && (
            <Label
              size={14}
              title={patchError}
              textColor={themes.colors.red[100]}
            />
          )}
        </View>
        <View style={styles.headerButtonGroup}>
          <Button
            mode="contained"
            title={Strings.done}
            uppercase={true}
            disabled={!patchSelected || false}
            contentStyle={styles.doneBtn}
            onPress={() => handleDonePress()}
          />
          <Button
            mode="outlined"
            title={Strings.close}
            uppercase={true}
            contentStyle={styles.closeBtn}
            onPress={() => navigation.navigate('TourPlan')}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View style={styles.selectAreaContainer}>
            <View>
              <Label title={Strings.selectArea} size={14} />
            </View>
            <View style={styles.areaFilterContainer}>
              <Dropdown
                valueSelected={handleDropDownValue}
                data={getPatchesDropdownData(patches)}
                defaultLabel={Strings.selectPatch}
              />
              <View style={styles.areaFilter}>
                <TouchableOpacity
                  onPress={() => handleAreaLeftArrow()}
                  style={[styles.swiperArrow, styles.leftArrow]}>
                  <Icon
                    name={'chevron-left'}
                    size={10}
                    color={themes.colors.blue}
                  />
                </TouchableOpacity>
                <ScrollView
                  horizontal={true}
                  ref={swiperRef}
                  showsHorizontalScrollIndicator={false}>
                  {getPartyCountFromArea().map(area => {
                    return (
                      <Area
                        key={area.id}
                        title={area.name}
                        value={area.id}
                        count={area.totalPartiesInArea}
                        bgColor={'#524F670D'}
                        color={'#524F67'}
                        selectedColor={'#322B7C1A'}
                        selected={isAreaSelected(area.id, areaSelected)}
                        selectedTextColor={themes.colors.primary}
                        style={styles.areaChip}
                        onPress={handleAreaSelected}
                      />
                    );
                  })}
                </ScrollView>
                <TouchableOpacity
                  onPress={() => handleAreaRightArrow()}
                  style={[styles.swiperArrow, styles.rightArrow]}>
                  <Icon
                    name={'chevron-right'}
                    size={10}
                    color={themes.colors.blue}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.doctorDetailsContainer}>
            <View>
              <View style={styles.doctorDetailsHeader}>
                <View style={styles.doctorSelectedContainer}>
                  <Label title={Strings.selectVisit} size={14} />
                  <Label
                    title={getSelectedPartyByType()}
                    type={'bold'}
                    size={14}
                  />
                </View>
                <View style={styles.categoryFilterContainer}>
                  {partiesType.map((type, i) => (
                    <Area
                      key={i}
                      selectedTextColor={themes.colors.white}
                      selectedColor={themes.colors.primary}
                      selected={selectedDoctorType === type}
                      title={type}
                      value={type}
                      bgColor={themes.colors.white}
                      color={'#524F67'}
                      onPress={handlePartyByType}
                      testID={`btn_stp_party_type_${type}_test`}
                      textStyle={styles.areaType}
                    />
                  ))}
                </View>
              </View>

              <View style={styles.doctorDetailsContainer}>
                {areaSelected.map((area, i) => (
                  <React.Fragment key={i}>
                    <View style={styles.doctorSelectedContainer}>
                      <Label
                        title={area.name}
                        testID={`label_stp_area_${area.id}_test`}
                        size={14}
                      />
                      <Label
                        title={` (${getSelectedPartyByArea(area.id)})`}
                        type={'bold'}
                        size={14}
                      />
                    </View>

                    <View style={styles.doctorDetails}>
                      {getDoctorsByArea(area.id).map(party => (
                        <DoctorDetailsWrapper
                          key={party.id}
                          id={party.id}
                          title={party.name}
                          specialization={party.speciality}
                          category={party.isKyc ? Strings.kyc : party.category}
                          selected={(doctorsSelected || []).some(id => {
                            if (id === party.id) {
                              //  on patch selection add the frequency vist and set select
                              if (party.alreadyVisited !== party.frequency) {
                                party.selectedVistedFrequency =
                                  party.alreadyVisited + 1;
                                party.selected = true;
                              }

                              return true;
                            }
                          })}
                          testID={`card_standard_plan_doctor_${party.id}_test`}
                          party={party}
                          onPress={handleDoctorCardPress}
                        />
                      ))}
                    </View>
                  </React.Fragment>
                ))}
              </View>
              <View styles={styles.bottom}>
                <View style={styles.bottomContent}>
                  <Button
                    mode="text"
                    title={Strings.addOtherDoctors}
                    uppercase={false}
                    labelStyle={styles.addDoctors}
                  />
                  <Button
                    mode="contained"
                    title={`${Strings.doctorUniverse} (${partiesList.length})`}
                    uppercase={false}
                    contentStyle={styles.doneBtn}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* <View style={styles.rightContent}>
          <Label title={Strings.planCompliance} />
        </View> */}
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
  patches &&
    patches.map(patch =>
      patchData.push({
        id: patch.id,
        value: patch.displayName,
        defaultName: patch.defaultName,
      }),
    );
  return patchData;
};

StandardPlanModal.defaultProps = {
  handleSliderIndex: () => {},
};

StandardPlanModal.propsTypes = {
  handleSliderIndex: PropTypes.func,
};

export default StandardPlanModal;
