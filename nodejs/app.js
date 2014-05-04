
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
app.engine('.html',ejs.__express);
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


app.get('/', function(req,res){
    res.sendfile('app/index.html');
});
app.get('/users', user.list);
io.on('connection',function(socket){
	console.log('client connected');
	socket.emit('open');
	socket.on('message',function(msg){
//		console.log(msg.startDate);
//		if(msg.type == 'timeBucket'){
//			console.log('timeBucket');
//		}
	});
//	socket.on('timeBucket',function(data){
//		console.log(data);
////		getdata.timeBucket(data.startDate,data.EndDate);
//
//	});
	var num = 1;
	socket.on('oneDay',function(data){
		console.log(num);
		num++;
		var date = data.startDate;
		var regexFlag = data.flag;
//		console.log(date);
//		console.log(regexFlag);
			fs.readFile('app/data/noah_push_statistic_' + date, {'encoding': 'utf-8'}, function (err, data) {
//				var regex = '/^' + regexFlag + '/i';
//				regex = eval(regex);
////			console.log(typeof (regex));
//				var dataObj = eval("(" + data + ")");
//				for (var key in a) {
//					if (!regex.test(key)) {
//						delete a[key];
//					}
//				}
				socket.emit('oneDayData',data);
			});
	});

});
//app.post('/dateData',getdata.dateData);
//fs.readFile('app/data/noah_push_statistic_20140424',{'encoding':'utf-8'},function(err,data){
//    if(err){return console.log(err) ;}
//    var dataObj= eval("(" + data + ")");
//    var json = JSON.stringify(dataObj);
//
//		ime.save({"20140424":json},function(err){
//			console.log('aaa'+err);
//		});
//
//});

//app.post('/timeBucket',getdata.timeBucket);
//var req = http.get(options, function(res) {
//    console.log('STATUS: ' + res.statusCode);
//    console.log('HEADERS: ' + JSON.stringify(res.headers));
//    res.setEncoding('utf8');
//    res.on('data', function (chunk) {
////        console.log(chunk);
//        jsonData = chunk;
//    });
//});
//req.on('error', function(e) {
//    console.log('problem with request: ' + e.message);
//});

// write data to request body
//req.write('data\n');
//req.write('data\n');
//req.end();
//var options = {
//    //host不用加HTTP
//    host: '127.0.0.1',
//    port: 8000,
//    path: '/truedata.json'
//};
//

server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
