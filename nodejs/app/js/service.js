/**
 * Created by Star on 2014/4/17 0017.
 */
app.factory('dateData', ['$http', '$q','$rootScope', function ($http, $q, $rootScope) {
    return {
        data: '',
        getData: function (date) {
            var deferred = $q.defer();
            console.log($rootScope.chartType);
            $http.post('dateData', {'date': date,'flag':$rootScope.chartType}).success(function (data) {
                deferred.resolve(data);
            }).error(function (err) {
                console.log(err);
            });
            return deferred.promise;
        }
    };
}]);
