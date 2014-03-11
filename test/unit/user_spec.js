'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
//var Mongo = require('mongodb');
//var exec = require('child_process').exec;
//var fs = require('fs');
var User;
//var sue;

describe('User', function(){

  before(function(done){
    var initMongo = require('../../app/lib/init-mongo');
    initMongo.db(function(){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      //sue = new User({userName: 'Sue Williams', email:'sue@aol.com', password:'abcd'});
      //sue.hashPassword(function(){
        //sue.insert(function(){
      done();
        //});
      //});
    });
  });

  describe('new', function(){
    it('should create a new User object', function(){
      var u1 = new User({role:'host', email:'bob@nomail.com', password:'1234'});
      expect(u1).to.be.instanceof(User);
      expect(u1.email).to.equal('bob@nomail.com');
      expect(u1.password).to.equal('1234');
      expect(u1.role).to.equal('host');
    });
  });

  describe('#hashPassword', function(){
    it('should hash a password with salt', function(done){
      var u1 = new User({role: 'host', userName: 'bob jones', email:'bob@aol.com', password:'1234'});
      u1.hashPassword(function(){
        expect(u1.password).to.not.equal('1234');
        done();
      });
    });
  });
////////// END //////////
});
