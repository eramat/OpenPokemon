/**
 * Created by Nathan on 15/06/2016.
 */

/*function errorPseudoExistant() {
    var name = document.getElementById('pseudo');
    var requete = "db.collection('account').find( { username: " +name+ " })";
    var divError = document.getElementById('errorPseudoExistant');
    if(requete){
        divError.style.display = 'block';
    }
}*/

var MongoObjectID = require("mongodb").ObjectID;
var idToFind      = "nathan";
var objToFind     = { username: new MongoObjectID(idToFind) };

OpenPokemon.collection("accounts").findOne(objToFind, function(error, result) {
    if (error) throw error;

    console.log(
        "ID : "  + result._id.toString() + "\n"
        "Nom : " + result.username + "\n"
    );
});