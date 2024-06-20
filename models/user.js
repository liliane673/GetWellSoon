'use strict';
const {
  Model
} = require('sequelize');

const bcrypt =require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile);
      User.hasMany(models.MedicalRecord, {foreignKey : "PatientId" , as: "MedicalRecordsPatient"});
      User.hasMany(models.MedicalRecord, {foreignKey : "DoctorId" , as: "MedicalRecordsDoctor"});
      User.belongsToMany(models.Disease, {through: models.MedicalRecord, foreignKey: "PatientId"})
    }

    static role=["doctor", "patient"]
  }
  User.init({
    username: {
      type :DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{ 
        notNull: {msg : 'Username is required'},
        notEmpty: {msg : 'Username is required'}
      },
    },
    
    email:  {
      type :DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{ 
        notNull: {msg : 'Email is required'},
        notEmpty: {msg : 'Email is required'},
      },
    },

    password:  {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Password is required'},
        notEmpty: {msg : 'Password is required'}
      },
    },

    role:  {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Role is required'},
        notEmpty: {msg : 'Role is required'}
      },
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance) =>{
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(instance.password, salt);
    instance.password=hash;
  })
  return User;
};