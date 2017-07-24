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