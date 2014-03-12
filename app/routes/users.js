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

exports.login = function(req, res){
  res.render('users/login', {title: 'Login'});
};

exports.authenticate = function(req, res){
  User.findByEmailAndPassword(req.body.email, req.body.password, function(user){
    if(user){
      req.session.regenerate(function(){
        req.session.userId = user._id.toString();
        req.session.save(function(){
          res.redirect('/');
          //res.redirect('users/' + req.session.userId);
        });
      });
    }else{
      req.session.destroy(function(){
        res.render('users/login', {title: 'Login'});
      });
    }
  });
};
