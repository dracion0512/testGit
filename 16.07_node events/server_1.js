var http = require('http');

var userCount = 0;

var events = require('events');
var eventEmitter = new events.EventEmitter();

 function eventFunc() {
  if (userCount % 10 == 0 && userCount != 0) {
  	console.log("congrats "+userCount)
  }
}

eventEmitter.on('myCustomEvent', eventFunc)


var server = http.createServer(function (req, res) {

	if(req.url === '/favicon.ico'){

	    return;

	}

    userCount++;

	eventEmitter.emit('myCustomEvent');

    res.writeHead(200, { 'Content-Type': 'text/plain' });

    res.write('Hello!\n');

    res.write('We have had ' + userCount + ' visits!\n');

    res.end();

});
server.listen(9090);

console.log('server running...')


