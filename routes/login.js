'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');
var passwordHash = require('password-hash');

/* GET home page. */
router.get('/', function(req, res) {

  res.render('login', {session : req.session});
});

/* GET home page. */
router.post('/', function(req, res) {
  //ÞETTA VELDUR SQL INJECTION!!! t.d ' OR '1' = '1
  // var queryStr = "SELECT * from users WHERE username = '"+req.body.username+
  //                "' AND password = '"+ req.body.password+"'";
  // var parameters = null;
  /*var hashedPassword = passwordHash.generate(req.body.password);
  console.log('used pass: ');
  console.log(hashedPassword);
*/
  var correctPassword = false;
  var password;
  var queryStrPW = 'SELECT password FROM users WHERE username = $1';
  var parametersPW = [req.body.username];

  dbUtils.queryDb(queryStrPW, parametersPW, function(err,result) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    var passwordR =  result.rows[0];

    if(passwordR){
      password = passwordR.password;
      correctPassword = passwordHash.verify(req.body.password, password);
    }

    if(!correctPassword){
      res.render('login', 
        {msg : 'Vitlaust notendanafn og/eða lykilorð. Lúði!'}
      );
    }

    var queryStr = 'SELECT * FROM users WHERE username = $1 AND password = $2';
    var parameters = [req.body.username, password];

    dbUtils.queryDb(queryStr, parameters, function(err,result) {
      if(err) {
        return console.error('error fetching client from pool', err);
      }
      var user =  result.rows[0];

      if (user) {
        // Regenerate session when signing in
        // to prevent fixation
        req.session.regenerate(function(){
          // Store the user's primary key
          // in the session store to be retrieved,
          // or in this case the entire user object
          req.session.user = user;
          res.redirect('/wall');
        });
      }
      else {
        res.render('login');
      }
    });

  });

  



});


module.exports = router;
