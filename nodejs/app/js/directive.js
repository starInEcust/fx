/**
 * Created by Star on 14-3-26.
 */

app.directive('selectTable', ['dateData', '$rootScope', function (dateData, $rootScope) {
	return{
		restrict: "AE",
		replace: true,
		template: '<div class="element">' +
			'<div class="input-control text" id="datepicker">' +
			'<input type="text">' +
			'<button class="btn-date"></button>' +
			'</div>' +
			'</div>',
		link: function (scope, elem, attrs) {
			var objdate = new Date();
			var year = objdate.getFullYear();
			var month = objdate.getMonth() + 1;
			var day = objdate.getDate() - 1;
			if (objdate.getDate() == 1) {
				month = month - 1;
				var newDate = new Date();
				newDate.setDate(objdate.getDate() - 1);
				day = newDate.getDate();
			} else if (objdate.getDate() < 10) {
				day = '0' + day;
			}
			if (objdate.getMonth() < 10) {
				month = '0' + month;
			}

			var date = year + '-' + month + '-' + day;

			$rootScope.dateStart = (year+month+day);
			$rootScope.$broadcast('getDateStart');
			elem.children('#datepicker').datepicker({
				date: date, // set init date
				effect: "slide", // none, slide, fade
				position: "bottom",
				locale: 'en',
				selected: function () {
//					console.log(this.date);
					if (oldDate == getDate()) {
						return
					}
					oldDate = getDate();
					dateData.getData(getDate()).then(function (data) {
						dateData.data = data;
//                        console.log(dateData.data);
						$rootScope.$broadcast('date.update');
					});
//                console.log(dateData.data)
				}
			});
			function getDate() {
				var date = elem.find('#datepicker input').val();
				date = date.split('.').reverse().join('');
				$rootScope.date = date;
				return date;
			}

			var oldDate = getDate();
			console.log(getDate());


		}
	}
}]);
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
app.directive('typeSelect', ['$rootScope', 'dateData', function ($rootScope, dateData) {
	return {
		restrict: 'AE',
		link: function (scope, elem, attrs) {
			var flag = elem.text();
			elem.on('click', function () {
				$rootScope.chartType = flag;
				elem.parent().siblings().find('span').text(flag);
				dateData.getData($rootScope.date).then(function (data) {
					dateData.data = data;
//                        console.log(dateData.data);
					$rootScope.$broadcast('date.update');
				});
			});


		}
	};
}]);
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
					} else {
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