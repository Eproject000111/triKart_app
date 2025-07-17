const { addProduct, updateProduct, deleteProduct, getAllProducts } = require("./../../controllers/products/products")

module.exports = function(app,middlewareAuth){
    // [middlewareAuth['isAdmin']]
    let route = '/product';

    app.post(`${route}/add`, addProduct);

    app.get(`${route}/get`, getAllProducts);

    app.post(`${route}/update`, [middlewareAuth['isAdmin']], updateProduct);

    app.get(`${route}/delete`, [middlewareAuth['isAdmin']], deleteProduct);
}