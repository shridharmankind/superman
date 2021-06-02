/**
 * User Model
 */
export default class UserModel {
    /**
     * Getter of the class
     * @return {string} class name
     */
    static getUserModelName() {
        return UserModel.schema.name;
    }

    /**
     * Get the User primary key
     * @return {string} return the primary key of the user
     */
    static PrimaryKey() {
        return UserModel.schema.primaryKey;
    }

    /**
     * class {realm} schema
     * @type {Object}
     */
    static schema = {
        'name': 'user',
        'primaryKey': '_id',

        'properties': {
            '_id': 'int',
            'name': 'string',
            'address': 'string',
            'imageAddress': 'string',
        },
    }
}
  