const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, inventoryController.getInventory);
router.get('/add', ensureAuth, inventoryController.addForm);
router.post('/add', ensureAuth, inventoryController.addItem);

module.exports = router;
