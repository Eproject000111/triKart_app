const mongoose = require("mongoose")

const orderSchema = mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    shippingAddress : {type:mongoose.Schema.Types.ObjectId, ref:'address', required:true},
    items : 
        [
            {
                productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}, 
                categoryId : {type: mongoose.Schema.Types.ObjectId, ref : "categories"},
                quantity : Number, 
                price : Number
            }
        ],
    amount : {
        type: Number
    },
    discount : {
        type: Number
    },
    status : {
        type: String,
        enum: ["pending", "shipped", "delivered", "cancelled", "returned"],
        default: "pending",
    },
    payment_type : {type : String, enum: ["cod","online"]},
    shippedOn : {type : Date},
    deliveredOn : {type : Date}

}, { timestamps : true })

module.exports = mongoose.model("order", orderSchema)