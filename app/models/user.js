'use strict';
module.exports = User;
var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var email = require('../lib/email');
//var Mongo = require('mongodb');
//var fs = require('fs');
//var path = require('path');

function User(user){
  this.email = user.email;
  this.password = user.password;
  this.role = user.role;
}

User.prototype.register = function(fn){
  var self = this;
  hashPassword(self.password, function(hashedPassword){
    self.password = hashedPassword;
    insert(self, function(err){
      if(self._id){
        // err will be undefined is using nomail because mail won't be sent
        // else err will be null if mail was sent
        email.sendWelcome({to:self.email}, function(err, body){
          fn(err, body);
        });
      }else{
        fn();
      }
    });
  });
};

////////// PRIVATE - NONEXPORTED //////////
function hashPassword(password, fn) {
  bcrypt.hash(password, 8, function(err, hash){
    fn(hash);
  });
}

function insert(user, fn){
  users.findOne({email:user.email}, function(err, record){
    if (!record) {
      users.insert(user, function(err, record){
        // err should be null
        fn(err);
      });
    }else{
        // err should be undefined
      fn(err);
    }
  });
}

