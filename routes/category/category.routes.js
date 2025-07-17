const categoryCtrl = require('./../../controllers/category/category');

module.exports = function(app,middlewareAuth){
    /* Category */
    let route = '/category'
    // [middlewareAuth['isAdmin']],
    app.post(`${route}/add`, categoryCtrl.addCategory);
    app.get(`${route}/get`, categoryCtrl.getCategories);
    app.post(`${route}/getSubCategoryByParentCategoryId`, categoryCtrl.getSubCategoriesByParentCategoryId);
    app.post(`${route}/getCategoryBySlug`, categoryCtrl.getCategoryBySlug);
    app.patch(`${route}/update`, categoryCtrl.updateCategory)
    app.delete(`${route}/delete`, [middlewareAuth['isAdmin']], categoryCtrl.deleteCategory)
}