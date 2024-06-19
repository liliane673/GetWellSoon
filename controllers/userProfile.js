const { where } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');


module.exports={
    //user profile section
    async userProfile(req,res){
        try {
            //untuk cek middleware
            // if(req.session.user.role==='doctor'){
            //     res.send('userProfile DOCTOR');
            // } else if(req.session.user.role==='patient'){
            //     res.send('userProfile PATIENT');
            // }
            res.send('userProfile PATIENT');
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },

    async getProfileUpdate(req,res){
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
    
    async postProfileUpdate(req,res){
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