const { where, Association, Op } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');
const {formatCurrency , formatDate}= require('../helpers/formatting');


module.exports={
    //===============================================================//
    //medical records section
    async showAllMedicalRecords(req,res){
        try {
            if(req.session.user.role==='doctor'){
                let dataUser=await UserProfile.findOne({where: {UserId:req.session.user.id}});
                console.log(dataUser)

                if(!dataUser){
                    const error="Please create profile first";
                    return res.redirect(`/profile/add?errors=${error}`);
                }

                let {filter, search}=req.query;
                let dataDisease=await Disease.findAll({
                    order:[['id','asc']],
                })

                const option={
                    include: [
                        {model:Disease}, 
                        {association : "Doctor", include : {model: UserProfile} }, 
                        {association : "Patient", include : {model: UserProfile} }
                    ],
                    attributes : [
                        "id", "DiseaseId", "PatientId", "dateConsultation","feeConsultation"
                    ],
                    where: {
                        DoctorId: req.session.user.id,
                        
                    },
                }

                
                if(search){
                    console.log(search);
                    option.include[2].include.where={
                        [Op.or]:[
                            {firstName: {[Op.iLike] : `%${search}%`}},
                            {lastName: {[Op.iLike] : `%${search}%`}}
                        ]
                    }
                    option.include[2].required=true;
                }
                
                if(filter){
                    console.log(filter);
                    option.include[0].where={
                        name:filter
                    }
                }

                let data= await MedicalRecord.findAll(option);
                // res.send(data);
                // console.log(data,'=======data>>>>>');
                res.render('doctorMedicalRecords', {data, formatCurrency,dataDisease,dataUser});

            } else if(req.session.user.role==='patient'){
                let dataUser=await UserProfile.findOne({where: {UserId:req.session.user.id}});
                if(!dataUser){
                    const error="Please create profile first";
                    return res.redirect(`/profile/add?errors=${error}`);
                }

                let {filter, search}=req.query;
                let dataDisease=await Disease.findAll({
                    order:[['id','asc']],
                })

                const option={
                    include: [
                        {model:Disease}, 
                        {association : "Doctor", include : {model: UserProfile} }, 
                        {association : "Patient", include : {model: UserProfile} }
                    ],
                    attributes : [
                        "id", "DiseaseId", "PatientId", "dateConsultation","feeConsultation"
                    ],
                    where: {
                        PatientId: req.session.user.id,
                        
                    },
                }

                
                if(search){
                    console.log(search);
                    option.include[1].include.where={
                        [Op.or]:[
                            {firstName: {[Op.iLike] : `%${search}%`}},
                            {lastName: {[Op.iLike] : `%${search}%`}}
                        ]
                    }
                    option.include[1].required=true;
                }
                
                if(filter){
                    console.log(filter);
                    option.include[0].where={
                        name:filter
                    }
                }

                let data= await MedicalRecord.findAll(option);
                // res.send(data);
                // console.log(data,'=======data>>>>>');
                res.render('patientMedicalRecords', {data, formatCurrency,formatDate,dataDisease,dataUser});
            }    
            
        } catch (err) {
            res.send(err.message);
            console.log(err);
        }
    },

    async getAddMedicalRecord(req,res){
        try {
            let {errors}= req.query;
            const date= new Date();

            let dataUsers=await User.findAll({
                order:[['id','asc']],
                include: {
                    model:UserProfile,
                    required:true,
                },
                where:{role:'patient'},
                
            })

            let dataDisease=await Disease.findAll({
                order:[['id','asc']],
            })
            // res.send(dataUsers);
            res.render('addMedicalRecord', {date, formatDate, dataUsers, dataDisease,errors})
            
        } catch (err) {
            res.send(err.message);
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
            if(err.name =='SequelizeValidationError' || err.name=='SequelizeUniqueConstraintError'){
                let errors= err.errors.map((el)=> el.message)
                res.redirect(`/medical-records/add?errors=${errors}`);
            } else{
                res.send(err.message)
            }
            console.log(err);
        }
    },

    async getUpdateMedicalRecord(req,res){
        try {
            let {errors}= req.query;
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
                    include: {
                        model:UserProfile,
                        required:true,
                    },
                    where:{role:'patient'},
                    
                })

            let dataDisease=await Disease.findAll({
                order:[['id','asc']],
            })

            // res.send(dataOneMedicalRecord);
            res.render('updateMedicalRecord',{dataUsers,dataDisease, dataOneMedicalRecord, formatDate,errors})
        } catch (err) {
            res.send(err.message);
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
            if(err.name =='SequelizeValidationError' || err.name=='SequelizeUniqueConstraintError'){
                let errors= err.errors.map((el)=> el.message)
                res.redirect(`/medical-records/update?errors=${errors}`);
            } else{
                res.send(err.message)
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
            res.send(err.message);
            console.log(err);
        }
    },
}