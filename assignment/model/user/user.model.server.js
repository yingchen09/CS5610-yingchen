module.exports = function(mongoose){
    var userSchema = require('./user.schema.server.js')(mongoose);
    var userModel = mongoose.model('userModel', userSchema);

    var api = {
        'createUser' : createUser,
        'findUserById' : findUserById,
        'findUserByUsername' : findUserByUsername,
        'findUserByCredentials' : findUserByCredentials,
        'findUserByGoogleId': findUserByGoogleId,
        'updateUser' : updateUser,
        'removeWebsiteFromUser' : removeWebsiteFromUser,
        'addWebsiteForUser' : addWebsiteForUser,
        'deleteUser' : deleteUser
    };

    return api;

    // Function Definition Section

    function findUserByGoogleId(googleId) {
        return userModel
            .findOne({'google.id': googleId});
    }

    function addWebsiteForUser(userId, websiteId) {
        //console.log("add website for user");
        return userModel
            .findOne({_id: userId})
            .then(function (user) {
                user.websites.push(websiteId);
                return user.save();
            });
    }


    function createUser(user){
        user.roles = ['USER'];
        var newUser = {
            username : user.username,
            password : user.password,
            websites : []
        };

        if(user.firstName){
            newUser.firstName = user.firstName;
        }
        if(user.lastName){
            newUser.lastName = user.lastName;
        }
        if(user.email){
            newUser.email = user.email;
        }
        if(user.phone){
            newUser.phone = user.phone;
        }

        return userModel.create(user);
    }

    function findAllUsers() {
        return userModel.find();
    }

    function findUserById(userId){
        return userModel.findById(userId);
    }

    function findUserByUsername(uname){
        return userModel.findOne({username : uname})
    }


    function findUserByCredentials(username, password){
        return userModel.findOne({
            username : username,
            password : password
        });
    }

    //update username and password is not allowed here.
    function updateUser(userId, user){
        delete user.username;
        delete user.password;
        return userModel.update({
            _id : userId
        }, {$set: user});
    }

    function removeWebsiteFromUser(userId, websiteId){
        // db.user.update({_id : ObjectId("583cf3287ac013080c4adee5")}, {$push : { "websites" : ObjectId("583cf43693b914082152cc3c")}})
        userModel
            .findById(userId)
            .then(
                function(user){
                    var index = user.websites.indexOf(websiteId);
                    user.websites.splice(index, 1);
                    return user.save();
                    // user.websites.pull(websiteId);
                    // user.save();
                },
                function(error){
                    console.log(error);
                }
            );
    }

    function deleteUser(userId){
        return userModel.remove({
            _id : userId
        });
    }
};