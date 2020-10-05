var http = require('http');
var fs   = require('fs');
var qs = require('querystring');

var color;
var size;

function parseCookies (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}


http.createServer(function (request, response) {

  if (request.method == 'POST') {
     var body = '';

      request.on('data', function (data) {
          body += data;
      });

      request.on('end', function () {
          var obj = qs.parse(body)
          
          color = obj.color;
          size  = obj.size
      });

      // To Write a Cookie

       fs.readFile('form_3.html', function (err, data){
          if (err) {
              response.end("File wasn't found");
          }
          response.writeHead(200, {
            'Set-Cookie': [`color=${ color }`,
            `size=${ size }`],
            'Content-Type': 'text/html'
          }); 
          response.end(data);
      });

  } else {
      fs.readFile('form_3.html', function (err, data){
          if (err) {
              response.end("File wasn't found");
          }
          response.writeHeader(200, {"Content-Type": "text/html"});  
          response.end(data);
      });
  }

  // To Read a Cookie

console.log();
}).listen(8124);

console.log('Server running at http://127.0.0.1:8124/');
