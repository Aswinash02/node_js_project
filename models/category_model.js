const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        required: true
    },
    image: String
})

module.exports = mongoose.model('Category',categorySchema);