//var app = angular.module()
var mainControl = ['$scope', '$rootScope', function navControl($scope, $rootScope) {
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
var mainTableControl = ['$scope', 'dateData' , '$http', function mainTableControl($scope, dateData, $http) {
	//初始化时间
	var objdate = new Date();
	var day = objdate.getDate();
	if (day < 10) {
		day = '0' + (day - 1);
	}
	var date = objdate.getFullYear() + '0' + (objdate.getMonth() + 1) + day;
	//数据刷新监听器
	$scope.$on( 'update', function( event ) {
		console.log('update');
		$scope.$apply(function(){
			$scope.mydata = dateData.data;
		});
	});
	//初始化要显示的数据表
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

var navControl = ['$scope',function chartControl($scope){
	//这个true是控制UI显示的
	$scope.isOneDay = true;
	//还有一个是timebucket
	$scope.dateType = 'oneDay';
}];