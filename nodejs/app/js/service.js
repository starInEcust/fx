/**
 * Created by Star on 2014/4/17 0017.
 */
app.factory('dateData', ['$http', '$q', '$rootScope', 'dataSelecter' ,function ($http, $q, $rootScope, dataSelecter) {
	return {
		data: '',
		getData: function () {
			var socket = io.connect('http://localhost:3002');
			var deferred = $q.defer();
			var flag = null;
			var self = this;
			console.log($rootScope.chartType);
			switch ($rootScope.chartType) {
				case '输入法OEM版数据':
					flag = 'IME_OEM';
					break;
				case '输入法ONLINE数据':
					flag = 'IME_ONLINE';
					break;
				case '号码助手数据':
					flag = 'dialer';
					break;
				default :
					console.log('dataType is error');
			}
			if (!$rootScope.dateEnd) {
//				$http.post('dateData', {'date': $rootScope.dateStart, 'flag': flag}).success(function (data) {
//					deferred.resolve(data);
//				}).error(function (err) {
//					console.log(err);
//				});
//				return deferred.promise;
				var localData = window.localStorage.getItem($rootScope.dateStart);
				if(localData && localData != 'null'){
//					console.log("local:"+localData);
//					console.log(typeof (localData));
//					self.data = JSON.parse(localData);
					var needData = JSON.parse(localData);
					needData = $.extend({},needData);
					dataSelecter(needData,flag);
					self.data = needData;

//					self.data = eval("(" + localData + ")");
					console.log(self.data);
					console.log(typeof (self.data));
					socket.removeAllListeners();
					return 'local';
				}
				socket.emit('oneDay', {"startDate": $rootScope.dateStart, 'flag': flag});
				socket.on('oneDayData', function (data) {
//					console.log("remote:"+data);
//					console.log(typeof (data));
					if(!data){
						socket.removeAllListeners();
 						return;
					}
					window.localStorage.setItem($rootScope.dateStart,data);
					var needData = JSON.parse(data);
					console.log(needData);
					console.log(typeof (needData));
					needData = $.extend({},needData);
					dataSelecter(needData,flag);
					deferred.resolve(needData);
					socket.removeAllListeners();
				});
				return deferred.promise;
			} else {

			}


		}
	};
}]);
app.factory('dataSelecter', function () {
	return function (data,regexFlag) {
		var regex = '/^' + regexFlag + '/i';
		regex = eval(regex);
		var dataObj = data;
		for (var key in dataObj) {
			if (!regex.test(key)) {
				delete dataObj[key];
			}
		}
		return dataObj;
	}
});
