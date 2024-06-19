const { home } = require('../controllers/controller');

const router = require('express').Router()

router.get('/', home);

module.exports=router;