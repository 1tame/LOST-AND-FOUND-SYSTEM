const express = require('express');
const router = express.Router();
const itemController = require("../controllers/item.controller");
const {validateAddItem} = require('../middleware/validateItem');



router.post('/addItem',validateAddItem ,itemController.addItem);
router.delete('/clear', itemController.deleteAll);
router.get('/getAll', itemController.getAll);
router.get('/search', itemController.SearchLostItem);
router.delete('/:ItemId',itemController.deleteItem);


module.exports = router;