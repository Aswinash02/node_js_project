const Category = require('../models/category_model');

exports.getCategories = async (req, res) => {
    try {
        const categoryList = await Category.find();
        if (!categoryList)
            return res.status(400).send({
                success: false,
                message: "Failed to get Category"
            })
        const formattedCategories = categoryList.map(category => {
            return {
                id: category._id,
                categoryName: category.categoryName,
                image: category.image
            }
        })
        return res.status(200).send({
            success: true,
            message: "Categories retrieved successfully",
            data: formattedCategories
        });
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        });
    }
}


exports.createCategory = async (req, res) => {
    try {
        let newCategory = new Category({
            categoryName: req.body.categoryName,
            image: req.body.image
        })

        newCategory = await newCategory.save();

        if (!newCategory)
            return res.status(400).send({
                success: false,
                message: "category cannot be created"
            })

        return res.status(200).send({
            success: true,
            message: "category created successfully",

        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}