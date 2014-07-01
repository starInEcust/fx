//var app = angular.module()
var mainControl = ['$scope', '$rootScope', function mainControl($scope, $rootScope) {
	//动画控制
	$scope.isright = false;
	$scope.isfull = true;
	$scope.isShow = false;
	$scope.isHide = true;
	$scope.toggleSide = function () {
		$scope.isright = !$scope.isright;
		$scope.isfull = !$scope.isfull;
		$scope.isHide = !$scope.isHide;
		$scope.isShow = !$scope.isShow;
	};
	//全局设置
	$rootScope.chartType = '输入法ONLINE数据';

}];
var mainTableControl = ['$scope', '$rootScope','dateData' , '$http', function mainTableControl($scope, $rootScope, dateData, $http) {
//	var objdate = new Date();
//	var day = objdate.getDate();
//	if (day < 10) {
//		console.log(day);
//		day = '0' + (day - 1);
//		console.log(day);
//
//	}else{
//		day = day - 1;
//	}
//	var date = objdate.getFullYear() + '0' + (objdate.getMonth() + 1) + day;
	console.log($rootScope.dateStart);

	$scope.$on('getDateStart', function (event) {
		dateData.getData($rootScope.dateStart).then(function (data) {
			$scope.mydata = data;
		});
		console.log($rootScope.dateStart);
	});
	console.log($rootScope.dateStart);

	dateData.getData($rootScope.dateStart).then(function (data) {
		$scope.mydata = data;
	});


	$scope.$on('date.update', function (event) {
		console.log('up');
		$scope.mydata = dateData.data;
	});
	//初始化要显示的数据表格
	$scope.spanNum = 1;
//	var localStorage = window.localStorage;
//	$scope.num = localStorage.getItem('num');
//	$scope.PushID = localStorage.getItem('PushID');
//	$scope.Toastclick = localStorage.getItem('Toastclick');
//	$scope.Toastclose = localStorage.getItem('Toastclose');
//	$scope.DSTART = localStorage.getItem('DSTART');
//	$scope.DFINISH = localStorage.getItem('DFINISH');
//	$scope.ISTART = localStorage.getItem('ISTART');
//	$scope.IFINISH = localStorage.getItem('IFINISH');
//	$scope.None = localStorage.getItem('None');
//	$scope.Click = localStorage.getItem('Click');
//	$scope.Show = localStorage.getItem('Show');
//	$scope.ClickShow = localStorage.getItem('ClickShow');


}];


var chartControl = ['$scope', function chartControl($scope) {

}];