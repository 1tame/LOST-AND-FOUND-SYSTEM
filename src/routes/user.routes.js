const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {validateLogin, validateAddUser} = require('../middleware/validateUser');


router.post('/add',validateAddUser, userController.addUser);
router.delete('/clear', userController.deleteAll);
router.get('/getAll', userController.getAll);
router.post('/login',validateLogin,userController.login);

module.exports = router;