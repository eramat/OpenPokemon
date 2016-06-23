/**
 * Created by Nathan on 08/06/2016.
 */

exports = module.exports = function (app, mongoose){
    require('./BDD/Account')(app,mongoose);
};