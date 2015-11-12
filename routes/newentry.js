'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');


/* GET home page. */
router.get('/', function(req, res) {
  res.render('newentry', {session : req.session});
});


router.post('/', function(req, res) {
  console.log(req.session);
  var queryStr = 'INSERT INTO entries ' + 
  ' (entry_text, username, create_date) ' +
  'VALUES ($1, $2, now())';
  var parameters = [req.body.entry, req.session.user.username];
  dbUtils.queryDb(queryStr, parameters, function(err) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    res.redirect('/wall');
  });
});

module.exports = router;