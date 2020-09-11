const express = require('express');
const router = express.Router();
const movieController = require('../api/controllers/movies')

router.get('/', movieController.getAll);
router.post('/', movieController.create);
router.put('/:movieId', movieController.updateById);
router.get('/:movieId', movieController.getById);
router.delete('/:movieId', movieController.deleteById);

module.exports = router;