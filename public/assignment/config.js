/**
 * Created by yingchen on 6/9/17.
 */
(function() {
    angular
        .module("WebAppMaker")
        .config(config);

    function config($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "",
                controller: "/views/user/login.view.client.html",
                controllerAs: "model"
            })
    }
})