const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, inventoryController.getInventory);

module.exports = router;
