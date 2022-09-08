const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventory');
const { ensureAuth, ensureGuest } = require('../middleware/auth');

router.get('/', ensureAuth, inventoryController.getInventory);
router.get('/add', ensureAuth, inventoryController.addForm);
router.get('/available', ensureAuth, inventoryController.getAvailable);
router.get('/sold', ensureAuth, inventoryController.getSold);
router.get('/:id', inventoryController.getItem);
router.post('/add', ensureAuth, inventoryController.addItem);
router.put('/updateStatus', ensureAuth, inventoryController.updateStatus);
router.delete('/deleteItem', ensureAuth, inventoryController.deleteItem);

module.exports = router;
