'use strict';

var User = require('../models/user');
//var request = require('request');

exports.new = function(req, res){
  res.render('users/new', {title: 'Register'});
};

exports.create = function(req, res){
  var user = new User(req.body);
  user.register(function(){
    if(user._id){
      res.redirect('/');
    }else{
      res.render('users/new', {title: 'Register'});
    }
  });
};
