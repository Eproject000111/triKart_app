const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name : {
        type: String, 
        required: [true, 'Category name is required']
    },
    slug: { 
        type: String, 
        unique: true, 
        lowercase: true,
        default: null
    },
    description : {
        type : String, 
        default : null
    },
    image : {
        type : String, 
        default : null
    },
    icon : {
        type : String, 
        default : null
    },
    parentId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories', 
        default: null
    },
    subCategories:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:'categories', 
        default: null
    }],
    status: { 
        type: String, 
        enum: ['active', 'inactive'], 
        default: 'active' 
    }

}, { timestamps : true })

module.exports = mongoose.model("categories", categorySchema)