//export `heroku config -s`
module.exports = function() {
    var connectionString =  null;

    if (process.env.MONGODB_URI) {
        connectionString = 'mongodb://<cs5610-webdev-yingchen>:<th22977cy>@ds011291.mlab.com:11291/heroku_wmg1j907';
    }
    else
    {
        connectionString = 'mongodb://localhost/cs5610'
    }

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);
    mongoose.Promise = require('q').Promise;

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
        // we're connected!
    });

    var userModel = require("./user/user.model.server.js")(mongoose);
    var websiteModel = require("./website/website.model.server.js")(mongoose, userModel);
    // var pageModel =  require("./page/page.model.server.js")(mongoose);
    // var widgetModel = require("./widget/widget.model.server.js")(mongoose);

    var models = {
        'userModel' : userModel,
        'websiteModel' : websiteModel
        // 'pageModel' : pageModel,
        // 'widgetModel' : widgetModel
    };

    return models;
}