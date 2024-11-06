const express = require("express");
const { createCategory,getCategories } = require("../controllers/category_controller");
const router = express.Router();

router.get('/', getCategories);

router.post('/', createCategory);

module.exports = router;