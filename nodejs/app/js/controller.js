//var app = angular.module()
var mainControl = ['$scope', '$rootScope',function navControl($scope,$rootScope) {
    //动画控制
    $scope.isright = false;
    $scope.isfull = true;
    $scope.isShow = false;
    $scope.isHide = true;
    $scope.toggleSide = function(){
        $scope.isright = !$scope.isright;
        $scope.isfull = !$scope.isfull;
        $scope.isHide = !$scope.isHide;
        $scope.isShow = !$scope.isShow;
    };
    //全局设置
    $rootScope.chartType = '输入法ONLINE数据';

}];
var mainTableControl = ['$scope','dateData' , '$http',function mainTableControl($scope, dateData,$http) {
    var objdate = new Date();
	var day = objdate.getDate();
	if(day < 10){
		console.log(day);
		day = '0'+(day-1);
		console.log(day);

	}
    var date = objdate.getFullYear()+'0'+(objdate.getMonth()+1)+day;
	console.log(date);
	    dateData.getData(date).then(function(data){
	        $scope.mydata = data;
	    });
	    $scope.$on( 'date.update', function( event ) {
	        console.log('up');
	        $scope.mydata = dateData.data;
	    });
	$scope.spanNum = 1;

}];



var chartControl = ['$scope',function chartControl($scope){

}];