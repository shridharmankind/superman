import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';

import {ContentWithSidePanel} from 'components/layouts';
import {Label} from 'components/elements';

import styles from './styles';

const HomeLanding = () => {
  const renderHeader = () => (
    <View style={styles.header}>
      <Label type="bold" size={28} title="Good Morning" />
    </View>
  );

  const renderSidePanel = () => (
    <View style={styles.sidePanel}>
      <View style={styles.descContainer}>
        <Label type="bold" size={21} title="Upcoming Events" />
        <Label style={styles.desc} title="Birthdays & Anniversaries" />
      </View>
      <Card style={styles.card}>
        <Label title="Dr. Brijesh Agarwal" />
      </Card>
      <Card style={styles.card}>
        <Label title="Dr. Radhika Rao" />
      </Card>
      <Card style={styles.card}>
        <Label title="Dr. Priya Singh" />
      </Card>
      <Card style={styles.card}>
        <Label title="Dr. Rajesh Chouhan" />
      </Card>
    </View>
  );

  return (
    <ContentWithSidePanel header={renderHeader()} sidePanel={renderSidePanel()}>
      <Label title="Welcome to our beautiful Home Page" />
    </ContentWithSidePanel>
  );
};

export default HomeLanding;
