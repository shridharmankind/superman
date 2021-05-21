import React, {useState} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {Label} from 'components/elements';
import {LogoMankind} from 'assets';

import styles from './styles';
import navMenuData from './navMenuData';

// TODO - mankind logo not showing on web
const NavMenu = ({onNavItemPress}) => {
  const [activeItem, setActiveItem] = useState(0);

  const onNavItemSelected = index => {
    const route = navMenuData[index].route;
    route && setActiveItem(index);
    onNavItemPress && onNavItemPress(route);
  };

  const NavItem = ({Icon, label, index, isActive = false}) => (
    <TouchableWithoutFeedback onPress={() => onNavItemSelected(index)}>
      <View style={[styles.navItem, isActive ? styles.navItemActive : '']}>
        <Icon height={32} width={32} />
        <Label
          title={label}
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
        {navMenuData.map((item, index) => (
          <NavItem
            key={item.route}
            index={index}
            isActive={index === activeItem}
            {...item}
          />
        ))}
      </View>
    </View>
  );
};

export default NavMenu;
