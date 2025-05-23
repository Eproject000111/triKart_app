const mongoose = require("mongoose")

const productsAttribute = mongoose.Schema({
    type: {type : String, enum : ["color", "size"], required: [true, 'Product type is required']}, //Specifies the type of attribute. Allowed values: "color" or "size". If missing, an error message "Product type is required" is thrown.
    value: { type: String,  required: [true, 'Product value is required']} // Stores the value of the attribute (e.g., "Red", "Large"). Required, and an error message "Product value is required" is thrown if missing.

}, { timestamps : true })

module.exports = mongoose.model("product_attributes", productsAttribute)