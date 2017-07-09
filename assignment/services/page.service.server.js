module.exports = function(app){

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
        { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    ];



    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);

    app.post("/api/website/:wid/page", createPage);

    app.put("/api/page/:pid", updatePage);

    app.delete("/api/page/:pid", deletePage);

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;

        for (p in pages) {
            if (String(pages[p]._id) === String(pid)) {
                pages[p]=page;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        for (p in pages) {
            if (parseInt(pages[p]._id) === parseInt(pid)) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function createPage(req, res) {
        var wid = req.params.wid;
        var page = req.body;

        var newPage = {
            _id: new Date().getTime(),
            name: page.name,
            websiteId: wid,
            description: page.description
        };
        pages.push(newPage);
        res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;
        var results = [];
        for (p in pages) {
            if (String(pages[p].websiteId) === String(wid)) {
                results.push(pages[p]);
            }
        }
        res.send(results);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;

        for (p in pages) {
            var page = pages[p];
            if (String(page._id) === String(pid)) {
                res.status(200).send(page);
                return;
            }
        }
        res.status(404).send("The page not found");
    }


};
