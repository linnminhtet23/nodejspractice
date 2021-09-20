// const { response } = require('express');
const config =require("config")
const helmet = require("helmet");
const morgan = require("morgan");
const Joi = require("joi");
const express = require("express");
const logger = require("./logger");
// const { application } = require("express");
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


const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
];

// app.get("/", (req, res) => {
//   res.send("Hello World");
// }); // '/' is represent route of the website


app.get("/", (req, res) => {
  res.render('index',{

  });
}); // templating engine



app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  // res.send(req.params.id);
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    res.status(404).send("The course with the given ID was not found.");
  res.send(course);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.query);
});

//post
app.post("/api/courses", (req, res) => {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  const result = Joi.validate(req.body, schema);

  if (result.error) {
    //400 Bad request
    // res.status(400).send("Name is requied and should be minimum 3 characters.");
    return res.status(400).send(result.error.details[0].message);
     // dont want other operation in the function to be executed
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course); //add into array
  res.send(course); //send the response
});

//PUT
app.put("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID was not found.");

  //   const schema = {
  //     name: Joi.string().min(3).required(),
  //   };
  //   const result = Joi.validate(req.body, schema);
//   const result = validateCourse(request.body);
  const { error } = validateCourse(req.body); // {} object destructuring

  if (error) {
    //400 Bad request
    // res.status(400).send("Name is requied and should be minimum 3 characters.");
   return res.status(400).send(error.details[0].message);
    // dont want other operation in the function to be executed
  }

  //Update course
  course.name = req.body.name;
  res.send(course);
});

//DELETE
app.delete('/api/courses/:id',(req, res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course)
      return res.status(404).send("The course with the given ID was not found.");

    //Delete
    const index =courses.indexOf(course);
    courses.splice(index,1);
    
    //return the same course
    res.send(course);
})

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(course, schema);
}

//PORT
const port = process.env.PORT || 3000; //environment variable
app.listen(port, () => {
  console.log(`listening on port ${port}...`); 
}); // port is dynamic
