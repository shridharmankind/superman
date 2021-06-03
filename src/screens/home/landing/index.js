import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Card} from 'react-native-paper';

import {ContentWithSidePanel} from 'components/layouts';
import {Label} from 'components/elements';
import {translate} from 'locale';

import styles from './styles';

const HomeLanding = ({navigation}) => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Label style={styles.headerLabel} title="Hi Praveen," />
      <Label
        style={styles.headerLabel}
        type="semiBold"
        title={translate('goodMorning')}
      />
    </View>
  );

  const renderSidePanel = () => (
    <View style={styles.sidePanel}>
      <View style={styles.descContainer}>
        <Label type="bold" size={14} title="Upcoming Events" />
        <Label
          size={12}
          style={styles.desc}
          title="Birthdays & Anniversaries"
        />
      </View>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Brijesh Agarwal" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Radhika Rao" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Priya Singh" />
      </Card>
      <Card style={styles.card}>
        <Label size={12.7} title="Dr. Rajesh Chouhan" />
      </Card>
    </View>
  );

  return (
    <ContentWithSidePanel header={renderHeader()} sidePanel={renderSidePanel()}>
      <Label size={12.7} title="Welcome to our beautiful Home Page" />
      <TouchableOpacity
        onPress={() => navigation.navigate('HomeLandingSecondary')}>
        <Label size={12.7} title="route to secondary landing" />
      </TouchableOpacity>
    </ContentWithSidePanel>
  );
};

export default HomeLanding;
