
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
var ime = require('./models/IMEdata');
var app = express();
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
app.post('/dateData',getdata.dateData);
//fs.readFile('app/data/noah_push_statistic_20140417',{'encoding':'utf-8'},function(err,data){
//    if(err){return console.log(err) ;}
//    var a = eval("(" + data + ")");
//    var json = JSON.stringify(a);
//    ime.save(a);
//
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

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
