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


            elem.children('#datepicker').datepicker({
                date: objdate.getFullYear() + '-' + '0' + (objdate.getMonth() + 1) + '-' + (objdate.getDate()-1), // set init date
                effect: "slide", // none, slide, fade
                position: "bottom",
                locale: 'en',
                selected: function () {
                    if(oldDate == getDate()){return}
                    oldDate = getDate();

                    dateData.getData().then(function (data) {
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
app.directive('typeSelect',['$rootScope','dateData',function($rootScope,dateData){
    return {
        restrict: 'AE',
        link: function (scope, elem, attrs) {
            var flag = elem.text();
            elem.on('click',function(){
                $rootScope.chartType = flag;
                elem.parent().siblings().find('span').text(flag);
                dateData.getData().then(function (data) {
                    dateData.data = data;
//                        console.log(dateData.data);
                    $rootScope.$broadcast('date.update');
                });
            });


        }
    };
}]);