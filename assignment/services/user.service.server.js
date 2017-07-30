var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
//var GoogleStrategy = require('passport-google-oauth20').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var bcrypt = require("bcrypt-nodejs");

module.exports = function(app, models) {
    var userModel = models.userModel;

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
    //     {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    // ];

    app.get('/api/user/:uid', findUserById);
    app.get('/api/user', findAllUsers);
    app.get('/api/user?username=username', findUserByUsername);
    app.get('/api/user?username=username&password=password', findUserByCredentials);

    app.post('/api/user', createUser);

    app.put('/api/user/:uid', updateUser);

    app.delete('/api/user/:uid', deleteUser);

    //handle passport
    app.post('/api/login', passport.authenticate('local'), login);
    app.get('/api/loggedin', loggedin);
    app.post('/api/logout', logout);
    app.post('/api/register', register);

    //google strategy
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#!/profile',
            failureRedirect: '/#!/login'
        }));

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID || '897608991727-4lsu7mb9cp63shla29kevc77f80n6rvm.apps.googleusercontent.com',
        clientSecret : process.env.GOOGLE_CLIENT_SECRET || 'fAi_pZ1cdN4UrYl03kLUcXqj',
        callbackURL  : process.env.GOOGLE_CALLBACK_URL || 'http://localhost:5000/auth/google/callback'
    };

    passport.use(new GoogleStrategy(googleConfig, googleStrategy));

    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            password: '0',
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }


    //local strategy
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err, false); }
                }
            );
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function(user) {
                req.login(user, function(status) {
                        res.send(status);
                    });
            });
    }

    function login(req, res) {
        res.json(req.user);
    }

    function serializeUser(user, done) {
        done(null, user);
    }
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function loggedin(req, res) {
        if(req.isAuthenticated()) {
            res.json(req.user);
        } else {
            res.send('0');
        }
    }

    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        userModel
            .deleteUser(uid)
            .then(function (status) {
                res.send(status);
            });
        // for (var u in users){
        //     if(String(users[u]._id) === String(uid)) {
        //         users.splice(u, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        userModel
            .updateUser(uid, user)
            .then(function (status) {
                res.send(status);
            });
        // for (var u in users){
        //     if(String(users[u]._id) === String(uid)) {
        //         users[u] = user;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createUser(req, res) {

        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
        }, function (error) {
                res.send(error);
            });
        // user._id = (new Date()).getTime() + "";
        // users.push(user);
        // res.send(user);
    }

    function findAllUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.status(404).send("Login credentials not found")
                    }
                });
        } else if (username) {

            userModel
                .findUserByUsername(username)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.status(404).send("Username not found");
                    }

                });

        } else {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                });
        }
    }

    function findUserByUsername(req, res) {
        var username = req.query.username;
        if (username) {
            userModel
                .findUserbyUsername(username)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.status(404).send("Username not found");
                    }

                });
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;

        if(username && password) {
            userModel
                .findUserByCredentials(username, password)
                .then(function (user) {
                    if (user) {
                        res.json(user);
                    } else {
                        res.status(404).send("Login credentials not found");
                    }
                });
        } else {
            res.status(404).send("Login credentials not found");
        }
    }

    function findUserById(req, res) {

        var uid = req.params.uid;

        if (uid) {
            userModel
                .findUserById(uid)
                .then(function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        user = null;
                        res.send(user);
                    }
                }, function (error) {
                    res.status(404).send("Username not found");
                });
        }
        // userModel
        //     .findUserById(uid)
        //     .then(function (user) {
        //         res.json(user);
        // }, function (error) {
        //     res.send(error);
        // });
        // for (u in users){
        //     var user = users[u];
        //     if(String(user._id) === String(uid)) {
        //         res.status(200).send(user);
        //         return;
        //     }
        // }
        // res.status(404).send("User not found");
    }
};