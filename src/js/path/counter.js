$(document).ready(function(){
    var endtime = 'April 01 2018 23:59:59 GMT+02:00';
    var clock = document.querySelector('.header_timer');
    var daysDiv = clock.querySelector('.days');
    var hoursDiv = clock.querySelector('.hours');
    var minutesDiv = clock.querySelector('.minutes');
    var secondsDiv = clock.querySelector('.seconds');
    function getTimeRemaining(endtime){
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor( (t/1000) % 60 );
        var minutes = Math.floor( (t/1000/60) % 60 );
        var hours = Math.floor( (t/(1000*60*60)) % 24 );
        var days = Math.floor( t/(1000*60*60*24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    };
    function updateClock(){
        var t = getTimeRemaining(endtime);
        daysDiv.innerHTML = t.days;
        hoursDiv.innerHTML = t.hours;
        minutesDiv.innerHTML = t.minutes;
        secondsDiv.innerHTML = ('0' + t.seconds).slice(-2);
        if(t.total<=0){
            clearInterval(timeinterval);
        }
    };
    updateClock();
    var timeinterval = setInterval(updateClock,1000);
});
