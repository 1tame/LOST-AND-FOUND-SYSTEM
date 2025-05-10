const express = require('express');
const claimController = require('../controllers/claim.controller');
const router = express.Router();
const authmiddleware = require('../middleware/authmiddleware');
const {validateClaim} = require('../middleware/validateClaim');
const upload = require('../controllers/upload.controller');



router.post('/add',authmiddleware,upload.single('image') ,validateClaim,claimController.claimItem);
router.delete('/clear', claimController.clearInfo);
router.get('/getAll',authmiddleware,claimController.getAll);
router.get('/:id', claimController.viewClaim);



module.exports = router;