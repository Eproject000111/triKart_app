const mongoose = require("mongoose")

const categorySchema = mongoose.Schema({
    name : {type: String, required: [true, 'Category name is required']},
    description : {type : String, default : null},
    image : {type : String, default : null},
    icon : {type : String, default : null},
    parentId: {type:mongoose.Schema.Types.ObjectId, ref:'categories', default: null},
    subCategories:[{type:mongoose.Schema.Types.ObjectId, ref:'categories'}]

}, { timestamps : true })

module.exports = mongoose.model("categories", categorySchema)