(function () {
    angular
        .module("WebAppMaker")
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http) {

        var services = {
            'createWebsite': createWebsite,
            'findWebsitesByUser': findWebsitesByUser,
            'findWebsiteById': findWebsiteById,
            'updateWebsite': updateWebsite,
            'deleteWebsite': deleteWebsite,
            'deleteWebsitesByUser': deleteWebsitesByUser
        };
        return services;

        function getNextId() {
            function getMaxId(maxId, currentId) {
                var current = parseInt(currentId._id);
                if (maxId > current) {
                    return maxId;
                } else {
                    return current + 1;
                }
            }
            return websites.reduce(getMaxId, 0).toString();
        }

        function createWebsite(userId, website) {
            var newWebsiteId = getNextId();
            var newWebsite = {
                _id: newWebsiteId,
                name: website.name,
                desc: website.desc,
                developerId: userId
            };
            websites.push(newWebsite);
            return newWebsiteId;
        }

        function findWebsitesByUser(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });

        }

        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function updateWebsite(websiteId, website) {
            var url = "/api/website/" + websiteId;
            return $http.put(url, website)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsite(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.delete(url)
                .then(function (response) {
                    return response.data;
                });
        }

        function deleteWebsitesByUser(userId) {
            for (w in websites) {
                website = websites[w];
                if (website.developerId === userId) {
                    deleteWebsite(website._id);
                }
            }
        }
    }
})();