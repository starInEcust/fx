/**
 * Created by Star on 2014/4/17 0017.
 */
app.factory('dateData', ['$http', '$q', '$rootScope', 'dataSelecter' , 'makeOneDayLocal', function ($http, $q, $rootScope, dataSelecter, makeOneDayLocal) {
	return {
		data: '',
		getData: function () {
			var self = this;
			//获取服务的一开始启动获取一天数据的监听器
			makeOneDayLocal.listenSocket();
			if (!$rootScope.dateEnd) {
				var listengetOneday = $rootScope.$on('getOneDay',function(){
					console.log('get.it');
					//数据都是在本地的
					var localData = window.localStorage.getItem($rootScope.dateStart);
					if(localData != null){
					var needData = JSON.parse(localData);
					needData = $.extend({}, needData);
					dataSelecter(needData);
					self.data = needData;
					console.log(self.data);
						$rootScope.$broadcast('update');
					}
					//关闭监听器避免闭包的产生
					makeOneDayLocal.removeSocketListen();
					listengetOneday();
				});
				//先写监听器，再有广播，不然对于本地数据瞬间执行，然后发起广播，此时事件监听器还没有添加上。就会出现，直接点击本地数据没有监听器的问题，造成bug
				//获取一天的数据并通知上面的监听器已经获取数据，如果在本地直接通知，不再就去服务器获取一个。
				makeOneDayLocal.getOneDay($rootScope.dateStart);
			} else {
				//这里是获取一段时间
				var startYear = $rootScope.dateStart.slice(0,4);
				var startMon =  Number($rootScope.dateStart.slice(4, 6));
				var endMon =  Number($rootScope.dateEnd.slice(4, 6));
				var dateStart = Number($rootScope.dateStart);
				var dateEnd = Number($rootScope.dateEnd);
				var dayStart = Number($rootScope.dateStart.slice(-2));
				var dayEnd = Number($rootScope.dateEnd.slice(-2));
//				console.log(dateStart+':'+dayStart + ',' + dateEnd+':'+dayEnd);
				var dayPoor = null;
				//如果在同一个月就直接减
				if((endMon - startMon) == 0){
					dayPoor = dayEnd - dayStart;
				//不是就算一下
				}else {
					dayPoor = (31-dayStart)+31*(endMon - startMon-1)+dayEnd;
				}
				var toDay = dayStart;
				var toDate = dateStart;
				var mon = startMon;
				//循环获取数据
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
				//计数器，获取完全后，关闭监听器 感觉有可能会有超时的问题，到时候再说...
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
//没什么好说的，过滤数据服务
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
//提供获取数据服务
app.factory('makeOneDayLocal',['$rootScope', 'socket', function ($rootScope, socket) {
	return {
		//如果本地有就广播，没有就去取
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
		//获取服务数据监听器
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
		//关闭监听器
		removeSocketListen:function(){
			socket.removeAllListeners();
		}
	}
}]);
//socket服务
app.factory('socket', function () {
	return io.connect('http://localhost:3002');
});
