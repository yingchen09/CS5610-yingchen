/**
 * Created by yingchen on 6/9/17.
 */
(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            .when('/register', {
                templateUrl : "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when('/login', {
                templateUrl : "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when('/profile', {
                templateUrl : "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/website', {
                templateUrl : "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:uid/website/new', {
                templateUrl : "views/website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
            .when('/website/:wid', {
                templateUrl : "views/website/website-edit.view.client.html",
                controller: "EditWebsiteController",
                controllerAs: "model",
                resolve: {
                    currentUser: checkLoggedIn
                }
            })
            .when('/user/:uid/website/:wid/page', {
                templateUrl : "views/page/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/new', {
                templateUrl : "views/page/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid', {
                templateUrl : "views/page/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget', {
                templateUrl : "views/widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/new', {
                templateUrl : "views/widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/create/:wtype', {
                templateUrl : "views/widget/widget-new.view.client.html",
                controller: "CreateWidgetController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid', {
                templateUrl : "views/widget/widget-edit.view.client.html",
                controller: "EditWidgetController",
                controllerAs: "model"
            })
            .when('/user/:uid/website/:wid/page/:pid/widget/:wgid/search', {
                templateUrl : "views/widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })
            .when('/', {
                templateUrl : "/views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .otherwise({
                redirectTo : "/"
            });
    }

    function checkLoggedIn(UserService, $q, $location) {
        var deferred = $q.defer();
        UserService
            .loggedin()
            .then(function(user) {
                if(user === '0') {
                    deferred.reject();
                    $location.url('/login');
                } else {
                    deferred.resolve(user);
                }
            });
        return deferred.promise;
    }
})();