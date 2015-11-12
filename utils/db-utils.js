'use strict';
var pg = require('pg');
//var conString = 'postgres://sandragunnarsdottir:@localhost/nodegoat';
var conString = 'postgres://bcncokaggomsob:d28sQoNQKvoAVEV9Tlps0RDBZC@ec2-107-21-219-235.compute-1.amazonaws.com:5432/decai7npeph56c?ssl=true'

exports.queryDb = function(queryStr, parameters, then) {
  pg.connect(conString, function(err, client, done) {
    if(err) {
      return console.error('error fetching client from pool', err);
    }
    client.query(queryStr, parameters, function(err, result) {
      //call `done()` to release the client back to the pool
      done();
      if(err) {
        return then(err, null);
      }
      then(null, result);
    });
  });
};
