/**
 * Created by Star on 2014/4/17 0017.
 */
app.factory('dateData', ['$http', '$q', function ($http, $q) {
    return {
        data: '',
        getData: function (date) {
            var deferred = $q.defer();
            var regex = /^IME_ONLINE/i;
            var self = this;
            $http.post('dateData', {'date': date}).success(function (data) {
//                console.log(data);
                $.each(data, function (key, val) {
                    if (!regex.test(key)) {
                    }
                });
                deferred.resolve(data);
//                console.log(self.data);

            }).error(function (err) {
                alert(err)
            });
            return deferred.promise;
        }
    };
}]);