const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/auth');

router.get('/', bookController.getAllBooks);
router.post('/add', authMiddleware, bookController.createBook);

module.exports = router;