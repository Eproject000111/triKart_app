const { addToWishlist, wishlist, removeFromWishlist } = require('./../../controllers/user/wishlist');

module.exports = function(app,middlewareAuth){

    app.post("/add-to-wishlist",[middlewareAuth['checkAuth']],addToWishlist)
    app.get("/wishlist",[middlewareAuth['checkAuth']],wishlist)
    app.get("/remove-from-wishlist",[middlewareAuth['checkAuth']],removeFromWishlist)
}