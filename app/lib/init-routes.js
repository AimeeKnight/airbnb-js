'use strict';

var d = require('../lib/request-debug');
var initialized = false;

module.exports = function(req, res, next){
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = require('../routes/home');
  var users = require('../routes/users');
  var listings = require('../routes/listings');

  app.get('/', d, home.index);
  app.get('/register', d, users.new);
  app.post('/register', d, users.create);
  app.get('/login', d, users.login);
  app.post('/login', d, users.authenticate);

  app.get('/listings/new', d, listings.new);
  app.post('/listings', d, listings.create);
  app.get('/listings', d, listings.index);
  console.log('Routes Loaded');
  fn();
}

