const express = require('express');
const router = express.Router();
const {getProduct, insertProduct, deleteProduct} = require('../logic/product');

router.get('/', getProduct);
router.post('/', insertProduct);
router.delete('/:id', deleteProduct);


module.exports = router;