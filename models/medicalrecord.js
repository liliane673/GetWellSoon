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
    DiseaseId: DataTypes.INTEGER,
    PatientId: DataTypes.INTEGER,
    DoctorId: DataTypes.INTEGER,
    dateConsultation: DataTypes.DATE,
    feeConsultation: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MedicalRecord',
  });
  MedicalRecord.beforeCreate((instance)=>{
    return instance.dateConsultation= new Date();
  })
  return MedicalRecord;
};