'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MedicalRecord extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MedicalRecord.belongsTo(models.User, {foreignKey: 'PatientId', as : "Patient"});
      MedicalRecord.belongsTo(models.User, {foreignKey: 'DoctorId', as : "Doctor"});
      MedicalRecord.belongsTo(models.Disease);
    }

    get formatDate(){
      return this.dateConsultation.toISOString().split('T')[0];
    }
  }
  MedicalRecord.init({
    DiseaseId: {
      type :DataTypes.INTEGER,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Disease Name Consultation is required'},
        notEmpty: {msg : 'Disease Name Consultation is required'}
      },
    },
    PatientId:{
      type :DataTypes.INTEGER,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Patient Name Consultation is required'},
        notEmpty: {msg : 'Patient Name Consultation is required'}
      },
    },
    DoctorId: DataTypes.INTEGER,
    dateConsultation: DataTypes.DATE,
    feeConsultation:  {
      type :DataTypes.INTEGER,
      allowNull: false,
      validate:{ 
        notNull: {msg : 'Fee Consultation is required'},
        notEmpty: {msg : 'Fee Consultation is required'}
      },
    },
  }, {
    sequelize,
    modelName: 'MedicalRecord',
  });
  MedicalRecord.beforeCreate((instance)=>{
    return instance.dateConsultation= new Date();
  })
  return MedicalRecord;
};