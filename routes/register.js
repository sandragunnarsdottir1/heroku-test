'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var passwordHash = require('password-hash');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('register' , {session : req.session});
});

/* GET home page. */
router.post('/', function(req, res) {
  
  var hashedPassword = passwordHash.generate(req.body.password);
  var queryStr = 'INSERT INTO users '+
  '(name, username, password) '+
  'VALUES ($1,$2,$3)';
  var parameters = [req.body.name, req.body.username, hashedPassword];
  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err) {
      res.render('register');
      return console.error('error fetching client from pool', err);
    }
    res.render('register', {msg: 'Takk fyrir skráninguna félagi!'});
  });
  //res.render('register');
});


module.exports = router;
