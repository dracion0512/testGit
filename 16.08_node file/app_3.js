var request = require('request');
var fs = require('fs')
var csv;

request.get('http://www.whatever.com/my.csv', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        csv = body;
        // Continue with your processing here.

        fs.writeFileSync("test_3.txt", csv)
    }
});
		

