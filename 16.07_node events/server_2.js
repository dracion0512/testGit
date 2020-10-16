var http = require('http');
var fs = require('fs');
var qs = require('querystring');
var events = require('events');
var eventEmitter = new events.EventEmitter();




var server = http.createServer(function(req, res) {
  eventEmitter.on('myCustomEvent', eventFunc)

      function eventFunc(elem) {
          console.log(elem)
          if (elem.length >= 2 && Array.isArray(elem)) {
              res.write("congrats")
              res.end()
          } else {
              readFile("index_2.html")
          } 
        }

    function readFile(name) {
        fs.readFile(name, function(err, data) {
            if (err) {
                res.end("File wasn't found");
            }
            res.writeHeader(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

    if (req.url === '/favicon.ico') {
        return;
    }

    if (req.method == 'POST') {
        var body = '';
        var checkValues = [];

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', function() {
            var obj = qs.parse(body);

             eventEmitter.emit('myCustomEvent', obj.test_box);
        });

    } else {
        readFile('index_2.html')
    }


});
server.listen(9090);

console.log('server running...')