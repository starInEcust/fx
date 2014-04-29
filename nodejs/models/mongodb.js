var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/neeyaChart');
//var db = mongoose.createConnection('localhost','neeyaChart');
//db.on('error',console.error.bind(console,'连接错误:'));
//db.once('open',function(){
//    console.log('连接成功');
//});
exports.mongoose = mongoose;