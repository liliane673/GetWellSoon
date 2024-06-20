'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Disease extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disease.hasMany(models.MedicalRecord);
      Disease.belongsToMany(models.User, {through: models.MedicalRecord})
    }
  }
  Disease.init({
    name: {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Name is required'},
        notEmpty: {msg : 'Name is required'}
      },
    },
    description: {
      type :DataTypes.STRING,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Description is required'},
        notEmpty: {msg : 'Description is required'}
      },
    },
    level: {
      type :DataTypes.INTEGER,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Level Pain is required'},
        notEmpty: {msg : 'Level Pain is required'}
      },
    },
  }, {
    sequelize,
    modelName: 'Disease',
  });
  return Disease;
};