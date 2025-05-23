const categoryCtrl = require('./../../controllers/category/category');

module.exports = function(app,middlewareAuth){
    /* Category */
    app.post("/category", [middlewareAuth['isAdmin']], categoryCtrl.addCategory)
    app.get("/categories", categoryCtrl.getCategories)
    app.patch("/updateCategory", [middlewareAuth['isAdmin']], categoryCtrl.updateCategory)
    app.delete("/deleteCategory", [middlewareAuth['isAdmin']], categoryCtrl.deleteCategory)
}