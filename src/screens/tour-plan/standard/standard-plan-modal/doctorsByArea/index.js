import React, {useCallback} from 'react';
import {View} from 'react-native';
import {Label, DoctorDetailsWrapper, LabelVariant} from 'components/elements';
import {Strings} from 'common';
import styles from './styles';
import {translate} from 'locale';

const DoctorsByArea = ({
  areaSelected,
  doctorsSelected,
  handleDoctorCardPress,
  isPatchedData,
  selectedPartyByArea,
  partiesList,
  selectedDoctorType,
  isSameDayPatch,
  allPartiesByPatchID,
  gapRulesIds,
}) => {
  const isDoctorSelected = useCallback(
    (partyId, area) => {
      return (doctorsSelected || []).some(
        party =>
          (party.partyId === partyId && party.areaId === area) ||
          (party.partyId === partyId && party.areaId !== area),
      );
    },
    [doctorsSelected],
  );

  /** function to filter parties by area selected from area chiklets
   * @param {Number} area area id passed as number
   */
  const getDoctorsByArea = useCallback(
    area => {
      const partiesData = (partiesList || []).filter(party => {
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

      const newPartiesData = partiesData.filter(party => {
        const isPatchedParty =
          allPartiesByPatchID?.length > 0 && isPartyInPatch(party.id, area);
        return (
          party.frequency > party.alreadyVisited ||
          (party.frequency === party.alreadyVisited && isPatchedParty)
        );
      });

      return newPartiesData;
    },
    [partiesList, selectedDoctorType, isPartyInPatch, allPartiesByPatchID],
  );

  /** function to render parties by area selected from area chiklets
   * @param {Object} area area object passed
   */
  const renderDoctors = useCallback(
    area => {
      const doctorInArea = getDoctorsByArea(area?.id);
      return doctorInArea?.length > 0 ? (
        <View style={styles.doctorDetails}>
          {doctorInArea.map((party, index) => (
            <DoctorDetailsWrapper
              key={party.id + area.id}
              id={party.id}
              title={party.shortName || party.name}
              specialization={party.specialities}
              category={party.category}
              isKyc={party.isKyc}
              isCampaign={party.isCampaign}
              selected={isDoctorSelected(party.id, area.id)}
              testID={`card_standard_plan_doctor_${party.id}_test`}
              party={party}
              isPatchedData={isPatchedData}
              onPress={id => handleDoctorCardPress(id, area.id)}
              containerStyle={index % 2 === 0 ? styles.left : styles.right}
              isSameDayPatch={isSameDayPatch}
              isPartyInPatch={isPartyInPatch(party.id, area.id)}
              isSameDoctorSelected={isSamePartySelectedInOtherArea(
                party.id,
                area.id,
              )}
              minGap={gapRulesIds?.indexOf(party.id) !== -1}
            />
          ))}
        </View>
      ) : (
        <Label
          title={translate('tourPlan.standard.noRecordsForSelection')}
          variant={LabelVariant.h4}
          type={'bold'}
        />
      );
    },
    [
      getDoctorsByArea,
      handleDoctorCardPress,
      isDoctorSelected,
      isPatchedData,
      isSameDayPatch,
      isPartyInPatch,
      isSamePartySelectedInOtherArea,
    ],
  );

  /** function to render area label by area selected from area chiklets
   * @param {Object} area area object passed
   */
  const renderAreaLabel = area => {
    return (
      <View style={styles.doctorSelectedContainer}>
        <Label
          title={area.name}
          variant={LabelVariant.subtitleSmall}
          testID={`label_stp_area_${area.id}_test`}
        />
        <Label
          title={` (${selectedPartyByArea(area.id)})`}
          type={'bold'}
          variant={LabelVariant.subtitleSmall}
        />
      </View>
    );
  };

  /**method to check if party is part of patch
   * @param {String} id party id
   * @return {Boolean}
   */
  const isPartyInPatch = useCallback(
    (id, area) => {
      return allPartiesByPatchID?.some(
        party => party.partyId === id && area === party.areaId,
      );
    },
    [allPartiesByPatchID],
  );

  /**check if party selected is also in other area
   * @param {String} id party id to check
   * @param {String} area party area id to check
   * @return {Boolean}
   */
  const isSamePartySelectedInOtherArea = useCallback(
    (id, area) => {
      return doctorsSelected?.some(
        par => par.partyId === id && par.areaId !== area,
      );
    },
    [doctorsSelected],
  );

  return (
    <View style={styles.doctorDetailsContainer}>
      {areaSelected.length > 0 ? (
        areaSelected?.map((area, i) => (
          <React.Fragment key={i}>
            {renderAreaLabel(area)}
            {renderDoctors(area)}
          </React.Fragment>
        ))
      ) : (
        <Label
          title={translate('tourPlan.standard.noRecordsForSelection')}
          variant={LabelVariant.h4}
          type={'bold'}
        />
      )}
    </View>
  );
};

export default DoctorsByArea;
