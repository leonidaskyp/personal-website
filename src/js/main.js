/**
 * Content Loaded
 */
document.addEventListener("DOMContentLoaded", (event) => {
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
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);


    /**
     * Initialize GSAP Plugins
     */
    gsap.registerPlugin(ScrollTrigger, SplitText);


    /**
     * Content Reveal Animations
     */
    const revealWorks = gsap.utils.toArray('.reveal--work');
    revealWorks.forEach((revealWork, i) => {
        const anim = gsap.fromTo(revealWork, {
            autoAlpha: 0,
            y: 50
        },
        { 
            duration: 1,
            autoAlpha: 1,
            y: 0
        });
        ScrollTrigger.create({
            trigger: revealWork,
            start: "top 100%",
            end: "bottom 100%",
            animation: anim,
            toggleActions: 'play none none none',
            once: true,
        });
    });

    const contentReveals = gsap.utils.toArray('.reveal');
    contentReveals.forEach((contentReveal, i) => {
        const anim = gsap.fromTo(contentReveal, {
            autoAlpha: 0,
        },
        { 
            duration: 1.4,
            autoAlpha: 1,
            delay: 0.1
        });
        ScrollTrigger.create({
            trigger: contentReveal,
            start: "top 100%",
            end: "bottom 100%",
            animation: anim,
            toggleActions: 'play none none none',
            once: true,
        });
    });

    /**
     * Text Animation
     */

    const textSplit = new SplitText(".text--split", {
        type: "words, lines",
        mask: "lines"
    });

    textSplit.lines.forEach(line => {
        gsap.from(line, {
            autoAlpha: 0,
            yPercent: 100,
            duration: 1.5,
            ease: "power4",
            scrollTrigger: {
                trigger: line,
                toggleActions: "play none none none",
                once: true
            }
        });
    });

    /**
     * Scroll Up Button
     */
    const scrollUpButton = document.getElementById("btn--scrollUp");
    scrollUpButton.addEventListener('click', () => { 
        lenis.scrollTo("body", {
            duration: 1.6,
        });
    });


    /**
     * 
     */
    let navbar = document.getElementById("navbar");
    let windowScroll = this.scrollY;

    if (windowScroll > 50) {
        if (!navbar.classList.contains('navbar--scrolled')) {
            navbar.classList.add('navbar--scrolled')
        }
    }

    window.addEventListener("scroll", (event) => {
        let windowScroll = this.scrollY;

        if (windowScroll === 0 || windowScroll < 50) {
            if (navbar.classList.contains('navbar--scrolled')) {
                navbar.classList.remove('navbar--scrolled')
            }
        }
        if (windowScroll > 50) {
            if (!navbar.classList.contains('navbar--scrolled')) {
                navbar.classList.add('navbar--scrolled')
            }
        }
    });
});

