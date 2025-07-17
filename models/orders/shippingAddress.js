const mongoose = require("mongoose")

const shippingAddress = mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    addressLine1: { 
        type: String, 
        required: true 
    },
    addressLine2: { 
        type: String 
    }, // optional
    city: { 
        type: String, 
        required: true 
    },
    state: { 
        type: String 
    }, // optional for some countries
    country: { 
        type: String, 
        required: true 
    },
    zipcode: { 
        type: String, 
        required: true 
    },
    phone: {
        type: Number,
        minlength: 10,
        maxlength: 10
    },

}, { timestamps : true })

module.exports = mongoose.model("address", shippingAddress)