var mongodb = require('./mongodb');
var Schema = mongodb.mongoose.Schema;
var imeSchema = new Schema({
    ID:String,
    DISMISS:{
        PAGEOPENED:{
            all:Number,
            user:Number
        },
        TOASTCLOSED:{
            all:Number,
            user:Number
        },
        TOASTCLICKED:{
            all:Number,
            user:Number
        },
        APPLAUNCHED:{
            all:Number,
            user:Number
        },
        NONE:{
            all:Number,
            user:Number
        }
    },
    CLICK:{
        NONE:{
            all:Number,
            user:Number
        }
    },
    SHOW:{
        NONE:{
            all:Number,
            user:Number
        }
    }

});
var IMEModel = mongodb.mongoose.model('IME','imeSchema');
var dbFunc = function(){};

dbFunc.prototype.save = function(obj, callback) {
    var instance = new IMEModel(obj);
    instance.save(function(err){
        callback(err);
    });
};

dbFunc.prototype.findByIdAndUpdate = function(obj,callback){
    var _id=obj._id;
    delete obj._id;
    IMEModel.findOneAndUpdate(_id, obj, function(err,obj){
        callback(err, obj);
    });
};


dbFunc.prototype.findByName = function(name, callback) {
    IMEModel.findOne({name:name}, function(err, obj){
        callback(err, obj);
    });
};

module.exports = new dbFunc();