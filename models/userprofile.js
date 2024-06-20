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
    firstName:  {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'First Name is required'},
        notEmpty: {msg : 'First Name is required'}
      },
    },
    lastName:  {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'last Name is required'},
      },
    },
    birthDate: {
      type :DataTypes.DATE,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Birth Date is required'},
        notEmpty: {msg : 'Birth Date is required'}
      },
    },
    gender: {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Gender is required'},
        notEmpty: {msg : 'Gender is required'}
      },
    },
    phoneNumber: {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Phone Number is required'},
        notEmpty: {msg : 'Phone Number is required'}
      },
    },
    profilePicture:  {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Profile Picture is required'},
      },
    },
    address:  {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Address is required'},
        notEmpty: {msg : 'Address is required'}
      },
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};