/**
 * Created by Star on 14-3-20.
 */

var app = angular.module('neeya', ['ngRoute']);
app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/table', {
            templateUrl: 'view/table.html',
            controller: 'mainTableControl',
			reloadOnSearch: false
        }).
        when('/table-striped', {
            templateUrl: 'view/table-striped.html',
            controller: 'mainTableControl'
        }).
        when('/chart1', {
            templateUrl: 'view/chart1.html',
            controller: 'mainTableControl',
			reloadOnSearch: false
        }).
        when('/update', {
            templateUrl: 'view/update.html'
//            controller: 'mainTableControl'
        }).
        otherwise({redirectTo: '/table'})
}]);




