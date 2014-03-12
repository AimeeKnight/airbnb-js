/* jshint expr:true */
'use strict';

process.env.DBNAME = 'airbnb-test';
var expect = require('chai').expect;
var Mongo = require('mongodb');
//var exec = require('child_process').exec;
//var fs = require('fs');
var User;
var u2;

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
      u2 = new User({role: 'host', email:'sue@nomail.com', password:'abcd'});
      u2.register(function(){
        done();
      });
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

  describe('#register', function(){
    it('should register a new User', function(done){
      var u1 = new User({role: 'host', email:'aimeesk8@gmail.com', password:'1234'});
      u1.register(function(err, body){
        // err will be undefined is using nomail because mail won't be sent
        // will get unexpected token if mailgun doesn't run
        expect(err).to.be.null;
        expect(u1.password).to.have.length(60);
        expect(u1._id).to.be.instanceof(Mongo.ObjectID);
        body = JSON.parse(body);
        console.log(body);
        done();
      });
    });

    it('should not register a user if the email is already in mongo', function(done){
      var u1 = new User({role: 'host', email:'sue@nomail.com', password:'1234'});
      u1.register(function(err){
        expect(u1._id).to.be.undefined;
        done();
      });
    });
  });

////////// END //////////
});
