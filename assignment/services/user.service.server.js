module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder", email: "alice@gmail.com"},
        {_id: "100", username: "a", password: "a", firstName: "a", lastName: "a", email: "a@gmail.com"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley", email: "bob@regge.com"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia", email: "charles@bing.com"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi", email: "jose@neu.com"}
    ];

    app.get('/api/user/:uid', findUserById);
    //app.get('/api/user?username="+username+"&password=+p)
    app.get('/api/user', findAllUsers);

    app.post('/api/user', createUser);

    app.put('/api/user/:uid', updateUser);

    app.delete('/api/user/:uid', deleteUser);

    function deleteUser(req, res) {
        var uid = req.params.uid;
        for (var u in users){
            if(String(users[u]._id) === String(uid)) {
                users.splice(u, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateUser(req, res) {
        var user = req.body;
        var uid = req.params.uid;
        for (var u in users){
            if(String(users[u]._id) === String(uid)) {
                users[u] = user;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createUser(req, res) {
        var user = req.body;
        user._id = (new Date()).getTime() + "";
        users.push(user);
        res.send(user);
    }

    function findAllUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password) {
            for (u in users){
                var user = users[u];
                if((user.username === username) &&
                    (user.password === password)) {
                    res.send(user);
                    return;
                }
            }
            res.status(404).send("Login credentials not found");
        } else if (username) {
            for (u in users){
                var user = users[u];
                if((user.username === username)) {
                    res.send(user);
                    return;
                }
            }
            res.status(404).send("Username not found");
        } else {
            res.send(users);
        }
    }

    function findUserById(req, res) {

        var uid = req.params.uid;

        for (u in users){
            var user = users[u];
            if(String(user._id) === String(uid)) {
                res.status(200).send(user);
                return;
            }
        }
        res.status(404).send("User not found");
    }
};