//Scroll Top
$(window).scroll(function() {
        $(this).scrollTop() > 100 ? $(".scroll-to-top").fadeIn() : $(".scroll-to-top").fadeOut()
    }),
    $(".scroll-to-top").click(function(e) {
        e.preventDefault(),
            $("html, body").animate({ scrollTop: 0 }, 800)
    });