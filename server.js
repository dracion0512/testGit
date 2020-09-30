var http = require('http');
var fs = require('fs');
var qs = require('querystring');

var arr = [];

http.createServer(function(req, res) {
    if (req.method == 'POST') {
        var body = '';

        req.on('data', function(data) {
            body += data;
        });

        req.on('end', function() {
            var obj = qs.parse(body)
            if (Number(obj.test) == 0) {
                var sum = Number(0);
                for (var i = arr.length - 1; i >= 0; i--) {
                    sum = sum + Number(arr[i])
                }
                arr = [];
                res.end(`${sum}`);
            } else {
                arr.push(Number(obj.test));
                fs.readFile('index.html', function(err, data) {
                    if (err) {
                        res.end("File wasn't found");
                    }
                    res.writeHeader(200, { "Content-Type": "text/html" });
                    res.end(data);
                });
            }
        });

    } else {
        fs.readFile('index.html', function(err, data) {
            if (err) {
                res.end("File wasn't found");
            }
            res.writeHeader(200, { "Content-Type": "text/html" });
            res.end(data);
        });
    }
}).listen(8080);