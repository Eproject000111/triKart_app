const {updateUser, deleteUser, getUserById, resetPassword, getAllUsers } = require("./../../controllers/auth/auth");

module.exports = function(app,middlewareAuth,route){

    app.post(`${route}/update`, updateUser)

    app.get(`${route}/userById`, getUserById)

    app.get(`${route}/delete`, deleteUser)

    app.post(`${route}/resetPassword`, resetPassword)

    app.get(`${route}/all`, getAllUsers)
}