'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserProfile.belongsTo(models.User)
    }

    static gender=["Male","Female"]

    get currentAge() {
      return `${Math.abs(new Date(new Date() - this.birthDate).getUTCFullYear() - 1970)}`
    }

    get fullName(){
      return `${this.firstName} ${this.lastName}`
    }

    get fullNameGender(){
      if(this.gender=='Male'){
        return `Mr. ${this.fullName}`
      } else{
         return `Ms. ${this.fullName}`
      }
    }
  }
  UserProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    birthDate: DataTypes.DATE,
    gender: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    profilePicture: DataTypes.STRING,
    address: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};