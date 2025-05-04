const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');


router.post('/add', userController.addUser);
router.delete('/clear', userController.deleteAll);
router.get('/getAll', userController.getAll);

module.exports = router;