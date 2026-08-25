/**
 * Initialize Lenis
 */ 
const lenis = new Lenis({
    autoRaf: true,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothWheel: true,
    smoothTouch: true,
    mouseMultiplier: 1,
    touchMultiplier: 1,
    infinite: false,
})


/**
 * Window Scroll - Navbar
 */
let navbar = document.getElementById("navbar");
let windowScroll = this.scrollY;

if (windowScroll > 50) {
    if (!navbar.classList.contains('navbar--scrolled')) {
        navbar.classList.add('navbar--scrolled')
    }
}

$(window).on("scroll", function() {
    let windowScroll = this.scrollY;
    
    if (windowScroll === 0 || windowScroll < 50) {
        if ($("#navbar").hasClass("navbar--scrolled")) {
            $("#navbar").removeClass("navbar--scrolled")
        }
    }
    
    if (windowScroll > 50) {
        if (!$("#navbar").hasClass("navbar--scrolled")) {
            $("#navbar").addClass("navbar--scrolled")
        }
    }
});


/**
 * Scroll Up Button
 */
$("#btn--scrollUp").on("click", function() {
  lenis.scrollTo("body", {
        duration: 1.6,
    });
});


/**
 * Create Modals and Video Element
 */
$(".work-list__item.video-item").on("click", function() {
    let videoSource = $(this).data("video-src")
    $(".modal").addClass("modal--show")
    $("html").addClass("no-scroll")
    $(".modal video source").attr("src", videoSource)
    $(".modal .video-container").html('<video playsinline controls><source src="'+videoSource+'" type="video/mp4"></source></video>');
    lenis.stop()
});

$(".modal #close-modal-btn").on("click", function() {
    $(this).parent().removeClass("modal--show")
    $("html").removeClass("no-scroll")
    $(".modal video").remove()
    lenis.start()
});

$(document).on("keydown", function(e) {
    if (event.key === "Escape") {
        $(".modal").removeClass("modal--show")
        $("html").removeClass("no-scroll")
        $(".modal video").remove()
        lenis.start()
    }
});

$(".work-list__item.video-item").on("mouseover", function() {
    $(this).find("img").addClass("hidden")
    $(this).find("video")[0].play()
});

$(".work-list__item.video-item").on("mouseout", function() {
    $(this).find("img").removeClass("hidden")
    $(this).find("video")[0].pause()
});