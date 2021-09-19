//module wrapper function
// (function(exports, require, module, __filename, __dirname){
console.log(__filename);
console.log(__dirname);
var url = "http://mylogger.io/log";

const EventEmitter = require("events"); //class
// const emitter = new EventEmitter(); //object is an actual instance

class Logger extends EventEmitter {
  log(message) {
    //Send a HTTP request
    console.log(message);

    //Raise an event
    this.emit("messageLogged", { id: 1, url: "http://" }); //except of using emitter object use this
  }
}

//export a module
//export is use to export function to use from another file
// module.exports.log = log;
module.exports = Logger;

// module.exports.url = url;
// exports
// })
