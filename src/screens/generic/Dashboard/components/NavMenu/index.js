import React, {useState, useEffect} from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  View,
  Animated,
  Easing,
} from 'react-native';

import {Label} from 'components/elements';
import {LogoMankind, SearchIcon} from 'assets';

import styles from './styles';
import navMenuData from './navMenuData';

// TODO - mankind logo not showing on web
const NavMenu = ({onNavItemPress, onNavToggled}) => {
  const [open, setOpen] = useState(true);
  const [activeItem, setActiveItem] = useState(0);
  const [navWidth, setNavWidth] = useState(new Animated.Value(100));

  useEffect(() => {
    onNavToggled && onNavToggled(open);
  }, [onNavToggled, open]);

  useEffect(() => {
    onNavItemPress && onNavItemPress(activeItem);
  }, [onNavItemPress, activeItem]);

  const toggleNavWidth = () => {
    const endWidth = open ? 104 : 240;
    console.log('animating to endWidth', endWidth);

    Animated.timing(navWidth, {
      toValue: endWidth,
      duration: 200,
      easing: Easing.linear,
    }).start();
  };

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
    <Animated.View
      style={[
        styles.container,
        {
          width: navWidth.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [50, 200, 50],
          }),
        },
      ]}>
      <Image source={LogoMankind} style={styles.logo} />
      <View style={styles.navToggleButton}>
        <TouchableWithoutFeedback
          onPress={() => {
            requestAnimationFrame(() => {
              toggleNavWidth();
            });
            setOpen(!open);
          }}>
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
    </Animated.View>
  );
};

export default NavMenu;
