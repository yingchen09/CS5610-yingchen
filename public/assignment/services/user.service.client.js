/**
 * Created by yingchen on 6/9/17.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory('UserService', UserService);

    function UserService($http) {

        var services = {
            "createUser": createUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials,
            "login": login,
            "logout": logout,
            "loggedin": loggedin,
            "register": register,
            "updateUser": updateUser,
            "deleteUser": deleteUser
        };
        return services;

        function register(userObj) {
            var url = "/api/register";
            return $http.post(url, userObj)
                .then(function(response) {
                    return response.data;
                });
        }

        function loggedin() {
            var url = "/api/loggedin";
            return $http.get(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function login(username, password) {
            var url = "/api/login";
            var credentials = {
                username: username,
                password: password
            }
            return $http.post(url, credentials)
                .then(function(response) {
                    return response.data;
                });
        }

        function logout() {
            var url = "/api/logout";
            return $http.post(url)
                .then(function(response) {
                    return response.data;
                });
        }

        function createUser(user) {
            var url = "/api/user/";
            return $http.post(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserById(userId) {
            var url = "/api/user/" + userId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByUsername(username) {
            var url = "/api/user?username="+username;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function findUserByCredentials(username, password) {
            var url = "/api/user?username="+username+"&password="+password;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateUser(userId, user) {
            var url = "/api/user/"+userId;
            return $http.put(url, user)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteUser(userId) {
            var url = "/api/user/"+userId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }
    }
})();