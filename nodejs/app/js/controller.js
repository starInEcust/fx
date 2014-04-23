//var app = angular.module()

var mainTableControl = ['$scope','dateData' , '$http',function mainTableControl($scope, dateData,$http) {
    var objdate = new Date();
    var date = objdate.getFullYear()+'0'+(objdate.getMonth()+1)+(objdate.getDate()-1);
    dateData.getData(date).then(function(data){
        $scope.mydata = data;
    });
    $scope.$on( 'date.update', function( event ) {
        console.log('up');
        $scope.mydata = dateData.data;
    });

    $scope.toggleTable = function () {
        $scope.showTD = !$scope.showTD;

    };
//    $http.post('timeBucket', {'dateStart': '20140410','dateEnd':'20140412'}).success(function (data) {
//        console.log(data);
//    }).error(function (err) {
//        alert(err)
//    });

}];
var mainControl = ['$scope', '$rootScope',function navControl($scope,$rootScope) {
    $scope.isright = true;
    $scope.isfull = false;
    $scope.isShow = true;
    $scope.isHide = false;
    $scope.toggleSide = function(){
        $scope.isright = !$scope.isright;
        $scope.isfull = !$scope.isfull;
        $scope.isHide = !$scope.isHide;
        $scope.isShow = !$scope.isShow;
    };
    $rootScope.chartType = '输入法OEM版数据';

}];
var chartControl = ['$scope',function chartControl($scope){

}];