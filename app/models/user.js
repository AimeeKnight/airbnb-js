'use strict';
module.exports = User;
var bcrypt = require('bcrypt');
var users = global.nss.db.collection('users');
var email = require('../lib/email');
var Mongo = require('mongodb');
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

User.findOne = function(id, fn){
  var _id = Mongo.ObjectID(id);
  users.findOne({_id:_id}, function(err, record){
    fn(record);
  });
};

User.findByEmailAndPassword = function(email, password, fn){
  users.findOne({email:email}, function(err, record){
    if(record){
      bcrypt.compare(password, record.password, function(err, result){
        if(result){
          fn(record);
        }else{
          fn(null);
        }
      });
    }else{
      fn(null);
    }
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

