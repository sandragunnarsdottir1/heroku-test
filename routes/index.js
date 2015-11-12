'use strict';

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	var data = {session : req.session};
    res.render('index', data);
});


module.exports = router;
