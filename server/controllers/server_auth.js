/**
 * Created by kai_zhang on 2014/9/23.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var request = require('request');

module.exports = {

    doLogin: function(req, res, next){
        passport.authenticate('local', function(err, user, info) {
            if(err)     { return next(err); }
            var data = {userInfo: user, otherInfo: info};
            if(!user)   { return res.json(data); }

            req.logIn(user, function(err) {
                if(err) {
                    return next(err);
                }
            res.json(data);
            });
        })(req, res, next);
    },


    localStrategy: new LocalStrategy(
        function(username, password, done) {
            request.post(
                'http://172.16.104.61:8080/cloud/userRegister/userlogin',
                { form: { userid: username,
                          password: password} },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        console.log(body);
                        var retData = JSON.parse(body);
                        console.log(retData);
                        var isSuccess = retData.result;
                        if(isSuccess){
                            var currUser = retData.data;
                            done(null,currUser, {message:'Success',
                                                 errorPassword: '',
                                                 errorEmail:''});
                        }else{

                        }

                    }
                }
            );

//            if (username == user.username){
//                if(password == 'init1234'){
//                    return done(null, user, {message:'ChangePWD',
//                                             errorPassword: '',
//                                             errorEmail:''});
//                }else if(password == user.password){
//                    return done(null, user, {message:'Success',
//                                             errorPassword: '',
//                                             errorEmail:''});
//                }else{
//                    return done(null, false, {message:'',
//                                              errorPassword: 'Incorrect password!',
//                                              errorEmail:''});
//                }
//
//            }else{
//                return done(null,false, {message: '',
//                                         errorPassword: '',
//                                         errorEmail:'Incorrect Email!'});
//            }

        }
    ),

    serializeUser: function(user, done){
        done(null, user.username);
    },

    deserializeUser: function(id, done){
        done(null, id);
    },

    ensureAuthenticated: function(req, res, next){
        if (req.isAuthenticated()) { return next(); }
        res.send(401);
    },

    session: function(req,res){
        res.json(req.user.userInfo);
    }
}
