const express = require('express');
const claimController = require('../controllers/claim.controller');
const router = express.Router();


router.post('/add', claimController.claimItem);
router.delete('/clear', claimController.clearInfo);
router.get('/getAll', claimController.getAll);
router.get('/:id', claimController.viewClaim);



module.exports = router;