const { 
    home,
    getRegister,
    postRegister,
    getLogin,
    postLogin,
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
    deleteMedicalRecord
} = require('../controllers/medicalRecord');

const router = require('express').Router()

router.get('/', home);

//route register and login
router.get('/register', getRegister);
router.post('/register', postRegister);
router.get('/login', getLogin);
router.post('/login', postLogin);

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
router.get('/medical-records/add', getAddMedicalRecord);
router.post('/medical-records/add',postAddMedicalRecord);
router.get('/medical-records/update/:medicalRecordId', getUpdateMedicalRecord);
router.post('/medical-records/update/:medicalRecordId',postUpdateMedicalRecord);
router.get('/medical-records/delete/:medicalRecordId',deleteMedicalRecord);

//route logout
router.post('/logout');

module.exports=router;