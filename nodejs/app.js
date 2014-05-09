/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var ejs = require('ejs');
var getdata = require('./models/getdatedata');
var fs = require('fs');
//var ime = require('./models/IMEdata');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
// all environments
app.set('port', process.env.PORT || 3002);
app.set('views', path.join(__dirname, 'views'));
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
//app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


app.get('/', function (req, res) {
	res.sendfile('app/index.html');
});
app.get('/users', user.list);
io.on('connection', function (socket) {
	console.log('client connected');
	socket.emit('open');
	socket.on('message', function (msg) {
	});
	var num = 1;
	socket.on('oneDay', function (data) {
		console.log(num);
		num++;
		var date = data.Date;
		fs.readFile('app/data/noah_push_statistic_' + date, {'encoding': 'utf-8'}, function (err, data) {
			if (err) {
				console.log(err);
			}
			if (data) {
				var dataObj = {};
				dataObj.date = date;
				dataObj.data = data;
			}


				console.log(dataObj);
//				console.log(typeof (dataObj[date]));

			socket.emit('oneDayData', dataObj);
		});
	});
	socket.on('disconnect', function () {
		console.log('disconnect');
	});

});

server.listen(app.get('port'), function () {
	console.log('Express server listening on port ' + app.get('port'));
});
