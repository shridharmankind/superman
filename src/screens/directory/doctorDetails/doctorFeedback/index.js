import React from 'react';
import {View, Text, Dimensions, Image} from 'react-native';
import styles from './styles';
import {Label, Button, LabelVariant} from 'components/elements';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {SingleAvtar, JointAvtar} from 'assets';
import dayjs from 'dayjs';
import themes from 'themes';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {Strings} from 'common';
import {getFormatDate} from 'utils/dateTimeHelper';
import {ArrowBack} from 'assets';

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
      <View style={[{width: width - 300}, styles.slideStyle]}>
        <View style={styles.questionSection}>
          <Text style={styles.question}>
            {index + 1}. {`${Strings.doctorDetail.dcr.what} `}
            <Text style={{fontFamily: themes.fonts.fontBold}}>
              {`${Strings.doctorDetail.dcr.kindOfVisit} `}
            </Text>
            {`${Strings.doctorDetail.dcr.wasIt}`}
          </Text>
        </View>
        <View style={styles.answerSection}>
          <View style={styles.leftAlign}>
            <View style={styles.imgContainer}>
              <Image source={SingleAvtar} style={styles.avtarStyle} />
            </View>
            <View style={styles.heading}>
              <Label variant={LabelVariant.subtitleLarge}>
                {Strings.doctorDetail.dcr.regVisit}
              </Label>
              <Label variant={LabelVariant.subtitleLarge}>
                ({Strings.doctorDetail.dcr.justMe})
              </Label>
            </View>
          </View>

          <View style={styles.rightAlign}>
            <View style={styles.imgContainer}>
              <Image source={JointAvtar} style={styles.jointavtarStyle} />
            </View>
            <View style={styles.heading}>
              <Label variant={LabelVariant.subtitleLarge}>
                {Strings.doctorDetail.dcr.jointVisit}
              </Label>
              <Label variant={LabelVariant.subtitleLarge}>
                ({Strings.doctorDetail.dcr.posts})
              </Label>
            </View>
          </View>
        </View>
        <View style={styles.footerSection}>
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
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <View style={styles.headerDataStyle}>
            <TouchableOpacity style={styles.backArrow} onPress={closeFeedback}>
              <ArrowBack width={34.7} height={34.7} />
            </TouchableOpacity>
            <Label
              variant={LabelVariant.h2}
              title={`${Strings.doctorDetail.dcr.feedback} - `}
            />
            <Label variant={LabelVariant.h2} title={doctorData.name} />
          </View>
          <View>
            <Label
              style={styles.dateStyling}
              title={getFormatDate({date: dayjs(), format: 'DD MMM YYYY'})}
            />
          </View>
        </View>
        <Button
          title={Strings.doctorDetail.dcr.btnDone}
          disabled={true}
          contentStyle={styles.button}
        />
      </View>
      <View style={styles.section}>
        <SwiperFlatList
          data={items}
          renderAll={false}
          showPagination
          paginationStyleItemActive={styles.activePaginationItem}
          paginationStyleItem={styles.paginationItem}
          paginationStyle={styles.paginationStyle}
          style={styles.swiperListStyle}
          renderItem={({index}) => renderSlide(index)}
        />
      </View>
    </View>
  );
};

export default DoctorFeedback;
