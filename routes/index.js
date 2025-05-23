module.exports = (app,middlewareAuth) => {
    require('../routes/admin/admin.routes')(app, middlewareAuth);
    require('../routes/auth/auth.routes')(app, middlewareAuth);
    require('../routes/category/category.routes')(app, middlewareAuth);
    require('../routes/checkout/checkout.routes')(app, middlewareAuth);
    require('../routes/files/file.upload')(app);
    require('../routes/orders/orders.routes')(app,middlewareAuth);
    require('../routes/products/products.routes')(app,middlewareAuth);
    require('../routes/user/user.routes')(app,middlewareAuth);
    require('../routes/wishlist/wishlist.routes')(app,middlewareAuth);
    return app
}