const { checkout, addToCart, cart, removeFromCart } = require("./../../controllers/user/cart");

module.exports = function(app,middlewareAuth){

    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Accept"
        );

        next();
    })

    app.post("/checkout",[middlewareAuth['checkAuth']],checkout)

}