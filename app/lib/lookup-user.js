'use strict';

module.exports = function(req, res, next){
  var User = require('../models/user');

  User.findOne(req.session.userId, function(foundUser){
    // in express, res.local allows you to set an object available anywhere down the pipeline
    // (jade, routes)
    // set foundUser object to res.locals.user since we only want Redis to store the id not the whole object
    // due to lack of memory in Redis
    res.locals.user = foundUser;
    next();
  });
};

