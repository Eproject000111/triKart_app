const mongoose = require('mongoose');

const wishlistSchema = mongoose.Schema({
    product : {productId : {type: mongoose.Schema.Types.ObjectId, ref : "product"}},
    user : {userId : {type: mongoose.Schema.Types.ObjectId, ref : "user"}}

},{timestamps: true})

module.exports = mongoose.model('wishlist',wishlistSchema)