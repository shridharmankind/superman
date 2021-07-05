import React, {useEffect, useState, useCallback} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Label, LabelVariant} from 'components/elements';
import {SingleAvtar, JointAvtar, mockMR, JointAvtarWhite} from 'assets';
import {Strings} from 'common';
import styles from './styles';
import themes from 'themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  visitDetail,
  dcrSelector,
} from 'screens/directory/doctorDetails/doctorFeedback/redux';
import {useDispatch, useSelector} from 'react-redux';

const VisitDetail = ({
  index,
  width,
  seniorList,
  addDoctorHandler,
  hideShowRightArrow,
}) => {
  const [typeOfVisit, updateVisitType] = useState('single');
  const dispatch = useDispatch();

  // TO DO
  // useEffect(() => {
  //   if (visitors.length >= 1) {
  //     updateVisit('Joint');
  //     hideShowRightArrow(true);
  //   } else {
  //     updateVisit('single');
  //     if (typeOfVisit === 'single') {
  //       hideShowRightArrow(true);
  //     } else {
  //       hideShowRightArrow(false);
  //     }
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [visitors, addSeniors]);

  const updateVisit = visitType => {
    updateVisitType(visitType);
    if (visitType === 'single' && visitors.length > 0) {
      dispatch(visitDetail([]));
    }
  };

  const visitors = useSelector(dcrSelector.getVisitors());
  useEffect(() => {
    if (visitors) {
      if (visitors.length === 1) {
        updateVisit('joint');
        hideShowRightArrow(false);
      } else if (visitors.length === 0) {
        if (typeOfVisit === 'joint') {
          hideShowRightArrow(true);
        } else {
          updateVisit('single');
          hideShowRightArrow(false);
        }
      } else if (visitors.length > 1) {
        updateVisit('joint');
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visitors, typeOfVisit]);

  const addSeniors = seniorId => {
    const checkIndex = visitors.findIndex(ele => ele === seniorId);
    if (checkIndex >= 0) {
      let tempArr = [...visitors];
      tempArr.splice(checkIndex, 1);
      dispatch(visitDetail(tempArr));
    } else {
      dispatch(visitDetail([...visitors, seniorId]));
    }
  };

  const renderCircle = senior => {
    if (
      visitors.length > 0 &&
      visitors.findIndex(ele => ele === senior.id) >= 0
    ) {
      return (
        <View style={styles.checkStyling}>
          <Icon name="check-circle" size={18} color={themes.colors.primary} />
        </View>
      );
    }
  };

  return (
    <View style={[{width: width - 300}, styles.slideStyle]}>
      <View style={styles.questionSection}>
        <Text style={styles.question}>
          <Text style={{fontFamily: themes.fonts.fontBold}}>{index + 1}.</Text>
          {`${Strings.doctorDetail.dcr.what} `}
          <Text style={{fontFamily: themes.fonts.fontBold}}>
            {`${Strings.doctorDetail.dcr.kindOfVisit} `}
          </Text>
          {`${Strings.doctorDetail.dcr.wasIt}`}
        </Text>
      </View>
      <View style={styles.answerSection}>
        <View style={styles.leftAlign}>
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() => updateVisit('single')}
              style={
                typeOfVisit === 'single'
                  ? [styles.imgContainer, styles.highlightedVisitType]
                  : styles.imgContainer
              }>
              <Image
                source={typeOfVisit === 'joint' ? SingleAvtar : mockMR}
                style={
                  typeOfVisit === 'joint'
                    ? styles.avtarStyle
                    : styles.imageStyle
                }
              />
            </TouchableOpacity>
            <View
              style={
                typeOfVisit === 'joint' ? styles.centerHeading : styles.heading
              }>
              <Label
                style={styles.highlighted}
                variant={LabelVariant.subtitleLarge}>
                {Strings.doctorDetail.dcr.regVisit}
              </Label>
              <Label
                style={styles.highlighted}
                variant={LabelVariant.subtitleLarge}>
                ({Strings.doctorDetail.dcr.justMe})
              </Label>
            </View>
          </View>
        </View>

        <View style={styles.rightAlign}>
          <View style={styles.flexRow}>
            <TouchableOpacity
              onPress={() => updateVisit('joint')}
              style={
                typeOfVisit === 'joint'
                  ? [styles.imgContainer, styles.highlightedVisitType]
                  : styles.imgContainer
              }>
              {typeOfVisit === 'joint' ? (
                <Image
                  source={JointAvtarWhite}
                  style={styles.jointavtarStyle}
                />
              ) : (
                <Image source={JointAvtar} style={styles.jointavtarStyle} />
              )}
            </TouchableOpacity>
            <View style={styles.heading}>
              <Label variant={LabelVariant.subtitleLarge}>
                {Strings.doctorDetail.dcr.jointVisit}
              </Label>
              <Label variant={LabelVariant.subtitleLarge}>
                ({Strings.doctorDetail.dcr.posts})
              </Label>
            </View>
          </View>

          {typeOfVisit === 'joint' && (
            <View style={styles.jointVisitorSection}>
              <View style={styles.flexRow}>
                {!!seniorList &&
                  seniorList.map(senior => {
                    return (
                      <View style={styles.mrListSpacing}>
                        <TouchableOpacity
                          style={styles.smallImgContainer}
                          onPress={() => addSeniors(senior.id)}>
                          {renderCircle(senior)}
                          <Image source={mockMR} style={styles.imageStyle} />
                        </TouchableOpacity>
                        <View style={styles.heading}>
                          <Label
                            variant={LabelVariant.subtitleLarge}
                            title={`${senior.firstName} ${senior.lastName}`}
                          />
                          <Label
                            variant={LabelVariant.subtitleLarge}
                            title={senior.role}
                          />
                        </View>
                      </View>
                    );
                  })}
              </View>
            </View>
          )}
        </View>
      </View>
      <View style={styles.footerSection}>
        <Label
          testID="Add_Doctor_link"
          style={{
            color: themes.colors.primary,
            fontFamily: themes.fonts.fontSemiBold,
          }}
          title={`+ ${Strings.doctorDetail.dcr.addDoctor}`}
          onPress={addDoctorHandler}
        />
      </View>
    </View>
  );
};

export default VisitDetail;
