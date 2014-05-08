/**
 * Created by Star on 2014/4/17 0017.
 */
app.factory('dateData', ['$http', '$q', '$rootScope', 'dataSelecter' , 'makeOneDayLocal', function ($http, $q, $rootScope, dataSelecter, makeOneDayLocal) {
	return {
		data: '',
		getData: function () {
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
				var listengetOneday = $rootScope.$on('getOneDay',function(){
					console.log('get.it');
					var localData = window.localStorage.getItem($rootScope.dateStart);
					if(localData != null){
					var needData = JSON.parse(localData);
					needData = $.extend({}, needData);
					dataSelecter(needData, flag);
					self.data = needData;
					console.log(self.data);
						$rootScope.$broadcast('update');
					}
					listengetOneday();
				});
				//先写监听器，再有广播，不然对于本地数据瞬间执行，然后发起广播，此时事件监听器还没有添加上。就会出现，直接点击本地数据没有监听器的问题，造成bug
				makeOneDayLocal($rootScope.dateStart);
			} else {
				var startMon = $rootScope.dateStart.slice(4, 6);
				var endMon = $rootScope.dateEnd.slice(4, 6);
				console.log(startMon + ',' + endMon);
				var dateStart = $rootScope.dateStart;
				var dateEnd = $rootScope.dateEnd;
				for (var i = 0; i < (dateStart - dateEnd); i++) {
					var local = window.localStorage.getItem(dateStart + i);
					if (local && local != 'null') {

					}
				}
			}
		}
	};
}]);
app.factory('dataSelecter', function () {
	return function (data, regexFlag) {
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
app.factory('makeOneDayLocal',['$rootScope', 'socket', function ($rootScope, socket) {
	return function (date) {
		var localData = window.localStorage.getItem(date);
		if (localData && localData != 'null') {
			console.log('local');
			$rootScope.$broadcast('getOneDay');
		}else{
			socket.emit('oneDay', {"Date": date});
			socket.on('oneDayData', function (data) {
				if (!data) {
					socket.removeAllListeners();
					$rootScope.$broadcast('getOneDay');
					return false;
				}
				window.localStorage.setItem(date, data);
				socket.removeAllListeners();
				console.log('remote');
				$rootScope.$broadcast('getOneDay');
			});
		}
	}
}]);
//app.factory('getOneDay',['makeOneDayLocal', '$rootScope', function (makeOneDayLocal, $rootScope) {
//	return function () {
//		$rootScope.$on('getOneDay', function(){
//			return 'getLocal';
//		});
//	}
//}]);
app.factory('socket', function () {
	return io.connect('http://localhost:3002');
});
