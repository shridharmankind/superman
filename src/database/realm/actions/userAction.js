import UserModel from '../models/userModel';


/**
 * create user realm action to save the user data
 * @param {Realm} realmInstance
 * @return {Object}
 */
export default (realmInstance) => {
  return {
    /**
       * set the user
       * @param {any} userResponse User response from server
       * @return {user Object} created user object
       */
    saveUser: (userResponse) => {
      const {userId, userName, address, userImageAddress} = userResponse;
      return new Promise((resolve, reject) => {
        try {
          const user = {
            _id: userId,
            name: userName,
            address: address,
            imageAddress: userImageAddress,
          };
          realmInstance.write(()=> {
            const createdUser = realmInstance.create(UserModel.getUserModelName(), user, true);
            resolve(createdUser);
          });
        } catch (error) {
          resolve(error);
        }
      });
    },
    /**
     * Get the current user detail
     * 
     */
    retrieveAllUser: () => {
      return realmInstance.objects(UserModel.getUserModelName());
    },
  };
};