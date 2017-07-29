/**
 * Created by yingchen on 6/9/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController)
        .controller("RegisterController", RegisterController)
        .controller("ProfileController", ProfileController);

    function LoginController($location, UserService) {
        var vm = this;
        vm.login = login;

        function login(username, password) {
            UserService
                .login(username, password)
                .then(function (user) {
                    if (user === null) {
                        vm.error = "Username not found";
                    } else {
                        $location.url("/profile");
                    }
                });
        }
    }

    function RegisterController(UserService, $location) {
        var vm = this;
        vm.register = register;

        function register(username, password, vpassword) {
            if (username === undefined || username === null || username === "" || password === undefined || password === "") {
                vm.error = "Username and Passwords cannot be empty";
                return;
            }
            if (password !== vpassword) {
                vm.error = "Password does not match";
                return;
            }
            UserService
                .findUserByUsername(username)
                .then(function () {
                    vm.error = "Username is taken";
                }, function () {
                        var user = {
                            username: username,
                            password: password,
                            // firstName: "",
                            // lastName: "",
                            // email: ""
                        };
                        return UserService
                            .createUser(user);
                    }
                )
                .then(function (user) {
                    $location.url("/user/" + user._id);
                });
        }
    }

    function ProfileController($location, $routeParams, $timeout, UserService, currentUser) {
        var vm = this;
        //vm.uid = $routeParams.uid;
        vm.uid = currentUser._id;

        // UserService.findUserById(vm.uid)
        //     .then(renderUser, userError);

        function init() {
            renderUser(currentUser);
        }
        init();

        function renderUser(user) {
            vm.user = user;
        }

        function userError(error) {
            vm.error = "User not found";
        }

        vm.updateUser = updateUser;
        function updateUser(user) {
            UserService
                .updateUser(user._id, user)
                .then(function () {
                    vm.updated = "Profile updated";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }

        vm.deleteUser = deleteUser;
        function deleteUser(user) {
            UserService
                .deleteUser(user._id)
                .then(function () {
                    $location.url('/');
                }, function() {
                    vm.error="Unable to unregister";
                });
        }
    }
})();