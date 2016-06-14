/**
 * Created by boulanger on 08/06/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    password: String,
    mail: String
});

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);