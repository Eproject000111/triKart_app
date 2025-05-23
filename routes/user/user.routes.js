const {updateUser, deleteUser, userById, resetPassword } = require("./../../controllers/auth/auth");

module.exports = function(app,middlewareAuth){
    app.post("/update-user", updateUser)
    app.get("/user", userById)
    app.get("/delete-user", deleteUser)
    app.post("/reset-password", resetPassword)
}