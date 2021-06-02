// @flow
import Realm from 'realm';

import createdUserAction from './actions/userAction';
import UserModel from './models/userModel';

const realmInstance = new Realm({
  path:'UserModel.realm',
  schema: [UserModel.schema],
});

/**
 * Get a singleton realm instance
 * @return {Realm}
 */
export const getRealmInstance = () => realmInstance;
/**
 * Available user action
 *
 */
export const userActions = createdUserAction(realmInstance);