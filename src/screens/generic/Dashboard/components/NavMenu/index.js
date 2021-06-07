import React, {useState} from 'react';
import {FlatList, Image, TouchableWithoutFeedback, View} from 'react-native';

import {Label, LabelVariant} from 'components/elements';
import {LogoMankind} from 'assets';

import styles from './styles';
import {LOGOUT_ITEM_ID} from '../../constants';

// TODO - mankind logo not showing on web
const NavMenu = ({onNavItemPress}) => {
  const [activeItem, setActiveItem] = useState(0);
  const navMenuData = require('./navMenuData').default;

  const onNavItemSelected = index => {
    const route = navMenuData[index].route;
    const itemId = navMenuData[index].Id;
    route && setActiveItem(index);
    onNavItemPress && onNavItemPress(route, itemId);
  };

  const NavItem = ({Icon, label, index, isActive}) => (
    <TouchableWithoutFeedback
      testID={`button_${label}`}
      onPress={() => onNavItemSelected(index)}>
      <View style={[styles.navItem, isActive ? styles.navItemActive : '']}>
        <Icon height={21.3} width={21.3} />
        <Label
          title={label}
          variant={LabelVariant.body}
          style={[
            styles.navItemLabel,
            isActive ? styles.navItemLabelActive : '',
          ]}
        />
      </View>
    </TouchableWithoutFeedback>
  );

  return (
    <View style={styles.container}>
      <Image source={LogoMankind} style={styles.logo} resizeMode="contain" />
      <View style={styles.navItemsContainer}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={navMenuData}
          keyExtractor={(item, index) => item.route || index}
          renderItem={({item, index}) => (
            <React.Fragment key={item.route || index}>
              <NavItem
                index={index}
                isActive={index === activeItem}
                {...item}
              />
            </React.Fragment>
          )}
        />
      </View>
    </View>
  );
};

export default NavMenu;
