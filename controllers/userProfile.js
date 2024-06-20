const { where } = require('sequelize');
const {User, UserProfile,Disease,MedicalRecord} = require('../models');
const bcrypt =require('bcryptjs');
// const jsPDFInvoiceTemplate =require("jspdf-invoice-template");


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

    async getCreateProfile(req,res){
        try {
            const gender=UserProfile.gender
            res.render('createProfile', {gender});
        } catch (err) {
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
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
            if(err.name=='SequelizeUniqueConstraintError'|| err.name=='SequelizeValidationError'){
                res.send(err.message);
            } else{
                res.send(err.message);
            }
            console.log(err);
        }
    },

    async getProfileUpdate(req,res){
        try {
            const gender=UserProfile.gender
            const profileUser= await UserProfile.findOne({where: {UserId: req.session.user.id}})

            res.render('updateProfile', {gender,profileUser});
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

    // populateInvoice(req,res){
    //     const outputTypes = jsPDFInvoiceTemplate.OutputType;
    //     const jsPDF = jsPDFInvoiceTemplate.jsPDF();

    //     jsPDFInvoiceTemplate.default( propsObject );

    //     const pdfObject = jsPDFInvoiceTemplate(props);

    //     var props = {
    //         outputType: OutputType.Save,
    //         onJsPDFDocCreation?: (jsPDFDoc: jsPDF) => void, //Allows for additional configuration prior to writing among others, adds support for different languages and symbols
    //         returnJsPDFDocObject: true,
    //         fileName: "Invoice 2021",
    //         orientationLandscape: false,
    //         compress: true,
    //         logo: {
    //             src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png",
    //             type: 'PNG', //optional, when src= data:uri (nodejs case)
    //             width: 53.33, //aspect ratio = width/height
    //             height: 26.66,
    //             margin: {
    //                 top: 0, //negative or positive num, from the current position
    //                 left: 0 //negative or positive num, from the current position
    //             }
    //         },
    //         stamp: {
    //             inAllPages: true, //by default = false, just in the last page
    //             src: "https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/qr_code.jpg",
    //             type: 'JPG', //optional, when src= data:uri (nodejs case)
    //             width: 20, //aspect ratio = width/height
    //             height: 20,
    //             margin: {
    //                 top: 0, //negative or positive num, from the current position
    //                 left: 0 //negative or positive num, from the current position
    //             }
    //         },
    //         business: {
    //             name: "Business Name",
    //             address: "Albania, Tirane ish-Dogana, Durres 2001",
    //             phone: "(+355) 069 11 11 111",
    //             email: "email@example.com",
    //             email_1: "info@example.al",
    //             website: "www.example.al",
    //         },
    //         contact: {
    //             label: "Invoice issued for:",
    //             name: "Client Name",
    //             address: "Albania, Tirane, Astir",
    //             phone: "(+355) 069 22 22 222",
    //             email: "client@website.al",
    //             otherInfo: "www.website.al",
    //         },
    //         invoice: {
    //             label: "Invoice #: ",
    //             num: 19,
    //             invDate: "Payment Date: 01/01/2021 18:12",
    //             invGenDate: "Invoice Date: 02/02/2021 10:17",
    //             headerBorder: false,
    //             tableBodyBorder: false,
    //             header: [
    //             {
    //                 title: "#", 
    //                 style: { 
    //                 width: 10 
    //                 } 
    //             }, 
    //             { 
    //                 title: "Title",
    //                 style: {
    //                 width: 30
    //                 } 
    //             }, 
    //             { 
    //                 title: "Description",
    //                 style: {
    //                 width: 80
    //                 } 
    //             }, 
    //             { title: "Price"},
    //             { title: "Quantity"},
    //             { title: "Unit"},
    //             { title: "Total"}
    //             ],
    //             table: Array.from(Array(10), (item, index)=>([
    //                 index + 1,
    //                 "There are many variations ",
    //                 "Lorem Ipsum is simply dummy text dummy text ",
    //                 200.5,
    //                 4.5,
    //                 "m2",
    //                 400.5
    //             ])),
    //             additionalRows: [{
    //                 col1: 'Total:',
    //                 col2: '145,250.50',
    //                 col3: 'ALL',
    //                 style: {
    //                     fontSize: 14 //optional, default 12
    //                 }
    //             },
    //             {
    //                 col1: 'VAT:',
    //                 col2: '20',
    //                 col3: '%',
    //                 style: {
    //                     fontSize: 10 //optional, default 12
    //                 }
    //             },
    //             {
    //                 col1: 'SubTotal:',
    //                 col2: '116,199.90',
    //                 col3: 'ALL',
    //                 style: {
    //                     fontSize: 10 //optional, default 12
    //                 }
    //             }],
    //             invDescLabel: "Invoice Note",
    //             invDesc: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
    //         },
    //         footer: {
    //             text: "The invoice is created on a computer and is valid without the signature and stamp.",
    //         },
    //         pageEnable: true,
    //         pageLabel: "Page ",
    //     };
              
    // }
}