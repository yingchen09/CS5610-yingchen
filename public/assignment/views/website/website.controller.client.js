(function() {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController)
        .controller("NewWebsiteController", NewWebsiteController)
        .controller("EditWebsiteController", EditWebsiteController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        WebsiteService
            .findWebsitesByUser(vm.uid)
            .then(renderWebsites);
        function renderWebsites(websites) {
            vm.websites = websites;
        }
    }

    function NewWebsiteController($routeParams, $timeout, WebsiteService, $location) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.newWebsite = newWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.uid)
                .then(renderWebsites);
            function renderWebsites(websites) {
                vm.websites = websites;
            }
        }
        init();

        function newWebsite(websiteName, websiteDesc) {
            if (websiteName === undefined || websiteName === null) {

                vm.error = "Website name cannot be empty.";

                $timeout(function () {
                    vm.error = null;
                }, 3000);
                return;
            }
            var website = {
                name: websiteName,
                desc: websiteDesc
            };
            return WebsiteService
                .createWebsite(vm.uid, website)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website");
                });
        }
    }

    function EditWebsiteController($routeParams, $location, $timeout, WebsiteService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        WebsiteService
            .findWebsitesByUser(vm.uid)
            .then(function (websites) {
                vm.websites = websites;
            });

        WebsiteService
            .findWebsiteById(vm.wid)
            .then(function (website) {
                vm.website = website;
            }, function (error) {
                vm.error = "The website not found";
                $timeout(function () {
                    vm.error = null;
                }, 3000);
            });

        function updateWebsite(newWebsite) {
            WebsiteService
                .updateWebsite(vm.wid, newWebsite)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website");
                }, function () {
                    vm.updated = "Website updated";
                    $timeout(function () {
                        vm.updated = null;
                    }, 3000);
                });
        }

        function deleteWebsite(website) {
            WebsiteService
                .deleteWebsite(vm.uid, website._id)
                .then(function () {
                    $location.url("/user/" + vm.uid + "/website");
                }, function (error) {
                    vm.error = "Unable to remove this website";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                });
        }
    }
})();
