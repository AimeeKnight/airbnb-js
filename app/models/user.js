'use strict';
module.exports = User;
var bcrypt = require('bcrypt');
//var users = global.nss.db.collection('users');
//var Mongo = require('mongodb');
//var fs = require('fs');
//var path = require('path');

function User(user){
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
}

User.prototype.hashPassword = function(fn){
  var self = this;

  bcrypt.hash(self.password, 8, function(err, hash){
    self.password = hash;
    fn(err);
  });
};
