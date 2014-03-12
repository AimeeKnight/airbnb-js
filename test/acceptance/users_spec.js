/* jshint expr:true */
'use strict';

process.env.DBNAME = 'users-test';
var app = require('../../app/app');
var request = require('supertest');
var expect = require('chai').expect;
//var fs = require('fs');
//var exec = require('child_process').exec;
var User, u2;
//var cookie;

describe('users', function(){

  before(function(done){
    request(app)
    .get('/')
    .end(function(err, res){
      User = require('../../app/models/user');
      done();
    });
  });

  beforeEach(function(done){
    global.nss.db.dropDatabase(function(err, result){
      u2 = new User({role:'host', email:'sue@nomail.com', password:'abcd'});
      u2.register(function(){
        done();
      });
    });
  });

  describe('GET /register', function(){
    it('should display the register page', function(done){
      request(app)
      .get('/register')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  });

  describe('POST /register', function(){
    it('should register a user', function(done){
      request(app)
      .post('/register')
      .field('email', 'bob@nomail.com')
      .field('role', 'host')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(302);
        done();
      });
    });

    it('should not register a duplicate email', function(done){
      request(app)
      .post('/register')
      .field('email', 'sue@nomail.com')
      .field('role', 'host')
      .field('password', '1234')
      .end(function(err, res){
        expect(res.status).to.equal(200);
        expect(res.text).to.include('Register');
        done();
      });
    });
  //////////
  });
//////////
});
