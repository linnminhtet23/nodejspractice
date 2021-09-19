//debugging function
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

const morgan = require("morgan");
const express = require("express");
const app = express(); //returning from express import

if(app.get('env')==='development'){
    app.use(morgan('tiny'));
    startupDebugger('Morgan enabled...');
}

//db work
dbDebugger('Connect to the database...');

const port = process.env.PORT||3000;
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})