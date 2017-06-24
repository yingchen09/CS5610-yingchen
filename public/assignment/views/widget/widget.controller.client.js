(function() {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)
        .controller("NewWidgetController", NewWidgetController)
        .controller("CreateWidgetController", CreateWidgetController)
        .controller("EditWidgetController", EditWidgetController);

    function WidgetListController($routeParams, $sce, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;

        vm.widgets = WidgetService.findWidgetsByPageId(vm.pid);

        vm.trustThisContent = trustThisContent;
        vm.getYoutubeEmbedUrl = getYoutubeEmbedUrl;

        function trustThisContent(html) {
            return $sce.trustAsHtml(html);
        }

        function getYoutubeEmbedUrl(youtubeLink) {
            var embedUrl = "https://www.youtube.com/embed/";
            var youtubeLinkParts = youtubeLink.split('/');
            var id = youtubeLinkParts[youtubeLinkParts.length - 1];
            embedUrl += id;
            return $sce.trustAsResourceUrl(embedUrl);
        }
    }

    function NewWidgetController($routeParams) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
    }

    function CreateWidgetController($routeParams, $location, $timeout, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wtype = $routeParams.wtype;

        vm.createWidget = createWidget;

        function createWidget(size, width, text, url) {
            if (vm.wtype === "HEADING") {
                if (size === undefined || text === undefined || size === null || text === null) {
                    vm.error = "Heading name and size cannot be empty.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                    return;
                }
            }
            if (vm.wtype === "IMAGE" || vm.wtype === "YOUTUBE") {
                if (width === undefined || url === undefined || width === null || url === null) {
                    vm.errom = "Width and url cannot be empty.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                    return;
                }
            }
            if (vm.wtype === "HTML") {
                if (text === undefined || text === null) {
                    vm.error = "HTML text cannot be empty.";
                    $timeout(function () {
                        vm.error = null;
                    }, 3000);
                    return;
                }
            }

            var widget = {
                widgetType: vm.wtype,
                size: size,
                width: width,
                text: text,
                url: url
            };
            WidgetService.createWidget(vm.pid, widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }

    function EditWidgetController($routeParams, $location, WidgetService) {
        var vm = this;
        vm.uid = $routeParams.uid;
        vm.wid = $routeParams.wid;
        vm.pid = $routeParams.pid;
        vm.wgid = $routeParams.wgid;

        vm.widget = WidgetService.findWidgetById(vm.wgid);

        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        function updateWidget() {
            var update_widget = {
                _id: vm.wgid,
                widgetType: vm.widget.widgetType,
                pageId: vm.widget.pageId,
                size: vm.widget.size,
                text: vm.widget.text,
                width: vm.widget.width,
                url: vm.widget.url
            };
            WidgetService.updateWidget(vm.wgid, update_widget);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }

        function deleteWidget(widgetId) {
            WidgetService.deleteWidget(widgetId);
            $location.url("/user/" + vm.uid + "/website/" + vm.wid + "/page/" + vm.pid + "/widget");
        }
    }
})();