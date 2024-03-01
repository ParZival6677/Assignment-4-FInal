// routes/itemRoutes.js
const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.post('/items', itemController.createItem);
router.put('/items/:id', itemController.updateItem);
router.delete('/items/:id', itemController.deleteItem);

module.exports = router;
