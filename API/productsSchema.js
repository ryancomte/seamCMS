var mongoose = require('mongoose');

var productSchema = mongoose.Schema({
    productId: Number,
    brand: String,
    name: String,
    price: Number,
    quantity: Number,
    specs: Array,
    desc: String,
    imgUrl: String
});

var Products = mongoose.model('products', productSchema);

module.exports = Products;