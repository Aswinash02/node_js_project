const express = require('express');
const router = express.Router();
const { createProduct, getProducts, updateProduct, delectProduct } = require('../controllers/product_controller');


router.get('/', getProducts)
router.post('/', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', delectProduct)



module.exports = router;