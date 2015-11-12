'use strict';

var express = require('express');
var router = express.Router();
var dbUtils = require('../utils/db-utils');


/* GET home page. */
router.get('/', function(req, res) {

	var queryStr = 'SELECT * FROM entries ORDER BY create_date DESC LIMIT 30';
	dbUtils.queryDb(queryStr, null, function(err, result) {
	if(err) {
	  return console.error('error fetching client from pool', err);
	}
	var data = {session : req.session};
	data.results = result.rows;
	res.render('wall', data);
	});
});


module.exports = router;




