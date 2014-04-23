/**
 * Created by Star on 2014/4/17 0017.
 */
var fs = require('fs');
var fullData = {};
module.exports = {
    'dateData': function (req, response) {
        var date = req.body.date;
        var regexFlag = req.body.Flag;
        fs.readFile('app/data/noah_push_statistic_' + date, {'encoding': 'utf-8'}, function (err, data) {
            var regex = /^IME_ONLINE/i;

            var a = eval("(" + data + ")");
            for (var key in a) {
                if (!regex.test(key)) {
                    delete a[key];
                }
            }
            var json = JSON.stringify(a);
            response.send(json);
        });
    }
//    'timeBucket':function(request,response){
////
//        var dateStart = request.body.dateStart;
//        var dateEnd = request.body.dateEnd;
//        for(var i = dateStart;i<=dateEnd;i++){
////            console.log(i);
//            fs.readFile('app/data/noah_push_statistic_'+i,{'encoding':'utf-8'},function(err,data){
////            console.log(data);
//                if(err){consolo.log(err);return;}
//                fullData[i] = data;
////                console.log(fullData.dateStart);
//                console.log(fullData[i]);
//
////                if(i == dateEnd){
//////                    console.log(fullData);
////                    response.send(fullData);
////                }
//            });
//        }

//    }
};
