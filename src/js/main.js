//MAP
function initMap() {
    var uluru = {lat: 55.755826, lng: 37.6172999};
    var map = new google.maps.Map(document.getElementById('google-map'), {
        zoom: 10,
        disableDefaultUI: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        unitSystem: google.maps.UnitSystem.METRIC,
        center: uluru,
        styles: [{"stylers": [{ "saturation": -100 }]}],
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map,
        title: 'BVD Moskow',
        icon: {
            url: "../img/pointer.png",
            scaledSize: new google.maps.Size(30, 45)
        },
    });
};
//COUNTER
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


//UP
$(document).on('click', 'a', function (e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 1500);
});
