const http = require("http");
const fs = require("fs");

const handleRequest = (request, response) => {
  // SECURITY STUFF
  // Website you wish to allow to connect
  response.setHeader('Access-Control-Allow-Origin', '*');
  
  // Request methods you wish to allow
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
  // Request headers you wish to allow
  response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  response.setHeader('Access-Control-Allow-Credentials', true);
  
  // OTHER STUFF
  response.writeHead(200);
  response.write(fs.readFileSync("." + request.url));
  response.end();
  return response;
};

const server = http.createServer(handleRequest);

server.listen(3333);