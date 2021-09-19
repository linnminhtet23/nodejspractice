const fs = require('fs');


//there is two way to use functions (synchronous and asynchronous)
// always use nonblocking or asynchronous in node js 

// const files = fs.readdirSync('./'); //Sync method
// console.log(files);

fs.readdir('./',function(err, files){//async method
    if(err){
        console.log('Error',err)
    }else{
        console.log('Result',files)
    }
});