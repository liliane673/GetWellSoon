const { where, Association } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');
const {formatCurrency , formatDate}= require('../helpers/formatting');


module.exports={
    //===============================================================//
    //medical records section
    async showAllMedicalRecords(req,res){
        try {
            if(req.session.user.role==='doctor'){
                let data= await MedicalRecord.findAll(
                    {
                        include: [
                            Disease, 
                            {association : "Doctor", include : UserProfile }, 
                            {association : "Patient", include : UserProfile }
                        ],
                        attributes : [
                            "id", "DiseaseId", "PatientId", "dateConsultation","feeConsultation"
                        ],
                        where: {
                            DoctorId: req.session.user.id,
                            },
                    },
                );
                // res.send(data);
                // console.log(data);
                res.render('doctorMedicalRecords', {data, formatCurrency});

            } else if(req.session.user.role==='patient'){
                let data= await MedicalRecord.findAll(
                    {
                        include: [
                            Disease, 
                            {association : "Doctor", include : UserProfile }, 
                            {association : "Patient", include : UserProfile }
                        ],
                        where: {
                            PatientId: req.session.user.id,
                            },
                    },
                    
                );
                // res.send(data);
                // console.log(data);
                res.render('patientMedicalRecords', {data, formatCurrency,formatDate});
            }    
            
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },

    async getAddMedicalRecord(req,res){
        try {
            const date= new Date();

            let dataUsers=await User.findAll({
                order:[['id','asc']],
                include: UserProfile,
                where:{role:'patient'}
            })

            let dataDisease=await Disease.findAll({
                order:[['id','asc']],
            })
            // res.send(dataUsers);
            res.render('addMedicalRecord', {date, formatDate, dataUsers, dataDisease})
        } catch (err) {
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
            console.log(err);
        }
    },
    
    async postAddMedicalRecord(req,res){
        try {
            console.log(req.body);
            const DoctorId= req.session.user.id
            const {PatientId, DiseaseId,feeConsultation} = req.body;
            let data= await MedicalRecord.create({PatientId, DiseaseId,feeConsultation,DoctorId});

            // res.send(data);
            res.redirect('/medical-records');
        } catch (err) {
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
            console.log(err);
        }
    },

    async getUpdateMedicalRecord(req,res){
        try {
            const {medicalRecordId}= req.params;
            const dataOneMedicalRecord= await MedicalRecord.findOne(
                {
                    attributes : [
                        "id", "DiseaseId", "PatientId", "dateConsultation","feeConsultation"
                    ],
                    where: {id : medicalRecordId}
                });

            let dataUsers=await User.findAll({
                order:[['id','asc']],
                include: UserProfile,
                where:{role:'patient'}
            })

            let dataDisease=await Disease.findAll({
                order:[['id','asc']],
            })

            // res.send(dataOneMedicalRecord);
            res.render('updateMedicalRecord',{dataUsers,dataDisease, dataOneMedicalRecord, formatDate})
        } catch (err) {
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
            console.log(err);
        }
    },
    
    async postUpdateMedicalRecord(req,res){
        try {
            const {medicalRecordId}= req.params;

            console.log(req.body);
            const DoctorId= req.session.user.id
            const {PatientId, DiseaseId,feeConsultation} = req.body;

            let data= await MedicalRecord.update(
                {
                    PatientId :PatientId, 
                    DiseaseId :DiseaseId,
                    feeConsultation :feeConsultation,
                    DoctorId:DoctorId
                },
                {where: {id : medicalRecordId}}
            );

            res.redirect('/medical-records');
        } catch (err) {
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
            console.log(err);
        }
    },

    async deleteMedicalRecord(req,res){
        try {
            const {medicalRecordId}= req.params;

            const dataOneMedicalRecord= await MedicalRecord.findOne(
                {
                    attributes : [
                        "id", "DiseaseId", "PatientId", "dateConsultation","feeConsultation"
                    ],
                    where: {id : medicalRecordId}
                });
            // res.send(dataOneMedicalRecord);
            dataOneMedicalRecord.destroy();
            res.redirect('/medical-records');
        } catch (err) {
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
            console.log(err);
        }
    },
}