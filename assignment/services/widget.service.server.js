module.exports = function(app){
    var widgets =
        [
            { _id: "123", widgetType: "HEADING", pageId: "321", size: 2, text: "GIZMODO"},
            { _id: "234", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "345", widgetType: "IMAGE", pageId: "321", width: "100%",
                url: "http://lorempixel.com/400/200/"},
            { _id: "456", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"},
            { _id: "567", widgetType: "HEADING", pageId: "321", size: 4, text: "Lorem ipsum"},
            { _id: "678", widgetType: "YOUTUBE", pageId: "321", width: "100%",
                url: "https://youtu.be/AM2Ivdi9c4E" },
            { _id: "789", widgetType: "HTML", pageId: "321", text: "<p>Lorem ipsum</p>"}
        ];



    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);

    app.post("/api/page/:pid/widget", createWidget);

    app.put("/api/widget/:wgid", updateWidget);

    app.delete("/api/widget/:wgid", deleteWidget);

    function updateWidget(req, res) {

        var wgid = req.params.wgid;
        var widget = req.body;
        for (w in widgets) {
            if (String(widgets[w]._id) === String(wgid)) {
                widgets[w] = widget;
                res.sendStatus(200);
                return;
            }
        }
        res.Status(404).send("The widget not found");
    }

    function deleteWidget(req, res) {
        var wgid = req.params.wgid;
        for (w in widgets) {
            if (parseInt(widgets[w]._id) === parseInt(wgid)) {
                widgets.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }


    function createWidget(req, res) {
        var pid = req.params.pid;
        var widget = req.body;

        var newWidget = {
            _id: new Date().getTime(),
            widgetType: widget.widgetType,
            pageId: pid,
            size: widget.size,
            text: widget.text,
            width: widget.width,
            url: widget.url
        };
        widgets.push(newWidget);

        res.sendStatus(200);
    }

    function findAllWidgetsForPage(req, res) {
        var pid = req.params.pid;
        result = [];
        for (w in widgets) {
            var widget = widgets[w];
            if (parseInt(widget.pageId) === parseInt(pid)) {
                result.push(widget);
            }
        }
        res.send(result);
    }

    function findWidgetById(req, res) {
        var wgid = req.params.wgid;

        for (w in widgets) {
            var widget = widgets[w];
            if (parseInt(widget._id) === parseInt(wgid)) {
                res.status(200).send(widget);
                return;
            }
        }
        res.status(404).send("The widget not found");
    }

};