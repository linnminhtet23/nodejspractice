const express = require('express');
const Joi = require("joi");

const router = express.Router();


const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
  ];

router.get("/", (req, res) => {
    res.send(courses);
  });
  
  router.get("/:id", (req, res) => {
    // res.send(req.params.id);
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
      res.status(404).send("The course with the given ID was not found.");
    res.send(course);
  });
  
  router.get("/api/posts/:year/:month", (req, res) => {
    res.send(req.query);
  });
  
  //post
  router.post("/", (req, res) => {
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
  router.put("/:id", (req, res) => {
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
  router.delete('/:id',(req, res)=>{
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

  module.exports = router;