(function() {
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);
    function FlickrService($http) {
        this.searchPhotos = searchPhotos;

        var key = "b32ea3f015214a097f38007c43c69b97";
        var secret = "1581ceafc66a1d54";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        function searchPhotos(searchText) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchText);
            return $http.get(url);
        }
    }
})();