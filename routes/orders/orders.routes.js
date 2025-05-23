const { orders } = require('./../../controllers/user/order');

module.exports = function(app,middlewareAuth){

    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Accept"
        );

        next();
    })

    app.get("/orders",[middlewareAuth['checkAuth']],orders)
}