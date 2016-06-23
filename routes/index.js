var express = require('express');
var router = express.Router();
var core = require('../core');
var fs = require('fs');
var passport = require('passport');
var path = require('path');

 /* GET home page. */

// la racine renvoie à l'accueil
router.get('/', function (req, res, next) {
  res.render('Accueil', {});
});

// Page Enregistrement
router.get('/register', function (req, res) {
  res.render('register', {});
});

//Renvoie de l'enregistrement
router.post('/register', function (req, res) {

  //Creer une variable Account
  var CreationAccount = {
    username: req.param('username'),
    password: req.param('password')
  };

  // On regarde si l'utilisateur est déjà dans la BDD, donc On compte
  req.app.db.models.Account.count({'username': req.param('username')}, function (err, username){
    //si il y en a déjà un, on renvoie une erreur 401
    if (username > 0) {
      res.render('register',{err: 401});
    }else {
      if (req.param('username').length < 1) {
        res.render('register', {err: 400});
      }else if (req.param('password').length < 1) {
        // Si on ne saisit pas de mot de passe, erreur 402 !
        res.render('register', {err: 402});
      } else {
        // on créé dans la BDD un account
        req.app.db.models.Account.create(CreationAccount, function (err, Account) {
          console.log('COMPTE BIEN CREE');
          res.redirect('/Accueil');
        });
      }
    }
  });
});

//Accueil
router.get('/Accueil', function (req, res) {
  res.render('Accueil', {});
});

//si authentifié, on peut aller en page de gestion
router.post('/Accueil', function (req, res) {
  // On regarde si il y a un username
  req.app.db.models.Account.count({'username':req.param('username')}, function(err, username) {
    //Si il n'y a pas d'username dans la BDD, alors on renvoie l'erreur 403
    if (username <= 0) {
      res.render('Accueil', {err: 403});
    }else{
      // Si il y a un compte, on regarde si le mot de passe correspond au paramètrepassé
      req.app.db.models.Account.findOne({'username': req.param('username')}, function (err, account) {
        if (account.password != req.param('password')) {
          // si mot de passe incorrect on renvoie l'erreur 404
          res.render('Accueil', {err: 404});
        }else{
          req.session.username = account.username;
          res.redirect('/Gestion');
        }
      });
    }
  });
});

//utilisateur est l'utilisateur connecté
router.get('/Gestion', function (req, res, next) {
  //affichage pseudo dans la console
  console.log(req.session.username);
  //si le pseudo est undefined : l'utilisateur est pas connecté !
  // On le renvoie à l'accueil
  if (req.session.username == undefined) {
    res.redirect('/Accueil');
  }else{
    res.render('Gestion', {username: req.session.username});
  }
});

// déconnexion : renvoie à l'accueil
router.get('/logout', function (req, res) {
  //destruction de la session
  req.session.destroy();
  res.redirect('/');
});


// Page combat
router.get('/Combat', function (req, res) {
  if (req.session.username == undefined) {
    res.redirect('/Accueil');
  }else{
    res.render('Combat', {});
  }
});

//Page d'administrateur
router.get('/Admin', function (req,res) {
  if (req.session.username != 'admin') {
    res.redirect('/Accueil');
  }else {
    res.render('Admin', {});
  }
});


router.post('/Admin', function (req, res) {
  // Si il y a un compte, on regarde si le mot de passe correspond au paramètrepassé
  req.app.db.models.Account.findOne({'username':'admin'}, function (err, account) {
    if (account.password != req.param('password')) {
      // si mot de passe incorrect on renvoie l'erreur 404
      res.render('Accueil', {err: 405});
    } else {
      req.session.username = account.username;
      res.redirect('/Admin');
    }
  });

});

//L'admin peut créer des utilisateurs
router.post('/CreationAdmin',function(req,res){

  //Creer une variable Account
  var CreationAccount = {
    username: req.param('username'),
    password: req.param('password')
  };

  // On regarde si l'utilisateur est déjà dans la BDD, donc On compte
  req.app.db.models.Account.count({'username': req.param('username')}, function (err, username){
    //si il y en a déjà un, on renvoie une erreur 401
    if (username > 0) {
      res.render('admin',{err: 401});
    }else {
      if (req.param('username').length < 1) {
        res.render('admin', {err: 400});
      }else if (req.param('password').length < 1) {
        // Si on ne saisit pas de mot de passe, erreur 402 !
        res.render('admin', {err: 402});
      } else {
        // on créé dans la BDD un account
        req.app.db.models.Account.create(CreationAccount, function (err, Account) {
          console.log('COMPTE BIEN CREE');
          res.render('admin',{ok: 1});
        });
      }
    }
  });
});


router.post('/DeleteUser',function(req,res) {
  req.app.db.models.Account.count({'username': req.param('username')}, function (err, username) {
    //si il y a pas de username, on renvoie une erreur
    if (username == 0) {
      res.render('admin', {ok: -1});
    } else {
      //On ne peut pas supprimer l'admin
      if (req.param('username') == 'admin') {
        res.render('admin', {ok: -2});
      } else {
        // on supprime utilisateur de la BDD
        req.app.db.collection('accounts').remove({'username': req.param('username')}, function (err, username) {
          console.log('COMPTE SUPPRIME');
          res.render('admin', {ok: 2});
        });
      }
    }
  });
});

//Page de création de deck
router.get('/CreationDeck',function (req,res, next){
  if (req.session.username == undefined) {
    res.redirect('/Accueil');
  }else{
  
    // Creation d'un tableau de cartes pokemons
    var cartesPokemons=[];
    
    // Gestion de chacun des dossiers et ajout de l'objet au tableau
    var extensionXY = fs.readdirSync('../data/XY/XY/');
    extensionXY.forEach(function(file) {
      if (path.extname(file) === '.json') {
        var carte = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/XY/'+ file));
        cartesPokemons.push(carte.to_object());
      }
    });

    var extensionXYImpactDesDestins = fs.readdirSync('../data/XY/XY - Impact des Destins/');
    extensionXYImpactDesDestins.forEach(function(file) {
      if (path.extname(file) === '.json') {
        var carte = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/XY - Impact des Destins/'+ file));
        cartesPokemons.push(carte.to_object());
      }
    });

    var extensionXYOriginesAntiques = fs.readdirSync('../data/XY/XY - Origines Antiques/');
    extensionXYOriginesAntiques.forEach(function(file) {
      if (path.extname(file) === '.json') {
        var carte = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/XY - Origines Antiques/'+ file));
        cartesPokemons.push(carte.to_object());
      }
    });

    var extensionGeneration = fs.readdirSync('../data/XY/Generations/');
    extensionGeneration.forEach(function(file) {
      if (path.extname(file) === '.json') {
        var carte = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/Generations/'+ file));
        cartesPokemons.push(carte.to_object());
      }
    });

    var extensionPoingFurieux = fs.readdirSync('../data/XY/Poings Furieux/');
    extensionPoingFurieux.forEach(function(file) {
      if (path.extname(file) === '.json') {
        var carte = new core.Builder().createFromJSON(fs.readFileSync('../data/XY/Poings Furieux/'+ file));
        cartesPokemons.push(carte.to_object());
      }
    });

    res.render('CreationDeck', { cartes: cartesPokemons});

  }
});


module.exports = router;
