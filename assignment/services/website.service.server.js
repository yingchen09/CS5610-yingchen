module.exports = function(app, models) {
    var websiteModel = models.websiteModel;

    app.get('/api/user/:uid/website', findWebsitesByUser);
    app.get('/api/website/:wid',findWebsiteById);

    app.put('/api/website/:wid',updateWebsite);

    app.post('/api/user/:uid/website',createWebsite);

    app.delete('/api/user/:uid/website/:wid',deleteWebsite);

    function deleteWebsite(req, res) {
        var wid = req.params.wid;
        var uid = req.params.uid;

        websiteModel
            .deleteWebsite(uid, wid)
            .then(function (status) {
                res.send(status);
            });
        // for (w in websites) {
        //     if (String(websites[w]._id) === String(wid)) {
        //         websites.splice(w, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function createWebsite(req, res) {
        var uid = req.params.uid;
        var website = req.body;

        websiteModel
            .createWebsite(uid, website)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.send(error);
            });
        // var newWebsite = {
        //     _id: new Date().getTime(),
        //     name: website.name,
        //     desc: website.desc,
        //     developerId: uid
        // };
        // websites.push(newWebsite);
        // res.sendStatus(200);
    }


    function updateWebsite(req, res) {
        var wid = req.params.wid;
        var website = req.body;

        websiteModel
            .updateWebsite(wid, website)
            .then(function (status) {
                res.send(status);
            });

        // for (w in websites) {
        //     if (String(websites[w]._id) === String(wid)) {
        //         websites[w] = website;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function findWebsiteById(req, res) {
        var wid = req.params.wid;

        websiteModel
            .findWebsiteById(wid)
            .then(function (website) {
                res.json(website);
            }, function (error) {
                res.status(404).send("The website not found");
            });
        // for (w in websites) {
        //     var website = websites[w];
        //     if (parseInt(website._id) === parseInt(wid)) {
        //         res.status(200).send(website);
        //         return;
        //     }
        // }
        // res.status(404).send("The website not found");
    }

    function findWebsitesByUser(req, res) {
        var uid = req.params.uid;
        websiteModel
            .findWebsitesByUser(uid)
            .then(function (websites) {
                res.json(websites);
            });
        // var results = [];
        // for (w in websites) {
        //     if (String(websites[w].developerId) === String(uid)) {
        //         results.push(websites[w]);
        //     }
        // }
        // res.send(results);
    }
};
