module.exports = function(mongoose){
    var Schema = mongoose.Schema;

    var websiteSchema = new Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: "userModel"},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'website'});

    return websiteSchema;
};
