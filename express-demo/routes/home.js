const express = require('express');
const home = express.Router();

home.get("/", (req, res) => {
    res.render('index',{
      title:"My Express router", 
      message:"Hello World"
    });
  }); // templating engine

  module.exports = home;