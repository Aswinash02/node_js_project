const Product = require('../models/product_model');
exports.getProducts = async (req, res) => {
    try {
        const productList = await Product.find();
        if (!productList)
            return res.status(400).send({
                sucess: false,
                message: "Failed to get Products"
            })


        const formattedProducts = productList.map(product => {
            return {
                id: product._id,
                name: product.name,
                description: product.description,
                richDescription: product.richDescription,
                image: product.image,
                images: product.images,
                brand: product.brand,
                price: product.price,
                category: product.category,
                countInStock: product.countInStock,
                rating: product.rating,
                isFeatured: product.isFeatured,

            }
        })
        return res.status(200).send(
            {
                success: true,
                message: "Product retrived successfully",
                data: formattedProducts
            }
        )
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }
}

exports.createProduct = async (req, res) => {

    try {


        let newProduct = new Product({
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured,
        });
        newProduct = await newProduct.save();
        if (newProduct)
            return res.status(200).send({
                success: true,
                message: "Procduct Created Successfully",

            })
        return res.status(400).send({
            success: false,
            message: "Failed to Product Create"
        })
    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }



}

exports.updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            images: req.body.images,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            isFeatured: req.body.isFeatured
        });
        if (!updatedProduct)
            return res.status(400).send({
                success: false,
                message: "Failed to update product"
            })

        return res.status(200).send({
            success: true,
            message: "product updated Successfully"
        })

    } catch (err) {
        return res.status(500).send({
            success: false,
            message: err.message
        })
    }

}

exports.delectProduct = async (req, res) => {
    try {
        const delectedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!delectedProduct)
            return res.status(400).send({
                success: false,
                message: "Failed to delect product"
            })

        return res.status(200).send({
            success: true,
            message: "product delected Successful"
        })
    } catch (err) {
        return res.status(500).send(
            {
                success: false,
                message: err.message
            }
        )
    }
}