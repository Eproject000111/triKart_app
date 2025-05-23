const { dashboardData, getAllUsers, updateUsers, deleteUsers } = require('./../../controllers/admin/dashboard');
const { getAllOrders, changeStatusOfOrder } = require('./../../controllers/admin/order');

module.exports = function(app,middlewareAuth){
    /* app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "Content-Type, Accept"
        );

        next();
    }) */

    app.get("/dashboard",[middlewareAuth['isAdmin']],dashboardData)
    app.get("/admin/orders",[middlewareAuth['isAdmin']],getAllOrders)
    app.get("/admin/order-status",[middlewareAuth['isAdmin']],changeStatusOfOrder)
    app.get("/admin/users",getAllUsers)
    app.post("/admin/users/update",updateUsers)
    app.post("/admin/users/delete",deleteUsers)
}