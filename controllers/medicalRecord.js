const { where } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');


module.exports={
    //===============================================================//
    //medical records section
    async showAllMedicalRecords(req,res){
        try {
            if(req.session.user.role==='doctor'){
                res.render('doctorMedicalRecords');

            } else if(req.session.user.role==='patient'){
                let data= await MedicalRecord.findAll(
                    {
                        include: {
                            model: Disease,
                          },
                        where: {
                            UserId: req.session.user.id,
                            },
                    },
                    
                );
                res.send(data)
                // res.render('patientMedicalRecords');
            }    
            
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },

    async getAddMedicalRecord(req,res){
        try {
            res.send('profile update')
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

            //untuk cek middleware
            // if(req.session.user.role==='doctor'){
            //     res.send('userProfile DOCTOR');
            // } else if(req.session.user.role==='patient'){
            //     res.send('userProfile PATIENT');
            // }      

            res.send('profile post update')
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
            res.send('profile update')
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
            console.log(req.body);

            //untuk cek middleware
            // if(req.session.user.role==='doctor'){
            //     res.send('userProfile DOCTOR');
            // } else if(req.session.user.role==='patient'){
            //     res.send('userProfile PATIENT');
            // }      

            res.send('profile post update')
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