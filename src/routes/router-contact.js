const router = require('express').Router();
const contactController = require('../controllers/controller-contact');
const verifyUser  = require ('../config/verfy');

router.get('/', verifyUser.isLogin, contactController.getContact);
router.get('/contact/add', verifyUser.isLogin, contactController.formContact);
router.post('/contact/save', verifyUser.isLogin, contactController.saveContact);
router.get('/contact/edit/:id', verifyUser.isLogin, contactController.editContact);
router.post('/contact/update/:id', verifyUser.isLogin, contactController.updateContact);
router.get('/contact/delete/:id', verifyUser.isLogin, contactController.deleteContact);

module.exports = router;