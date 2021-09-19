function log(req, res, next){
    console.log('Logging...');
    next();// pass control to the next middle ware function
  }

  module.exports =log;