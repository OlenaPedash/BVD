//MAP
//(function () {
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
//     document.addEventListener('DOMContentLoaded', initMap);
// })();


