const { where } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');
const { formatDate, formatDateOnly } = require('../helpers/formatting');
// const jsPDFInvoiceTemplate =require("jspdf-invoice-template");


module.exports={
    //user profile section
    async userProfile(req,res){
        console.log(req.session);
        try {
            const data = await UserProfile.findOne( {include: {model:User}, where:{UserId: req.session.user.id}} )
            if(!data){
                res.redirect('/profile/add');
            }else{
                // res.send(data);
                res.render('viewsProfileDoctor', { data,formatDateOnly });
            }
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },

    async getCreateProfile(req,res){
        try {
            let {errors}= req.query;
            const gender=UserProfile.gender
            res.render('createProfile', {gender,errors});
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },
    
    async postCreateProfile(req,res){
        try {
            const UserId= req.session.user.id
            const {firstName, lastName, birthDate, gender, phoneNumber, profilePicture, address}= req.body
            const profileUser= await UserProfile.findOne({where: {UserId: req.session.user.id}})
            if(!profileUser){
                await UserProfile.create({firstName, lastName, birthDate, gender, phoneNumber, profilePicture, address, UserId})
                res.redirect('/profile')
            } else{
                console.log('profile sudah ada');
                res.redirect('/profile')
            }
        } catch (err) {
            if(err.name =='SequelizeValidationError' || err.name=='SequelizeUniqueConstraintError'){
                let errors= err.errors.map((el)=> el.message)
                res.redirect(`/profile/add?errors=${errors}`);
            } else{
                res.send(err.message)
            }
            console.log(err);
        }
    },

    async getProfileUpdate(req,res){
        try {
            let {errors}= req.query;
            const gender=UserProfile.gender
            const profileUser= await UserProfile.findOne({where: {UserId: req.session.user.id}})

            if(!profileUser){
                const error="Make a Profile User First!";
                return res.redirect(`/profile/update?error=${error}`);
            }
            res.render('updateProfile', {gender,profileUser, formatDateOnly,errors});
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },
    
    async postProfileUpdate(req,res){
        try {
            const UserId= req.session.user.id
            const {firstName, lastName, birthDate, gender, phoneNumber, profilePicture, address}= req.body
            const profileUser= await UserProfile.findOne({where: {UserId: req.session.user.id}})
            
            await UserProfile.update(
                {firstName, lastName, birthDate, gender, phoneNumber, profilePicture, address, UserId},
                {where:{UserId: req.session.user.id}}
            )
            res.redirect('/profile')
        } catch (err) {
            if(err.name =='SequelizeValidationError' || err.name=='SequelizeUniqueConstraintError'){
                let errors= err.errors.map((el)=> el.message)
                res.redirect(`/profile/update?errors=${errors}`);
            } else{
                res.send(err.message)
            }
            console.log(err);
        }
    },
}