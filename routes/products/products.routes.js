const { addProduct, updateProduct, deleteProduct, getAllProducts } = require("./../../controllers/products/products")

module.exports = function(app,middlewareAuth){
    app.post("/product", [middlewareAuth['isAdmin']], addProduct)
    app.get("/products", getAllProducts)
    app.post("/updateProduct", [middlewareAuth['isAdmin']], updateProduct)
    app.get("/deleteProduct", [middlewareAuth['isAdmin']], deleteProduct)
}