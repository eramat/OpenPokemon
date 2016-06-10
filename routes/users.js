/**
 * Created by boulanger on 10/06/2016.
 */
var express = require('express');
var router = express.Router();

    /* GET users listing. */
        router.get('/', function(req, res, next) {
             res.send('respond with a resource');
            });

    module.exports = router;