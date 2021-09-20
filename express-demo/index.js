// const { response } = require('express');
const config =require("config")
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
// const { application } = require("express");

const courses = require("./courses");
const app = express(); //returning from express import

////Environment  
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
console.log(app.get('env'));

////Middleware
app.use(express.json()); //to parse the body of requests with a JSON payload
app.use(express.urlencoded({extended: true}));// to be able to read url encoded payload
app.use(express.static('public'));//to serve static files

// Thirdparty Middleware
app.use(helmet());
app.use(morgan('tiny'));//log the request that we add


app.use('/', courses);

//Configuration
//Storing configuration setting to our application
console.log('Application Name: '+ config.get('name'));
console.log('Mail Server: '+ config.get('mail.host'));
console.log('Mail Pasword: '+ config.get('mail.password'));


if (app.get('env')==='development'){
  app.use(morgan('tiny'));
  console.log("Morgan enabled...")
}

//Custom Middleware
app.use(logger);
app.use(function(req, res, next){   
  console.log('Authenticating...');
  next();// pass control to the next middle ware function, not working in d
} );


//templating engine
app.set('view engine', 'pug');
app.set('views','./views');

app.get("/", (req, res) => {
  res.render('index',{
    title:"My Express App", 
    message:"Hello World"
  });
}); // templating engine




app.get("/", (req, res) => {
  res.send("Hello World");
}); // '/' is represent route of the website







//PORT
const port = process.env.PORT || 3000; //environment variable
app.listen(port, () => {
  console.log(`listening on port ${port}...`); 
}); // port is dynamic
