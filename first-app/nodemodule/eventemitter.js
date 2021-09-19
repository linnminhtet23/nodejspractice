const EventEmitter = require("events"); //class
// const emitter = new EventEmitter(); //object


//Raised an event
// emitter.emit("messageLogged",{id:1,url:'http://'});//event argument
const Logger= require('./logger');
const logger = new Logger();

//Register a listener
logger.on("messageLogged",(e)=> {
    console.log("Listener called",e);
  });
  
logger.log('message');


//Raise: logging(data:message)
//making a noise, produce - signalling
