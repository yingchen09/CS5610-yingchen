module.exports = function(mongoose){
    var websiteSchema = require("../website/website.schema.server.js")(mongoose);
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username : {type : String, required : true, unique : true},
        password : {type : String, required : true},
        firstName : String,
        lastName : String,
        roles : [{type : String,
            default: 'USER',
            enum: ['USER', 'ADMIN', 'FACULTY', 'STUDENT']}],
        google: {
            id:    String,
            token: String
        },
        email : String,
        phone : String,
        websites : [{
            type: Schema.Types.ObjectId,
            ref : 'websiteModel'
        }],
        dateCreated : {
            type : Date,
            default: Date.now
        }
    }, {collection: 'user'});

    return userSchema;
};
