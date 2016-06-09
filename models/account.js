/**
 * Created by boulanger on 08/06/2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
    username: String,
    Prenom: String,
    email: String,
    Pseudo : String,
    password: String
});

Account.plugin(passportLocalMongoose);
console.log(Account);
module.exports = mongoose.model('Account', Account);