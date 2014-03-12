'use strict';

module.exports = function(req, res, next){
  if(req.url === '/' || req.url === '/register' || req.url === '/login'){
    next();
  }else{
    if(req.session.userId){
      next();
    }else{
      res.redirect('/');
    }
  }
};

