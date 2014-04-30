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
				socket.on('open', function () {
					console.log('start websocket');
				});
				socket.emit('oneDay', {"startDate": $rootScope.dateStart, 'flag': flag});
				var num = 1;
				socket.on('oneDayData', function (data) {
					console.log(num);
					num++;
//					console.log(flag);
//					var needData = data;
//					dataSelecter(needData,flag);
//					console.log(dataSelecter(data,flag));
					console.log(data);
					deferred.resolve(data);
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
