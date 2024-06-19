const { where } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');


module.exports={
    home(req,res){
        try {
            res.render('home');
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },

    getRegister(req,res){
        try {
            const role = User.role;
            res.render('register', {role});
        } catch (err) {
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
            console.log(err);
        }
    },
    
    async postRegister(req,res){
        try {
            let {username,email,password,role} =req.body
            await User.create({username,email,password,role});
            res.redirect('/login');
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },

    getLogin(req,res){
        try {
            let {error}= req.query;
            console.log(req.query);
            
            res.render('login',{error});
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },
    
    async postLogin(req,res){
        try {
            let {username,password} =req.body;
            console.log(req.body);

            let user= await User.findOne({where: {username}});
            console.log(user);

            if(user){
                const isValidPassword = await bcrypt.compare(password, user.password);
                if(isValidPassword){
                    req.session.user= {id: user.id, role:user.role, username:user.username}
                    return res.redirect('/profile');
                } else{
                    const error="Invalid username / password";
                    return res.redirect(`/login?error=${error}`);
                }
            } else{
                const error="Invalid username / password";
                return res.redirect(`/login?error=${error}`);
            }
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },
    
}
