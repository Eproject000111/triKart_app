const mongoose = require("mongoose")

const productSkuSchema = mongoose.Schema({
    price : {type: Number, required: [true, 'Product price is required']},
    quantity : {type: Number, required: [true, 'Product qunatity is required']},
    sku: {type : String, required: [true, 'Product sku is required']},
    size_attribute: {type:mongoose.Schema.Types.ObjectId, ref:'productsAttribute'},
    color_attribute: {type:mongoose.Schema.Types.ObjectId, ref:'productsAttribute'},
    products : {type:mongoose.Schema.Types.ObjectId, ref:'product'}

}, { timestamps : true })

module.exports = mongoose.model("product_sku", productSkuSchema);