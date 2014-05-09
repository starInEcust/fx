/**
 * Created by Star on 14-3-26.
 */
//时间选择器指令，属性为start，设置全局变量dateOne
//属性为dateBucket，设置全局变量dateTwo,两者都会调用dateData服务，获取data后通知刷新
app.directive('selectTime', ['dateData', '$rootScope', function (dateData, $rootScope) {
	return{
		restrict: "AE",
        replace: false,
        template:
			'<div class="input-control text" id="datepicker">' +
			'<input type="text">' +
			'<button class="btn-date"></button>' +
			'</div>',
		link: function (scope, elem, attrs) {
			//进行初始�
			var objdate = new Date();
			elem.children('#datepicker').datepicker({
				date: objdate.getFullYear() + '-' + '0' + (objdate.getMonth() + 1) + '-' + (objdate.getDate() - 1), // set init date
				effect: "slide", // none, slide, fade
				position: "bottom",
				locale: 'en',
				selected: function () {
					var Date = getDate();
                    if(oldDate == Date){return}
                    oldDate = Date;
					dateData.getData();
				}
			});
			//如果只有一天就返回 这个地方顺序要修改一下
			if(attrs.selectTime == 'oneDay'){
				return;
			}
			function getDate() {
				var date = elem.find('#datepicker input').val();
				date = date.split('.').reverse().join('');
				if(attrs.selectTime == 'timeBucket'){
					$rootScope.dateEnd = date;
					console.log(attrs.selectTime+'end'+$rootScope.dateEnd);
				}else{
					$rootScope.dateStart = date;
					console.log(attrs.selectTime+'start'+$rootScope.dateStart);
				}
				return date;
			}
			var oldDate = getDate();
        }
    }
}]);
//选择是一个时间点还是一段时间指令，主要功能�//切换ICON，UI,改变navControl作用域下的dateType
app.directive('dateType', ['$rootScope', function ($rootScope) {
	return{
		restrict: "AE",
		replace: true,
		template:
			"<div class='element'>"+
			'<i class="icon-{{action}}"></i>'+
			"</div>",
		link: function (scope, elem, attrs) {
			scope.action = 'plus';
			elem.on('click', function(){
				//控制第二个时间pick显示
				scope.isOneDay = !scope.isOneDay;
				if(scope.action == 'plus'){
					$rootScope.dateEnd = $rootScope.dateStart;
					scope.dateType = 'timeBucket';
					scope.action = 'cancel';
				}else{
					$rootScope.dateEnd = null;
					scope.dateType = 'oneDay';
					scope.action = 'plus';
				}
				scope.$apply();
			});
		}
	}
}]);
//画图
app.directive('makeChart', function () {
	return {
		restrict: 'E',
		template: '<div style="width:100%; height:400px;"></div>',
		replace: 'true',
		link: function (scope, elem, attrs) {
			elem.highcharts({
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Fruit Consumption'
				},
				xAxis: {
					categories: ['Apples', 'Bananas', 'Oranges']
				},
				yAxis: {
					title: {
						text: 'Fruit eaten'
					}
				},
				series: [
					{
						name: 'Jane',
						data: [1, 0, 4]
					},
					{
						name: 'John',
						data: [5, 7, 3]
					}
				]
			});
		}

	}
});
//不解释
app.directive('activeLi', function () {
	return {
		restrict: 'AE',
		link: function (scope, elem, attrs) {
			elem.not('.title').on('click', function () {
				elem.addClass('active').siblings().removeClass('active');
			});
		}
	};
});
//选择要显示数据类型，更改全局变量后通知刷新
app.directive('typeSelect', ['$rootScope', 'dateData', function ($rootScope, dateData) {
	return {
		restrict: 'AE',
		link: function (scope, elem, attrs) {
			var flag = elem.text();
			elem.on('click', function () {
				$rootScope.chartType = flag;
				elem.parent().siblings().find('span').text(flag);
				dateData.getData();
			});
		}
	};
}]);
//选择要显示的一列
app.directive('tdSwitch', function () {
	return {
		restrict: 'AE',
//		template: '<li ng-class="{buttonLight:isLight}" ng-transclude></li>',
		replace: true,
//		transclude: true,
		link: function (scope, elem, attrs) {
//			if(scope[attrs.tdSwitch] == 'true'){
//				elem.addClass('close-th');
//			}
			elem.on('click', function () {
				scope.$apply(function () {
//					var localStorage = window.localStorage;
					if (attrs.tdSwitch) {
						scope[attrs.tdSwitch] = !scope[attrs.tdSwitch];
//						localStorage.setItem(attrs.tdSwitch,scope[attrs.tdSwitch]);
						elem.toggleClass('close-th');
					}else{
						elem.addClass('li-clicked').siblings().removeClass('li-clicked');
						if (attrs.toggleAlluser == 'All') {
							console.log(attrs.toggleAlluser);
							scope.all = false;
							scope.user = true;
							scope.spanNum = 2;
						} else if (attrs.toggleAlluser == 'USER') {
							console.log(attrs.toggleAlluser);
							scope.all = true;
							scope.user = false;
							scope.spanNum = 2;
						} else {
							console.log(attrs.toggleAlluser);
							scope.all = false;
							scope.user = false;
							scope.spanNum = 1;
						}
//						localStorage.setItem('All',scope.all);
//						localStorage.setItem('USER',scope.user);
//						localStorage.setItem('spanNum',scope.spanNum);
					}
				});
			});
		}
	};
});
//tr可以选中
app.directive('trSelect', function () {
	return {
		restrict: 'AE',
		link: function (scope, elem, attrs) {
			elem.on('click', function () {
				elem.toggleClass('info');
			});
		}
	};
});