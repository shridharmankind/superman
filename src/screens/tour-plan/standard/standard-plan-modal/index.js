import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Area, Label, LabelVariant, Button} from 'components/elements';
import themes from 'themes';
import {Strings, Constants} from 'common';
import styles from './styles';
import {
  PARTY_TYPE,
  STP_STATUS,
  COMPLAINCE_TYPE,
  PARTY_TYPES,
} from 'screens/tourPlan/constants';
import {
  fetchPartiesCreator,
  fetchAreasCreator,
  fetchPatchesCreator,
  fetchPartiesByPatchIdCreator,
  standardTourPlanSelector,
  savePatchCreator,
  standardPlanActions,
  fetchSTPCalendarUpdateCreator,
} from '../redux';
import {showToast, hideToast} from 'components/widgets/Toast';
import Areas from './areas';
import DoctorsByArea from './doctorsByArea';
import PlanCompliance from 'screens/tourPlan/planCompliance';
import {monthlyTourPlanSelector} from 'screens/tourPlan/monthly/redux';
import {
  planComplianceSelector,
  fetchPlanComplianceCreator,
  planComplianceActions,
} from 'screens/tourPlan/planCompliance/redux';
import {getSelectedPartyTypeData} from 'screens/tourPlan/helper';
import {appSelector} from 'selectors';
import {translate} from 'locale';

/**
 * Standard Plan Modal component for setting daily standard plan.
 * This component use DoctorDetails, AreaChip, Label and Button component
 * @param {Function} handleSliderIndex to handle left/right movement of week
 * @param {Object} navigation contains react navigation method
 * @param {String} week week has been passed from parent component
 * @param {String} weekDay weekDay has been passed from parent component
 */

