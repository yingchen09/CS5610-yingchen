module.exports = function(app, models){

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
    // ];

    var pageModel = models.pageModel;


    app.get("/api/website/:wid/page", findAllPagesForWebsite);
    app.get("/api/page/:pid", findPageById);

    app.post("/api/website/:wid/page", createPage);

    app.put("/api/page/:pid", updatePage);

    app.delete("/api/website/:wid/page/:pid", deletePage);

    function updatePage(req, res) {
        var pid = req.params.pid;
        var page = req.body;

        pageModel
            .updatePage(pid, page)
            .then(function (page) {
                    res.json(page);
                }, function (status) {
                    res.send(status);
                });

        // for (p in pages) {
        //     if (String(pages[p]._id) === String(pid)) {
        //         pages[p]=page;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pid = req.params.pid;
        var wid = req.params.wid;

        pageModel
            .deletePage(wid, pid)
            .then(function (status) {
                res.send(status);
            });
        // for (p in pages) {
        //     if (parseInt(pages[p]._id) === parseInt(pid)) {
        //         pages.splice(p, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createPage(req, res) {
        var wid = req.params.wid;
        var page = req.body;

        pageModel
            .createPage(wid, page)
            .then(
                function (page) {
                    res.json(page);
                },
                function (error) {
                    res.send(error);
                });
        // var newPage = {
        //     _id: new Date().getTime(),
        //     name: page.name,
        //     websiteId: wid,
        //     description: page.description
        // };
        // pages.push(newPage);
        // res.sendStatus(200);
    }

    function findAllPagesForWebsite(req, res) {
        var wid = req.params.wid;

        pageModel
            .findAllPagesForWebsite(wid)
            .then(function (pages) {
                res.json(pages);
                }, function (error) {
                    res.send(error);
                });
        // var results = [];
        // for (p in pages) {
        //     if (String(pages[p].websiteId) === String(wid)) {
        //         results.push(pages[p]);
        //     }
        // }
        // res.send(results);
    }

    function findPageById(req, res) {
        var pid = req.params.pid;

        pageModel
            .findPageById(pid)
            .then(function (page) {
                res.json(page);
                }, function (error) {
                    res.send(error);
                });

        // for (p in pages) {
        //     var page = pages[p];
        //     if (String(page._id) === String(pid)) {
        //         res.status(200).send(page);
        //         return;
        //     }
        // }
        // res.status(404).send("The page not found");
    }


};
