/**
 * Created by Nathan on 08/06/2016.
 */

//Création d'un schéma pour nos Accounts

exports = module.exports = function(app,mongoose){

    var Account = new mongoose.Schema({
        username: String,
        password: String

    });

    // Modele du schéma
    app.db.model('Account',Account);
};