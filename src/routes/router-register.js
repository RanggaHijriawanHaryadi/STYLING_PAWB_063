const router = require('express').Router();
const registerController = require('../controllers/controller-register');
const verifyUser = require('../config/verfy');

router.get('/', verifyUser.isLogout, registerController.formRegister);
router.post('/save', verifyUser.isLogout, registerController.saveRegister);

module.exports = router;
