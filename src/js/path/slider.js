//SLIDER
$(document).ready(function(){
    $('.services_slider').slick({
        infinite: true,
        dots: false,
        arrows: true,
        autoplay: true,
        variableWidth: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 895,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
            {
                breakpoint: 480,
                settings: {
                    arrows: false,
                    dots: true
                }
            },
        ]
    });
    $('.services_filters li').bind('click', function(e){
        var filter = $(this).data("filter");
        var key = "."+filter;
        //console.log(key);
        $("#slider").slick('slickUnfilter').slick('slickFilter', key).slick('refresh');
    });
});