const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const authMiddleware = require('../middlewares/auth');

router.get('/', authorController.getAllAuthors);
router.post('/add',authMiddleware, authorController.createAuthor);

router.delete('/delete/:id',authMiddleware, authorController.deleteAuthor);
router.patch('/update/:id',authMiddleware, authorController.updateAuthor);

router.get('/:id', authorController.getAuthor);


module.exports = router;