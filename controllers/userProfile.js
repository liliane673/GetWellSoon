const { where } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');


module.exports={
    //user profile section
    async userProfile(req,res){
        console.log(req.session);
        try {
            const data = await UserProfile.findOne( {include: User} , {where: {
                UserId: req.session.user.id,
                }},)
            // res.send(data);
            //untuk cek middleware
            if(req.session.user.role==='doctor'){
                // console.log(data);
                res.render('viewsProfileDoctor', { data });
            } else if(req.session.user.role==='patient'){
                const data = await UserProfile.findOne( {include: User} , {where: {
                    UserId: req.session.user.id,
                    }},)
                // res.send('userProfile ');
                res.render('viewsProfileDoctor', { data });
            }
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
            if(req.session.user.role==='doctor'){
                res.send('userProfile DOCTOR');
            } else if(req.session.user.role==='patient'){
                res.send('userProfile PATIENT');
            }      

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