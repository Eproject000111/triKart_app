const mongoose = require("mongoose")

const cart = mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    shippingAddress : {type:mongoose.Schema.Types.ObjectId, ref:'address', required:true},
    items : 
        [
            {
                productId : {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref : "product"
                }, 
                categoryId : {
                    type: mongoose.Schema.Types.ObjectId, 
                    ref : "categories"
                },
                quantity : {
                    type: Number,
                    required: true,
                    min: 1
                }, 
                price : {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    totalItems: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        default: 0
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }

}, { timestamps : true })

module.exports = mongoose.model("cart", cart)