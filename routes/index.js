const { 
    home,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
    logoutUser
} = require('../controllers/controller');
const { 
    userProfile,
    getProfileUpdate,
    postProfileUpdate,
    getCreateProfile,
    postCreateProfile,
} = require('../controllers/userProfile');
const { 
    showAllMedicalRecords,
    getAddMedicalRecord,
    postAddMedicalRecord,
    getUpdateMedicalRecord,
    postUpdateMedicalRecord,
    deleteMedicalRecord,
    chart
} = require('../controllers/medicalRecord');

const router = require('express').Router()

router.get('/', home);

//route register and login
router.get('/register', getRegister);
router.post('/register', postRegister);
router.get('/login', getLogin);
router.post('/login', postLogin);

//route logout
router.get('/logout', logoutUser);

//middleware to check session
router.use((req, res, next) => {
    console.log(req.session);
    if(!req.session.user || !req.session.user.id){
        const error="Please login first";
        return res.redirect(`/login?error=${error}`);
    }
    next()
})

//route profile both for doctor and patient
router.get('/profile', userProfile);
router.get('/profile/add', getCreateProfile);
router.post('/profile/add', postCreateProfile);
router.get('/profile/update', getProfileUpdate);
router.post('/profile/update', postProfileUpdate);

//route medical records both for doctor and patient
router.get('/medical-records', showAllMedicalRecords);

router.use((req, res, next) => {
    console.log(req.session);
    if(!req.session.user || !req.session.user.id || req.session.user.role!=='doctor'){
        const error="You dont have access!";
        return res.redirect(`/login?error=${error}`);
    }
    next()
})
router.get('/medical-records/add', getAddMedicalRecord);
router.post('/medical-records/add',postAddMedicalRecord);
router.get('/medical-records/update/:medicalRecordId', getUpdateMedicalRecord);
router.post('/medical-records/update/:medicalRecordId',postUpdateMedicalRecord);
router.get('/medical-records/delete/:medicalRecordId',deleteMedicalRecord);



router.get('/chart', chart);

module.exports=router;