const StandardPlanModal = ({
  handleSliderIndex,
  navigation,
  week,
  weekDay,
  year,
  workingDays,
}) => {
  const dispatch = useDispatch();
  const [patchValue, setPatchValue] = useState();
  const [areaSelected, setAreaSelected] = useState([]);
  const [patches, setPatches] = useState();
  const [patchSelected, setPatchSelected] = useState();
  const [patchDefaultValue, setPatchDefaultValue] = useState();
  const [parties, setParties] = useState([]);
  const [selectedDoctorType, setSelectedDoctorType] = useState(Strings.all);
  const [doctorsSelected, setDoctorsSelected] = useState([]);
  const [showPatchError, setShowPatchError] = useState(false);
  const [patchError, setPatchError] = useState();
  const [isPatchedData, setIsPatchedData] = useState(false);
  const [patchEdited, setPatchEdited] = useState(false);
  const [patchRequest, setPatchRequest] = useState({});
  const [swiperDirection, setSwipeDirection] = useState();
  const [dataChanged, setDataChanged] = useState(false);
  const [submitSTP, setSubmitSTP] = useState();
  const [stpStatus, setStpStatus] = useState();
  const [updatedPatchArray, setUpdatedPatchArray] = useState([]);
  const weekNum = Number(week);
  const staffPositionId = useSelector(appSelector.getStaffPositionId());
  const weekDayCount = workingDays.indexOf(weekDay) + 1;
  const selectedDayNumber = (weekNum - 1) * workingDays?.length + weekDayCount;

  const submitSTPSelector = useSelector(monthlyTourPlanSelector.submitSTP());
  const stpStatusSelector = useSelector(monthlyTourPlanSelector.getSTPStatus());
  const rulesWarning = useSelector(planComplianceSelector.getWarningOnRules());
  const XMonthValue = useSelector(planComplianceSelector.getXMonthValue());
  useEffect(() => setSubmitSTP(submitSTPSelector), [submitSTPSelector]);
  useEffect(() => setStpStatus(stpStatusSelector), [stpStatusSelector]);

  /**
   * Show toast message to warn user that he has exceeded max doctor/chemist count
   * once toast hides, save/update patch
   */
  const showRulesWarning = () => {
    if ((rulesWarning || []).length > 0) {
      showToast({
        type: Constants.TOAST_TYPES.WARNING,
        autoHide: true,
        defaultVisibilityTime: 1000,
        props: {
          onClose: () => {
            hideToast();
            handleDonePress(doctorsSelected);
          },
          heading: translate('errorMessage.partiesExceedingMaxLimit'),
        },
        onHide: () => {
          handleDonePress(doctorsSelected);
        },
      });
    } else {
      handleDonePress(doctorsSelected);
    }
  };

  /**
   * To render error when min Gap rule is not met
   */
  const showGapRulesErrror = useCallback(
    code => {
      dispatchGapRule(code);
      showToast({
        type: Constants.TOAST_TYPES.ALERT,
        autoHide: true,
        defaultVisibilityTime: 1000,
        props: {
          onClose: () => {
            hideToast();
            dispatchGapRule(null);
          },
          heading: translate('errorMessage.gapRule'),
        },
        onHide: () => {
          dispatchGapRule(null);
        },
      });
    },
    [dispatchGapRule],
  );
  /**
   * callback function to return direction left/right of day swiper
   * @param {String} direction
   */
  const handleIndex = useCallback(
    async direction => {
      if (
        patchSelected &&
        dataChanged &&
        !savePatchRes &&
        doctorsSelected.length > 0 &&
        submitSTP?.status !== STP_STATUS.SUBMITTED &&
        stpStatus?.status !== STP_STATUS.SUBMITTED
      ) {
        setSwipeDirection(direction);
        showRulesWarning();
      } else {
        resetandChangePage(direction, dataChanged);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      patchSelected,
      dataChanged,
      savePatchRes,
      doctorsSelected,
      submitSTP?.status,
      stpStatus?.status,
      handleDonePress,
      resetandChangePage,
    ],
  );

  /**
   * function to reset data
   * @param {String} direction
   */
  const resetandChangePage = useCallback(
    async (direction, changed) => {
      const reset = await resetState();
      if (reset && changed) {
        setTimeout(() => {
          handleSliderIndex(direction);
        }, 300);
      } else {
        handleSliderIndex(direction);
      }
    },
    [handleSliderIndex, resetState],
  );

  const resetState = useCallback(async () => {
    await setAreaSelected([]);
    await setDoctorsSelected([]);
    await setIsPatchedData(false);
    await setPatchEdited(false);
    await setShowPatchError(false);
    await setPatchError(null);
    await setPatchSelected(null);
    await setPatchDefaultValue(null);
    await setPatchValue(null);
    await setDataChanged(false);
    await dispatch(standardPlanActions.resetState());
    return true;
  }, [dispatch]);

  const allParties = useSelector(standardTourPlanSelector.getParties());
  const allAreas = useSelector(standardTourPlanSelector.getAreas());
  const allPatches = useSelector(standardTourPlanSelector.getPatches());
  const savePatchRes = useSelector(standardTourPlanSelector.savePatch());
  const getUpdatedPartyArray = useSelector(
    standardTourPlanSelector.getUpdatedPartyArray(),
  );
  const selectedDoctorCount = useSelector(
    standardTourPlanSelector.getSelectedDoctorCount(),
  );
  const selectedChemistCount = useSelector(
    standardTourPlanSelector.getSelectedChemistCount(),
  );
  // number of doctors  for whom  frequency ehauseted
  const exhaustedDrFrequencyCount = useSelector(
    standardTourPlanSelector.getExhaustedDrFrequencyCount(),
  );

  useEffect(() => {
    setUpdatedPatchArray(getUpdatedPartyArray);
  }, [getUpdatedPartyArray]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setPatches(allPatches);
  }, [allPatches]);

  useEffect(() => {
    let ptch = null;
    allPatches?.map(patch => {
      if (isSameDayPatch(patch)) {
        ptch = {...patch, value: patch.displayName};
      }
    });
    if (ptch) {
      if (!isSameDayPatch(ptch)) {
        setDataChanged(true);
      }
      setIsPatchedData(true);

      handleDropDownValue(ptch);
    }
  }, [allPatches, handleDropDownValue, isSameDayPatch]);

  useEffect(() => {
    if (savePatchRes) {
      validateSaveResponse(patchRequest, patchValue?.id);
    }
  }, [savePatchRes, validateSaveResponse, patchRequest, patchValue]);

  const allPartiesByPatchID = useSelector(
    standardTourPlanSelector.getPartiesByPatchID(),
  );

  useEffect(() => {
    if (allPartiesByPatchID && allParties.length > 0) {
      setDoctorsSelected(allPartiesByPatchID);
      getSelectedArea(allPartiesByPatchID);
    }
  }, [getSelectedArea, allPartiesByPatchID, allParties]);

  const dispatchGapRule = useCallback(
    code => {
      dispatch(planComplianceActions.setGapRuleErrorCode(code));
    },
    [dispatch],
  );

  /**mehtod to load the initial state of daily plan */
  const loadData = useCallback(async () => {
    await dispatch(
      fetchPartiesCreator({
        staffPositionId,
      }),
    );

    await dispatch(
      fetchPatchesCreator({
        staffPositionId,
      }),
    );
    await dispatch(
      fetchAreasCreator({
        staffPositionId,
      }),
    );
  }, [dispatch, staffPositionId]);

  /** function to set area selected on chip click and update areaSelected state*/
  const getSelectedArea = useCallback(
    ids => {
      if (ids?.length > 0 && allParties.length > 0) {
        let patchAreaList = [];
        (allParties || []).map(party => {
          ids.map(id => {
            if (id.partyId === party.id) {
              patchAreaList.push(id.areaId);
            }
          });
        });
        const a = allAreas?.filter(
          area => patchAreaList.indexOf(area.id) !== -1,
        );
        setAreaSelected(a);
      }
    },
    [allParties, allAreas],
  );

  /** function to count party for all areas and return an obj*/
  const getPartyCountFromArea = useCallback(() => {
    if (updatedPatchArray.length > 0 && allAreas.length > 0) {
      const areaData = (allAreas || []).map(area => {
        return {
          ...area,
          totalPartiesInArea: getDoctorsByArea(area.id, false).length,
          totalUniqueParty: doctorsSelected && getAreaCountOnFrequecy(area.id),
        };
      });
      return areaData;
    }
  }, [
    getDoctorsByArea,
    allAreas,
    updatedPatchArray,
    getAreaCountOnFrequecy,
    doctorsSelected,
  ]);

  /**method to get doctor visited in area
   * @param {String} id area id passed
   * @return {String} count of doctor visited
   */
  const getAreaCountOnFrequecy = useCallback(
    id => {
      let count = 0;
      updatedPatchArray?.map(party => {
        party.areas.map(area => {
          if (area.id === id && party.alreadyVisitedCount > 0) {
            count = count + 1;
          }
        });
      });
      return count;
    },
    [updatedPatchArray],
  );

  /** function to removed doctors from specific area on press
   * @param {Number} areaId area id passed
   */
  const removeSelectedDoctorFromArea = useCallback(
    async areaId => {
      let doctorArr = doctorsSelected;
      allParties.map(party => {
        const doctorToRemove = doctorsSelected?.find(
          obj => obj.partyId === party.id && obj.areaId === areaId,
        );
        if (doctorToRemove) {
          doctorArr = doctorArr.filter(
            doc =>
              !(
                doc.partyId === doctorToRemove.partyId &&
                doc.areaId === doctorToRemove.areaId
              ),
          );
        }
      });
      setDoctorsSelected(doctorArr);
      updateString(doctorArr);
    },
    [doctorsSelected, allParties, updateString],
  );

  /** function to create patch string to be put in patch input field*/
  const createPatchString = useCallback((areas, doctors, partyList, ptches) => {
    let patchString = (areas || [])
      .filter(area => {
        const partyData = partyList.find(party =>
          doctors?.some(
            obj => obj.partyId === party.id && obj.areaId === area.id,
          ),
        );
        return partyData ? true : false;
      })
      .map(patch => patch.name)
      .join(' + ');
    const patchCount = (ptches || []).filter(
      p =>
        p.displayName?.split(' (')[0] === patchString ||
        p.defaultName?.split(' (')[0] === patchString,
    );
    if (patchCount) {
      patchString = patchString
        ? patchString +
          ` (${patchCount.length === 0 ? 1 : patchCount.length + 1})`
        : '';
    }
    return patchString;
  }, []);

  /** function to filter parties by area selected from area chiklets
   * @param {Number} area area id passed as number
   */
  const getDoctorsByArea = useCallback(
    (area, totalCount) => {
      if (allParties.length > 0) {
        const partiesData = allParties.filter(party => {
          const isArea = party.areas.find(obj => {
            return (
              obj.id === area &&
              (party.partyTypes.name === selectedDoctorType ||
                selectedDoctorType === Strings.all)
            );
          });
          if (isArea) {
            return party;
          }
        });
        let newPartiesData = partiesData;
        if (totalCount && !isSameDayPatch(patchValue)) {
          newPartiesData = partiesData?.filter(
            par => par.frequency !== par.alreadyVisited,
          );
        }
        return newPartiesData;
      }
    },
    [allParties, selectedDoctorType, isSameDayPatch, patchValue],
  );

  const isGapRuleWarning = code => {
    const ShowGapRuleWarning =
      code === Constants.HTTP_PATCH_CODE.VISIT_FOR_2_DOC ||
      code === Constants.HTTP_PATCH_CODE.VISIT_FOR_3_DOC ||
      code === Constants.HTTP_PATCH_CODE.VISIT_FOR_4_DOC;
    return ShowGapRuleWarning;
  };
  /** function to validate the response from endpoint in case of save and updating the patch */
  const validateSaveResponse = useCallback(
    async (obj, id) => {
      if (savePatchRes && patchSelected) {
        if (savePatchRes?.status === Constants.HTTP_OK) {
          showToast({
            type: Constants.TOAST_TYPES.SUCCESS,
            autoHide: true,
            props: {
              onPress: () => {
                hideToast();
              },
              onClose: () => hideToast(),
              heading: Strings.success,
              subHeading: swiperDirection
                ? Strings.patchSaveForPrevDay
                : Strings.patchSaved,
            },
          });
          setDataChanged(false);
          if (swiperDirection) {
            resetandChangePage(swiperDirection);
          } else {
            resetState();
            loadData();
          }
        } else if (
          savePatchRes?.status === Constants.HTTP_PATCH_CODE.VALIDATED
        ) {
          if (
            savePatchRes?.data?.details[0]?.code ===
            Constants.HTTP_PATCH_CODE.ALREADY_EXITS
          ) {
            setPatchError(Strings.patchAlreadyExists);
            setShowPatchError(true);
          } else if (
            savePatchRes?.data?.details[0]?.code ===
              Constants.HTTP_PATCH_CODE.PATCH_EXITS_FOR_OTHER_DAY ||
            savePatchRes?.data?.details[0]?.code ===
              Constants.HTTP_PATCH_CODE.PATCH_EXHAUSTED
          ) {
            showOverrideNotification(
              obj,
              id,
              savePatchRes?.data?.details[0]?.code,
              savePatchRes?.data?.details,
            );
          } else if (isGapRuleWarning(savePatchRes?.data?.details[0]?.code)) {
            showGapRulesErrror(savePatchRes?.data?.details[0]?.code);
          } else {
            setPatchError(Strings.already30PatchesCreated);
          }
        } else {
          setPatchError(Strings.somethingWentWrong);
          setShowPatchError(true);
        }
        dispatch(standardPlanActions.resetSavePatch());
      }
    },
    [
      savePatchRes,
      patchSelected,
      dispatch,
      swiperDirection,
      resetandChangePage,
      resetState,
      loadData,
      showOverrideNotification,
      showGapRulesErrror,
    ],
  );

  const handleDonePress = useCallback(
    async partyIds => {
      const obj = {
        displayName: patchSelected,
        defaultName: patchDefaultValue,
        partyMapping: partyIds || doctorsSelected,
        week: weekNum,
        weekDay,
        year: year,
        patchAlreadyExist: false,
      };
      setPatchError(null);
      setPatchRequest(obj);
      const isPatchOfSameDay = isSameDayPatch(patchValue);
      const isAnyPartyExhausted = checkPartyExhausted(partyIds);

      if (!patchValue) {
        savePatch(obj);
      } else if (isAnyPartyExhausted.length > 0 && !isPatchOfSameDay) {
        handleExhaustedParty(obj, isAnyPartyExhausted);
      } else if (patchValue && isPatchOfSameDay && dataChanged) {
        updatePatch(obj, patchValue.id, false);
      } else if (patchValue && !isPatchOfSameDay && !isPatchedData) {
        savePatch(obj);
      } else if (patchValue && !isPatchOfSameDay && isPatchedData) {
        updatePatch(obj, patchValue.id, false);
      }
    },
    [
      patchDefaultValue,
      patchSelected,
      patchValue,
      savePatch,
      updatePatch,
      weekDay,
      weekNum,
      year,
      isSameDayPatch,
      dataChanged,
      isPatchedData,
      doctorsSelected,
      checkPartyExhausted,
      handleExhaustedParty,
    ],
  );

  /** function to show notification in case of updating the patch
   * @param {Object} obj patch request has been passed as object
   */
  const showOverrideNotification = useCallback(
    (obj, id, code, errors) => {
      showToast({
        type: Constants.TOAST_TYPES.NOTIFICATION,
        autoHide: false,
        props: {
          onPress: () => {
            hideToast();
          },
          onClose: () => hideToast(),
          heading: Strings.confirmation,
          subHeading:
            code === Constants.HTTP_PATCH_CODE.PATCH_EXHAUSTED
              ? Strings.patchExhaustedForParty
              : Strings.patchUsedForOtherWeekDay,
          actionLeftTitle: Strings.yes,
          actionRightTitle: Strings.no,
          onPressLeftBtn: () => {
            if (code === Constants.HTTP_PATCH_CODE.PATCH_EXHAUSTED) {
              handleNoPress(
                obj,
                areaSelected,
                doctorsSelected,
                allParties,
                patches,
                false,
              );
            } else {
              const isPatchExhausted = errors.some(
                error =>
                  error.code === Constants.HTTP_PATCH_CODE.PATCH_EXHAUSTED,
              );
              if (
                isPatchExhausted &&
                code === Constants.HTTP_PATCH_CODE.PATCH_EXITS_FOR_OTHER_DAY
              ) {
                checkPatchExhausted(obj, id, errors);
              } else {
                updatePatch(obj, id, true);
              }
            }
          },
          onPressRightBtn: () => {
            if (code === Constants.HTTP_PATCH_CODE.PATCH_EXITS_FOR_OTHER_DAY) {
              handleNoPress(
                obj,
                areaSelected,
                doctorsSelected,
                allParties,
                patches,
                true,
              );
            } else {
              const docIds = errors.find(err => err.code === code);
              setDoctorsSelected(
                doctorsSelected.filter(
                  doc => docIds?.params?.partyIds.indexOf(doc.partyId) === -1,
                ),
              );
              hideToast();
            }
          },
        },
      });
    },
    [
      updatePatch,
      handleNoPress,
      areaSelected,
      patches,
      doctorsSelected,
      allParties,
      checkPatchExhausted,
    ],
  );

  /**function to check if patch is exhausted
   * @param {Object} obj request obj to update
   * @param {String} id patch id to update
   * @param {Array} errors errors as Array got while updating
   */
  const checkPatchExhausted = useCallback(
    (obj, id, errors) => {
      if (
        errors.some(
          error => error.code === Constants.HTTP_PATCH_CODE.PATCH_EXHAUSTED,
        )
      ) {
        showOverrideNotification(
          obj,
          id,
          Constants.HTTP_PATCH_CODE.PATCH_EXHAUSTED,
          errors,
        );
      }
    },
    [showOverrideNotification],
  );

  /**method to check if any party selected in a patch got exhausted
   * @param {Array} ids selected doctors id passed as an Array
   * @returns {Boolean} return Boolean if any party got exhausted
   */
  const checkPartyExhausted = useCallback(
    ids => {
      return allParties.filter(
        party =>
          ids.some(id => id.partyId === party.id) &&
          party.frequency <= party.alreadyVisited,
      );
    },
    [allParties],
  );

  /**method to handle done button in case of exhausted party
   * @param {Object} obj request to pass as an object
   * @param {Array} exhaustedParty list of exhausted party in an Array
   */
  const handleExhaustedParty = useCallback(
    (obj, exhaustedParty) => {
      const updatedPartyList = doctorsSelected?.filter(
        party => !exhaustedParty.some(par => par.id === party.partyId),
      );
      let message = null;
      if (
        exhaustedParty.length >= 1 &&
        doctorsSelected.length > 1 &&
        exhaustedParty.length !== doctorsSelected.length
      ) {
        setDoctorsSelected(updatedPartyList);
        handleNoPress(
          obj,
          allAreas,
          updatedPartyList,
          allParties,
          patches,
          false,
        );
        message = Strings.frquecySlotExhausted;
      } else if (
        (exhaustedParty.length === 1 && doctorsSelected.length === 1) ||
        exhaustedParty.length === doctorsSelected.length
      ) {
        setDoctorsSelected(updatedPartyList);
        message = Strings.selectDocToCreatePatch;
      }

      showToast({
        type: Constants.TOAST_TYPES.WARNING,
        autoHide: false,
        props: {
          onPress: () => {
            hideToast();
          },
          onClose: () => hideToast(),
          heading: Strings.warning,
          subHeading: message,
        },
      });
    },
    [allAreas, doctorsSelected, handleNoPress, allParties, patches],
  );

  /**function to create new patch on databse if No button on override notification is pressed
   * @param {Object} obj request obj to update
   * @param {Array} areas errors as Array got while updating
   * @param {Array} doctors selected doctors passed as an Array
   * @param {Array} partyList list of parties
   * @param {Array} ptches lsit of patches
   */
  const handleNoPress = useCallback(
    async (obj, areas, doctors, partyList, ptches, patchExists) => {
      const string = createPatchString(areas, doctors, partyList, ptches);
      await setPatchSelected(string);
      await setPatchDefaultValue(string);
      savePatch({
        ...obj,
        partyMapping: doctors,
        displayName: string,
        defaultName: string,
        patchAlreadyExist: patchExists,
      });
    },
    [createPatchString, savePatch],
  );

  /** function to save patch
   * @param {Object} obj patch request has been passed as object
   */
  const updateSTPCalendar = useCallback(
    obj => {
      dispatch(
        fetchSTPCalendarUpdateCreator({
          staffPositionId,
        }),
      );
      dispatch(
        fetchPlanComplianceCreator({
          staffPositionId,
          type: 'monthly',
        }),
      );
    },
    [dispatch, staffPositionId],
  );

  /** function to save patch
   * @param {Object} obj patch request has been passed as object
   */
  const savePatch = useCallback(
    obj => {
      dispatch(
        savePatchCreator({
          obj,
          type: 'post',
          staffPositionId,
        }),
      );
      hideToast();
    },
    [dispatch, staffPositionId],
  );

  /** function to update patch
   * @param {Object} obj patch request has been passed as object
   */
  const updatePatch = useCallback(
    (obj, id, acknowledge) => {
      dispatch(
        savePatchCreator({
          obj: {
            ...(obj || patchRequest),
            patchId: id,
            isUserAcknowledge: acknowledge,
          },
          type: 'put',
          staffPositionId,
        }),
      );
      hideToast();
    },
    [dispatch, patchRequest, staffPositionId],
  );

  /** function to filter parties by doctors, chemist, all
   * @param {Object} obj patch request has been passed as object
   */
  const handlePartyByType = val => {
    if (val !== Strings.all) {
      setParties(parties.filter(party => party.partyTypes.name === val));
      setSelectedDoctorType(val);
    } else {
      setParties(parties);
      setSelectedDoctorType(Strings.all);
    }
  };

  /**
   *  Handles Card click event& accept an id of party
   * @param {Number} id party id passed as int
   */
  const handleDoctorCardPress = (id, area) => {
    const indexAvailable = doctorsSelected?.some(
      party => party.partyId === id && party.areaId === area,
    );
    let selected = null;
    if (indexAvailable) {
      selected = doctorsSelected?.filter(
        party => !(id === party.partyId && area === party.areaId),
      );
    } else {
      selected = [...doctorsSelected, {partyId: id, areaId: area}];
    }

    const partyExhausted = checkSelectedPartyExhausted(selected);
    if (partyExhausted.length > 0 && !isSameDayPatch(patchValue)) {
      selected = selected?.filter(
        party => !partyExhausted?.some(par => par.id === party.partyId),
      );
    }

    setDoctorsSelected(selected || []);
    updateString(selected);
    setDataChanged(true);
  };

  /**method to update the string for display and default name
   * @param {Array} partArr selected doctor list passed as an array
   */
  const updateString = useCallback(
    partyArr => {
      const string = createPatchString(
        areaSelected,
        partyArr || [],
        allParties,
        patches,
      );
      if (isSameDayPatch(patchValue)) {
        if (patchValue?.defaultName === patchValue?.displayName) {
          setPatchDefaultValue(string);
          if (
            patchValue?.defaultName.split(' (')[0] === string.split(' (')[0]
          ) {
            setPatchSelected(patchValue?.defaultName);
            setPatchDefaultValue(patchValue?.defaultName);
          } else {
            setPatchSelected(string);
          }
        }
      } else {
        setIsPatchedData(false);
        if (!patchEdited) {
          setPatchSelected(string);
        }
        if (string !== patchValue?.defaultName) {
          setPatchValue(null);
        }
        setPatchDefaultValue(string);
      }
    },
    [
      allParties,
      areaSelected,
      createPatchString,
      isSameDayPatch,
      patchEdited,
      patchValue,
      patches,
    ],
  );

  /** function to handle value of patch input field and check validation on string
   * @param {String} val string passed from input field
   */
  const handlePatchInputChange = val => {
    const regex = /^[ A-Za-z0-9-+&()]*$/;
    if (val.length < 64 && regex.test(val)) {
      setPatchSelected(val);
      setPatchEdited(true);
    }
  };

  /** handle value of dropdown if patch selected
   * @param {Object} val passed from dropdown
   */
  const handleDropDownValue = useCallback(
    async val => {
      if (val) {
        await setPatchValue(val);
        await setPatchSelected(val.displayName);
        await setPatchDefaultValue(val.defaultName);
        setIsPatchedData(true);
        if (!isSameDayPatch(val)) {
          setDataChanged(true);
        }

        dispatch(
          fetchPartiesByPatchIdCreator({
            patchID: val.id,
          }),
        );
      }
    },
    [dispatch, isSameDayPatch],
  );

  /** function to filter parties by area selected
   * @param {Number} id area id passed from party object
   */
  const getSelectedPartyByArea = useCallback(
    id => {
      let count = 0;
      getDoctorsByArea(id, true).map(party => {
        if (
          doctorsSelected?.filter(
            doc => doc.partyId === party.id && doc.areaId === id,
          ).length > 0
        ) {
          count = count + 1;
        }
      });
      return count;
    },
    [doctorsSelected, getDoctorsByArea],
  );

  /**
   *  Handle singular & plural
   * @param {Number} count
   * @returns string
   */
  const getSuffix = count => (count > 1 ? 's' : '');

  /** function to filter parties by party type eg. doctors,chemist and all*/
  const getSelectedPartyByType = useCallback(() => {
    if (allParties.length > 0 && doctorsSelected.length > 0) {
      const obj = {doctor: 0, chemist: 0};
      allParties.map(party => {
        if (
          doctorsSelected?.some(
            id =>
              id.partyId === party.id &&
              areaSelected.some(area => area.id === id.areaId),
          )
        ) {
          if (party.partyTypes.name === PARTY_TYPE.DOCTOR) {
            obj.doctor = obj.doctor + 1;
          } else {
            obj.chemist = obj.chemist + 1;
          }
        }
      });
      if (selectedDoctorType === PARTY_TYPE.CHEMIST) {
        let partyCount = obj.chemist;
        return (
          partyCount > 0 &&
          ` - ${partyCount} ${PARTY_TYPE.CHEMIST.toLowerCase()}${getSuffix(
            partyCount,
          )}`
        );
      } else if (selectedDoctorType === PARTY_TYPE.DOCTOR) {
        let partyCount = obj.doctor;
        return (
          partyCount > 0 &&
          ` - ${partyCount} ${PARTY_TYPE.DOCTOR.toLowerCase()}${getSuffix(
            partyCount,
          )}`
        );
      }
      return `${
        obj.doctor > 0 || obj.chemist > 0
          ? ` - ${obj.doctor + obj.chemist} `
          : ''
      }${
        obj.doctor > 0
          ? `(${obj.doctor} doctor${obj.doctor > 1 ? 's' : ''}`
          : ''
      }${obj.doctor > 0 && obj.chemist > 0 ? ', ' : ''}${
        obj.doctor > 0 && obj.chemist === 0 ? ')' : ''
      }${obj.doctor === 0 && obj.chemist > 0 ? '(' : ''}${
        obj.chemist > 0 ? `${obj.chemist} chemist)` : ''
      }`;
    } else {
      return '';
    }
  }, [doctorsSelected, allParties, selectedDoctorType, areaSelected]);

  /**
   * Reset STP data on click of close
   */
  const resetSTPState = useCallback(async () => {
    await dispatch(standardPlanActions.STPCalendarUpdate({stpData: []}));
    return true;
  }, [dispatch]);
  /**
   * function to close stp page
   */
  const handleClose = () => {
    resetState();
    resetSTPState();
    updateSTPCalendar();
    navigation.pop();
  };

  /**
   * function to check if patch is of same day
   * @param {Object} patch selected patch data is passed as an object
   */
  const isSameDayPatch = useCallback(
    patch => {
      return patch?.usedOn?.some(
        pat =>
          weekNum === pat?.week &&
          weekDay === pat?.weekDay &&
          year === pat?.year,
      );
    },
    [weekNum, weekDay, year],
  );

  /**
   * Returns data of selectedParty
   */
  const getSelectedPartyTypeHandler = useCallback(() => {
    return getSelectedPartyTypeData(
      doctorsSelected,
      updatedPatchArray,
      dataChanged,
      selectedDoctorCount,
      selectedChemistCount,
      exhaustedDrFrequencyCount,
      selectedDayNumber,
      XMonthValue,
      getPartyCountFromArea(),
    );
  }, [
    doctorsSelected,
    updatedPatchArray,
    dataChanged,
    selectedDoctorCount,
    selectedChemistCount,
    exhaustedDrFrequencyCount,
    selectedDayNumber,
    XMonthValue,
    getPartyCountFromArea,
  ]);

  /**method to check if party in doctorsSelected got exhausted
   * @param {Array} ids selected partys in array
   * @return {Array} exhausted party in array is returned
   */
  const checkSelectedPartyExhausted = ids => {
    return allParties.filter(party => {
      return ids?.some(
        par =>
          par.partyId === party.id && party.frequency <= party.alreadyVisited,
      );
    });
  };

  if (allParties.length === 0 || allAreas.length === 0) {
    return (
      <ActivityIndicator
        animating={true}
        color={themes.colors.darkBlue}
        size="large"
        style={styles.activityIndicator}
      />
    );
  }
  return (
    <ScrollView style={[styles.containerStyle, {height}]}>
      <View style={styles.modalHeader}>
        <View>
          <Label title={Strings.selectDoctorAndChemist} size={18.7} />
          <View style={styles.week}>
            {weekDay !== workingDays[0] && (
              <TouchableOpacity
                onPress={() => handleIndex(Constants.DIRECTION.LEFT)}>
                <Icon
                  iconStyle={styles.weekArrow}
                  name="angle-left"
                  size={24}
                />
              </TouchableOpacity>
            )}
            <Label
              style={styles.weekLabel}
              title={`${Strings.weekText} ${week} - ${weekDay}`}
              variant={LabelVariant.h3}
              type={'bold'}
            />
            {weekDay !== workingDays[workingDays.length - 1] && (
              <TouchableOpacity
                onPress={() => handleIndex(Constants.DIRECTION.RIGHT)}>
                <Icon
                  iconStyle={styles.weekArrow}
                  name="angle-right"
                  size={24}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <View style={[styles.patchContainer]}>
          <View style={styles.patchInputCotainer}>
            <TextInput
              value={patchSelected}
              placeholder={Strings.patchName}
              style={styles.patchInput}
              editable={!patchValue && !patchDefaultValue ? false : true}
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
            disabled={
              !patchSelected ||
              !dataChanged ||
              doctorsSelected.length === 0 ||
              submitSTP?.status === STP_STATUS.SUBMITTED ||
              stpStatus?.status === STP_STATUS.SUBMITTED ||
              false
            }
            contentStyle={styles.doneBtn}
            onPress={() => showRulesWarning()}
          />
          <Button
            mode="outlined"
            title={Strings.close}
            uppercase={true}
            contentStyle={styles.closeBtn}
            onPress={() => handleClose()}
          />
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.leftContent}>
          <Areas
            areaSelected={areaSelected}
            setAreaSelected={setAreaSelected}
            areaList={getPartyCountFromArea()}
            onPress={val => removeSelectedDoctorFromArea(val)}
            handleDropDownValue={handleDropDownValue}
            isPatchedData={isPatchedData}
            allPatches={allPatches}
            partyInArea={id => getSelectedPartyByArea(id)}
          />
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
                  {PARTY_TYPES.map((type, i) => (
                    <Area
                      key={i}
                      selectedTextColor={themes.colors.white}
                      selectedColor={themes.colors.primary}
                      selected={selectedDoctorType === type}
                      title={type}
                      value={type}
                      bgColor={themes.colors.white}
                      color={'#524F67'}
                      onPress={val => handlePartyByType(val)}
                      testID={`btn_stp_party_type_${type}_test`}
                      textStyle={styles.areaType}
                    />
                  ))}
                </View>
              </View>
              <DoctorsByArea
                areaSelected={areaSelected}
                // doctorsByArea={getDoctorsByArea}
                doctorsSelected={doctorsSelected}
                handleDoctorCardPress={handleDoctorCardPress}
                isPatchedData={isPatchedData}
                selectedPartyByArea={getSelectedPartyByArea}
                partiesList={allParties}
                selectedDoctorType={selectedDoctorType}
                patchValue={patchValue}
                allPartiesByPatchID={allPartiesByPatchID}
                isSameDayPatch={isSameDayPatch(patchValue)}
              />
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
                    title={`${Strings.doctorUniverse} (${allParties.length})`}
                    uppercase={false}
                    contentStyle={styles.doneBtn}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.rightContent}>
          <Label
            variant={LabelVariant.h4}
            title={Strings.planCompliance}
            style={styles.planComplainceLabel}
          />
          <PlanCompliance
            type={COMPLAINCE_TYPE.DAILY}
            week={week}
            weekDay={weekDayCount}
            selectedData={getSelectedPartyTypeHandler()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const {height} = Dimensions.get('window');

StandardPlanModal.defaultProps = {
  handleSliderIndex: () => {},
};

StandardPlanModal.propsTypes = {
  handleSliderIndex: PropTypes.func,
};

export default StandardPlanModal;
