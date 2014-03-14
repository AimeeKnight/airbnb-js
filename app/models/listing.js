'use strict';
module.exports = Listing;
var listings = global.nss.db.collection('listings');
//var Mongo = require('mongodb');

function Listing(listing){
  this.name = listing.name;
  this.amount = listing.amount * 1;
  this.address = listing.address;
  this.coordinates = [listing.lat * 1, listing.lng * 1];
}

Listing.prototype.insert = function(fn){
  listings.insert(this, function(err, records){
    fn();
  });
};

Listing.findAll = function(fn){
  listings.find().toArray(function(err, records){
    fn(records);
  });
};

Listing.findByGeo = function(query, fn){
  var lat = query.lat * 1;
  var lng = query.lng * 1;

  listings.find({'coordinates':{$nearSphere:{$geometry:{type:'Point', coordinates:[lat, lng]}}, $maxDistance : 2500000}}).toArray(function(err, records){
    fn(records);
  });
};
