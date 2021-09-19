const http = require('http');

const server = http.createServer((req, res)=>{ //need two parameter
    if(req.url==='/'){
        res.write('Hello World');
        res.end();
    }

    if(req.url==='/api/courses'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});//1.create webserver

//on method is use to handle that event
server.on('connection',(socket)=>{ 
    console.log("New connection...")
})//3. use on function to check the web page is connected or not

server.listen(3000);//2.add listener

console.log('Listen on port 3000...')


//every time new connection or new request this server raises an event