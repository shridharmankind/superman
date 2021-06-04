/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import dcrStyles from './styles';
import {Label, Button, LabelVariant} from 'components/elements';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {singleAvtar, jointAvtar} from 'assets';
import dayjs from 'dayjs';
import themes from 'themes';
import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Strings} from 'common';
import {getFormatDate} from 'utils/dateTimeHelper';

const DoctorFeedback = ({route}) => {
  const doctorData = route?.params?.data || null;
  const navigation = useNavigation();
  const items = [
    {name: 'question1', key: 1},
    {name: 'question2', key: 2},
  ];
  const {width} = Dimensions.get('window');

  // To close Feedback screen
  const closeFeedback = () => {
    navigation.pop();
  };

  const renderSlide = index => {
    return (
      <View style={[{width: width - 300}, dcrStyles.slideStyle]}>
        <View style={dcrStyles.questionSection}>
          <Text style={dcrStyles.question}>
            {index + 1}. {`${Strings.doctorDetail.dcr.what} `}
            <Text style={{fontFamily: themes.fonts.fontBold}}>
              {`${Strings.doctorDetail.dcr.kindOfVisit} `}
            </Text>{' '}
            {`${Strings.doctorDetail.dcr.wasIt}`}
          </Text>
        </View>
        <View style={dcrStyles.answerSection}>
          <View style={dcrStyles.leftAlign}>
            <View style={dcrStyles.imgContainer}>
              <Image source={singleAvtar} style={dcrStyles.avtarStyle} />
            </View>
            <View style={dcrStyles.heading}>
              <Label variant={LabelVariant.subtitleLarge}>
                {Strings.doctorDetail.dcr.regVisit}
              </Label>
              <Label variant={LabelVariant.subtitleLarge}>
                ({Strings.doctorDetail.dcr.justMe})
              </Label>
            </View>
          </View>

          <View style={dcrStyles.rightAlign}>
            <View style={dcrStyles.imgContainer}>
              <Image source={jointAvtar} style={dcrStyles.jointavtarStyle} />
            </View>
            <View style={dcrStyles.heading}>
              <Label variant={LabelVariant.subtitleLarge}>
                {Strings.doctorDetail.dcr.jointVisit}
              </Label>
              <Label variant={LabelVariant.subtitleLarge}>
                ({Strings.doctorDetail.dcr.posts})
              </Label>
            </View>
          </View>
        </View>
        <View style={dcrStyles.footerSection}>
          <Label
            style={{
              color: themes.colors.primary,
              fontFamily: themes.fonts.fontSemiBold,
            }}
            title={`+ ${Strings.doctorDetail.dcr.addDoctor}`}
          />
        </View>
      </View>
    );
  };
  return (
    <View style={dcrStyles.container}>
      <View style={dcrStyles.header}>
        <View>
          <View style={dcrStyles.headerDataStyle}>
            <TouchableOpacity
              style={dcrStyles.backArrow}
              onPress={closeFeedback}>
              <Icon
                name={'chevron-left'}
                size={15}
                color={themes.colors.grey[200]}
              />
            </TouchableOpacity>
            <Label
              variant={LabelVariant.h2}
              title={`${Strings.doctorDetail.dcr.feedback} - `}
            />
            <Label variant={LabelVariant.h2} title={doctorData.name} />
          </View>
          <View>
            <Label
              style={dcrStyles.dateStyling}
              title={getFormatDate({date: dayjs(), format: 'DD MMM YYYY'})}
            />
          </View>
        </View>
        <Button
          title={Strings.doctorDetail.dcr.btnDone}
          disabled={true}
          contentStyle={dcrStyles.button}
        />
      </View>
      <View style={dcrStyles.section}>
        <SwiperFlatList
          data={items}
          renderAll={false}
          showPagination
          paginationStyleItemActive={dcrStyles.activePaginationItem}
          paginationStyleItem={dcrStyles.paginationItem}
          paginationStyle={dcrStyles.paginationStyle}
          style={dcrStyles.swiperListStyle}
          renderItem={({index}) => renderSlide(index)}
        />
      </View>
    </View>
  );
};

export default DoctorFeedback;
