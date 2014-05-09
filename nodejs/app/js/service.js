/**
 * Created by Star on 2014/4/17 0017.
 */
app.factory('dateData', ['$http', '$q', '$rootScope', 'dataSelecter' , 'makeOneDayLocal', function ($http, $q, $rootScope, dataSelecter, makeOneDayLocal) {
	return {
		data: '',
		getData: function () {
			var self = this;
			makeOneDayLocal.listenSocket();
			if (!$rootScope.dateEnd) {
				var listengetOneday = $rootScope.$on('getOneDay',function(){
					console.log('get.it');
					var localData = window.localStorage.getItem($rootScope.dateStart);
					if(localData != null){
					var needData = JSON.parse(localData);
					needData = $.extend({}, needData);
					dataSelecter(needData);
					self.data = needData;
					console.log(self.data);
						$rootScope.$broadcast('update');
					}
					makeOneDayLocal.removeSocketListen();
					listengetOneday();
				});
				//先写监听器，再有广播，不然对于本地数据瞬间执行，然后发起广播，此时事件监听器还没有添加上。就会出现，直接点击本地数据没有监听器的问题，造成bug
				makeOneDayLocal.getOneDay($rootScope.dateStart);
			} else {
				var startYear = $rootScope.dateStart.slice(0,4);
				var startMon =  Number($rootScope.dateStart.slice(4, 6));
				var endMon =  Number($rootScope.dateEnd.slice(4, 6));
				var dateStart = Number($rootScope.dateStart);
				var dateEnd = Number($rootScope.dateEnd);
				var dayStart = Number($rootScope.dateStart.slice(-2));
				var dayEnd = Number($rootScope.dateEnd.slice(-2));
//				console.log(dateStart+':'+dayStart + ',' + dateEnd+':'+dayEnd);
				var dayPoor = null;
				if((endMon - startMon) == 0){
					dayPoor = dayEnd - dayStart;
				}else {
					dayPoor = (31-dayStart)+31*(endMon - startMon-1)+dayEnd;
				}
				var toDay = dayStart;
				var toDate = dateStart;
				var mon = startMon;
				for (var i = 0; i <= dayPoor; i++) {
					if(toDay > 31){
						toDay = 1;
						++mon;
						mon = mon < 10 ? '0' + mon : mon;
						dateStart = Number(startYear + mon +'01');
					}
					makeOneDayLocal.getOneDay(toDate.toString());
					toDay++;
					toDate++;
				}
				var getDataNum = 0;
				var listen = $rootScope.$on('getOneDay',function(){
					getDataNum++;
					if(getDataNum == dayPoor){
						makeOneDayLocal.removeSocketListen();
						listen();
					}
				});

			}
		}
	};
}]);
app.factory('dataSelecter', ['$rootScope', function ($rootScope) {
	return function (data) {
		var flag = null;
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
		var regex = '/^' + flag + '/i';
		regex = eval(regex);
		var dataObj = data;
		for (var key in dataObj) {
			if (!regex.test(key)) {
				delete dataObj[key];
			}
		}
		return dataObj;
	}
}]);
app.factory('makeOneDayLocal',['$rootScope', 'socket', function ($rootScope, socket) {
	return {
		getOneDay:function (date) {
			console.log(date);
			var localData = window.localStorage.getItem(date);
			if (localData && localData != 'null') {
				console.log('local');
				$rootScope.$broadcast('getOneDay');
			}else{
				socket.emit('oneDay', {"Date": date});

			}
		},
		listenSocket: function(){
			socket.on('oneDayData', function (data) {
				if (!data) {
					console.log('noData');
					$rootScope.$broadcast('getOneDay');
					return false;
				}
				if(data.data){
					window.localStorage.setItem(data.date, data.data);
//					console.log('remote');
//					console.log(date);
					console.log(data.date);
					console.log(data.data);
					$rootScope.$broadcast('getOneDay');
				}

			});
		},
		removeSocketListen:function(){
			socket.removeAllListeners();
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
