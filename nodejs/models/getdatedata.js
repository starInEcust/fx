/**
 * Created by Star on 2014/4/17 0017.
 */
var fs = require('fs');
var fullData = {};
module.exports = {
	'dateData': function (req, response) {
		var date = req.body.date;
		var regexFlag = req.body.flag;
		console.log(regexFlag);
		fs.readFile('app/data/noah_push_statistic_' + date, {'encoding': 'utf-8'}, function (err, data) {
			var regex = '/^' + regexFlag + '/i';
			regex = eval(regex);
			console.log(typeof (regex));
			var a = eval("(" + data + ")");
			if (regexFlag == 'Dialer_OEM') {
				for (var key in a) {
					if (!regex.test(key) && key != 'OEM002025002' && key != 'OEM042035001') {
						delete a[key];
					}
				}
			} else {
				for (var key in a) {
					if (!regex.test(key)) {
						delete a[key];
					}
				}
			}
			var json = JSON.stringify(a);
			console.log(json);
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
