const router = require('express').Router();
const homeController = require('../controllers/controller-home');
const verifyUser = require('../config/verfy');



router.get('/', verifyUser.isLogin, homeController.home);

module.exports = router;
