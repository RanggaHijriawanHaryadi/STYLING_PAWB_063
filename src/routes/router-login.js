const router = require('express').Router();
const loginController = require('../controllers/controller-login');
const verifyUser = require('../config/verfy');


router.get('/', verifyUser.isLogout, loginController.login);


router.get('/logout', loginController.logout);
router.post('/auth', loginController.loginAuth);

module.exports = router;
