import React, {useState, useEffect} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {Label} from 'components/elements';
import {LogoMankind} from 'assets';

import styles from './styles';
import navMenuData from './navMenuData';

// TODO - mankind logo not showing on web
const NavMenu = ({onNavItemPress}) => {
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    onNavItemPress && onNavItemPress(activeItem);
  }, [onNavItemPress, activeItem]);

  const NavItem = ({Icon, label, index, isActive = false}) => (
    <TouchableWithoutFeedback onPress={() => setActiveItem(index)}>
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
            key={index}
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
