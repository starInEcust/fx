/**
 * Created by Star on 2014/4/17 0017.
 */
app.filter('percent', function () {
    return function (num) {
        if (isNaN(num)) {
            return '-';
        }
        return Math.round(num * 10000) / 100.00 + "%";
//        var percent = (num*100000).toString();
//        console.log((percent.slice(0,4)/1000)+'%');
//        return (percent.slice(0,4)/1000)+'%';
        //ttttt
    }
});

