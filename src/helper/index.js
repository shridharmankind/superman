import {Platform} from 'react-native';

import * as KeyChain from './keychain';
import CircularProgressBarWithStatus from './progressBar';
import {Constants} from 'common';

export const isWeb = () => Platform.OS === 'web';

export {KeyChain, CircularProgressBarWithStatus};

export const getAvatar = (gender = Constants.GENDER.MALE, partyType) => {
  const genderImage =
    Constants.GENDER.MALE === (gender || '').toUpperCase()
      ? require('assets/images/male.png')
      : require('assets/images/female.png');
  const src =
    Constants.PARTY_TYPE.DOCTOR === partyType
      ? genderImage
      : require('assets/images/chemist.png');

  return src;
};
