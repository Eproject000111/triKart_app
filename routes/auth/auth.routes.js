const { register, login, login_old, loginToVerifyOtp} = require("./../../controllers/auth/auth");

module.exports = function(app,middlewareAuth, route){
    
    app.post(route + '/register', register);

    app.post(route + "/login", login)

    app.post(route + "/loginToVerifyOtp", loginToVerifyOtp)

    app.post(route + "/login_old", login_old)
}