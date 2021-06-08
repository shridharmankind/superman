import React from 'react';
import {View} from 'react-native';
import styles from '../styles';
import {DoctorDetails} from 'components/elements';

/**
 * render list of doctors
 * @param {Object} dayPlanData array of parties
 * @param {Function} onTileNamePress click function on name of doctor in party tile
 * @param {Function} onTilePress click function on party tile
 */
const PartyList = ({dayPlanData, onTileNamePress, onTilePress}) => {
  const doctorDetailStyleObject = {
    nameContainerCustom: styles.nameContainer,
    specialization: styles.specialization,
    divisionContainerCustom: styles.divisionContainer,
    imageCustom: styles.image,
    detailsContainerCustom: styles.detailsContainer,
    titleSize: 21,
    subTitleSize: 14,
    divisionSize: 10,
  };

  /**
   * function to render the list of doctor's planned visits
   * @returns list of doctors planned for current day visit
   */
  const renderDayPlan = () => {
    return (
      <View style={styles.contentView}>
        {(dayPlanData || []).map((plan, index) => {
          return (
            <View style={styles.doctorDetailWrapper} key={index}>
              <View key={index} style={styles.doctorDetailContainer}>
                <DoctorDetails
                  title={plan.name}
                  specialization={plan.specialization}
                  category={plan.category}
                  location={plan.location}
                  customStyle={doctorDetailStyleObject}
                  showFrequencyChiclet={false}
                  showVisitPlan={true}
                  visitData={plan.visitData}
                  showTile={true}
                  onTileNamePress={() => {
                    onTileNamePress(plan.item);
                  }}
                  onTilePress={() => {
                    onTilePress(plan);
                  }}
                />
              </View>
            </View>
          );
        })}
      </View>
    );
  };
  return renderDayPlan();
};

export default PartyList;
