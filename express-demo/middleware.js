const helmet = require("helmet");
const morgan = require("morgan");
const logger = require("./logger");
const express = require("express");
const app = express(); //returning from express import


////Middleware
app.use(express.json()); //to parse the body of requests with a JSON payload
app.use(express.urlencoded({extended: true}));// to be able to read url encoded payload
app.use(express.static('public'));//to serve static files

// Thirdparty Middleware
app.use(helmet());
app.use(morgan('tiny'));//log the request that we add

//Custom Middleware
app.use(logger);
app.use(function(req, res, next){   
  console.log('Authenticating...');
  next();// pass control to the next middle ware function, not working in d
} );

if (app.get('env')==='development'){
  app.use(morgan('tiny'));
  console.log("Morgan enabled...")
}