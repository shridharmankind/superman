import React, {useState, useEffect} from 'react';
import {Image, TouchableWithoutFeedback, View} from 'react-native';

import {Label} from 'components/elements';
import {LogoMankind, SearchIcon} from 'assets';

import styles from './styles';
import navMenuData from './navMenuData';

// TODO - mankind logo not showing
const NavMenu = ({onNavItemPress, onNavToggled}) => {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);

  useEffect(() => {
    onNavToggled && onNavToggled(open);
  }, [onNavToggled, open]);

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
      <Image source={LogoMankind} style={styles.logo} />
      <View style={styles.navToggleButton}>
        <TouchableWithoutFeedback onPress={() => setOpen(!open)}>
          <SearchIcon />
        </TouchableWithoutFeedback>
      </View>
      <View>
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
