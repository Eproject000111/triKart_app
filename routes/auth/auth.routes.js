const { register, login} = require("./../../controllers/auth/auth");

module.exports = function(app,middlewareAuth){
    console.log('workkrkr')

    app.post('/register', register);
    app.post("/login", login)
}