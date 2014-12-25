var mongoose    = require('mongoose');
var log         = require('./log')(module);
var config      = require('./config');
mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback () {
    log.info("Connected to DB!");
});

var Schema = mongoose.Schema;

// Schemas
var User = new Schema({
    email: { type: String, required: true },
    encrypted_password: { type: String, required: true }
});

// validation
User.path('email').validate(function (v) {
    return v.length > 5 && v.length < 70;
});

var UserModel = mongoose.model('User', User);

module.exports.UserModel = UserModel;