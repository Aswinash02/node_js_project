const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    description : String,
    richDescription : String,
    image : String,
    images : [{
        type : String
    }],
    brand : String,
    price : {
        type : Number,
        default : 0
    },
    category :{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Category'
    },
    countInStock:{
        type : Number,
        required : true,
        min : 0,
        max : 250
    },
    rating : {
        type : Number
    },
    isFeatured:{
        type : Boolean,
        default:false
    },
    createdAt:{
        type : Date,
        default : Date.now
    }
})

module.exports = mongoose.model('Product',productSchema);