import AsyncStorage from '@react-native-community/async-storage';
import {USER_INFO} from 'common/constants';

export const getUserName = () => '';

export const checkForPendingMasterDataDownload = () => false;

export const getStaffPositionId = async () => {
  const userInfo = await AsyncStorage.getItem(USER_INFO);
  const {staffPositions = []} = userInfo || {};

  const primaryStaffPositions = staffPositions.filter(
    staffPosition => staffPosition.isPrimary,
  );
  const primaryStaffPosition = primaryStaffPositions[0] || {};
  return primaryStaffPosition?.id;
};
