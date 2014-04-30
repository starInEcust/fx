/**
 * Created by Star on 2014/4/17 0017.
 */
app.factory('dateData', ['$http', '$q', '$rootScope', function ($http, $q, $rootScope) {
	return {
		data: '',
		getData: function () {
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
//			if($rootScope.date)
			var date = $rootScope.date;
			$http.post('dateData', {'date': date, 'flag': flag}).success(function (data) {
				deferred.resolve(data);
			}).error(function (err) {
				console.log(err);
			});
			return deferred.promise;
		}
	};
}]);
