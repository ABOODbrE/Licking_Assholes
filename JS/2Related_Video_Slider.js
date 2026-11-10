<script>
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".Related_Video_Slider");
    const grid = document.querySelector(".Related_Video_Grid1");

    const prevBtn = document.querySelector(".Bslider_Prev_Related");
    const nextBtn = document.querySelector(".Bslider_Next_Related");

    const dotsContainer =
        document.querySelector(".Related_Slider_Dots");

    if (!slider || !grid || !prevBtn || !nextBtn || !dotsContainer) {
        return;
    }


    /* =====================================================
       SETTINGS
       ===================================================== */

    const ITEMS_PER_PAGE = 9;

    /* وقت الانتقال التلقائي */
    const AUTO_TIME = 3500;

    let articles =
        Array.from(grid.querySelectorAll(".Article_Vid1"));

    let currentPage = 0;

    let totalPages =
        Math.ceil(articles.length / ITEMS_PER_PAGE);

    let autoSlider;


    /* =====================================================
       CREATE PAGES
       ===================================================== */

    function createPages() {

        if (articles.length === 0) {
            return;
        }

        /*
         * كل 9 Articles يتم وضعهم في صفحة.
         */

        for (let i = 0; i < articles.length; i += ITEMS_PER_PAGE) {

            const pageArticles =
                articles.slice(i, i + ITEMS_PER_PAGE);

            const page =
                document.createElement("div");

            page.className =
                "Related_Slider_Page";

            page.style.display = "grid";
            page.style.gridTemplateColumns =
                "repeat(3, minmax(0, 1fr))";

            page.style.gridTemplateRows =
                "repeat(3, auto)";

            page.style.gap = "20px 15px";

            page.style.width = "100%";
            page.style.flex = "0 0 100%";

            pageArticles.forEach(article => {
                page.appendChild(article);
            });

            grid.appendChild(page);
        }

        /*
         * grid نفسه يتحول إلى flex
         * وكل صفحة تأخذ 100% من العرض.
         */

        grid.style.display = "flex";
        grid.style.width = "100%";

        grid.style.transition =
            "transform 0.8s ease-in-out";

        grid.style.willChange = "transform";
    }


    /* =====================================================
       CREATE DOTS
       ===================================================== */

    function createDots() {

        dotsContainer.innerHTML = "";

        for (let i = 0; i < totalPages; i++) {

            const dot =
                document.createElement("button");

            dot.type = "button";

            dot.setAttribute(
                "aria-label",
                "Go to slide " + (i + 1)
            );

            dot.addEventListener("click", function () {

                goToPage(i);

                restartAutoSlider();

            });

            dotsContainer.appendChild(dot);
        }

        updateDots();
    }


    /* =====================================================
       MOVE TO PAGE
       ===================================================== */

    function goToPage(page) {

        if (totalPages <= 0) {
            return;
        }

        /*
         * عند الوصول للنهاية نرجع للبداية.
         */

        if (page >= totalPages) {
            page = 0;
        }

        if (page < 0) {
            page = totalPages - 1;
        }

        currentPage = page;

        const offset =
            currentPage * 100;

        grid.style.transform =
            "translateX(-" + offset + "%)";

        updateDots();
    }


    /* =====================================================
       UPDATE DOTS
       ===================================================== */

    function updateDots() {

        const dots =
            dotsContainer.querySelectorAll("button");

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                "active",
                index === currentPage
            );

        });
    }


    /* =====================================================
       NEXT
       ===================================================== */

    function nextSlide() {

        let nextPage =
            currentPage + 1;

        if (nextPage >= totalPages) {
            nextPage = 0;
        }

        goToPage(nextPage);
    }


    /* =====================================================
       PREVIOUS
       ===================================================== */

    function previousSlide() {

        let previousPage =
            currentPage - 1;

        if (previousPage < 0) {
            previousPage = totalPages - 1;
        }

        goToPage(previousPage);
    }


    /* =====================================================
       BUTTONS
       ===================================================== */

    nextBtn.addEventListener("click", function () {

        nextSlide();

        restartAutoSlider();

    });


    prevBtn.addEventListener("click", function () {

        previousSlide();

        restartAutoSlider();

    });


    /* =====================================================
       AUTO SLIDER
       ===================================================== */

    function startAutoSlider() {

        stopAutoSlider();

        autoSlider =
            setInterval(function () {

                nextSlide();

            }, AUTO_TIME);
    }


    function stopAutoSlider() {

        if (autoSlider) {

            clearInterval(autoSlider);

            autoSlider = null;
        }
    }


    function restartAutoSlider() {

        stopAutoSlider();

        startAutoSlider();
    }


    /* =====================================================
       PAUSE WHEN MOUSE IS OVER SLIDER
       ===================================================== */

    slider.addEventListener("mouseenter", function () {

        stopAutoSlider();

    });


    slider.addEventListener("mouseleave", function () {

        startAutoSlider();

    });


    /* =====================================================
       TOUCH / SWIPE
       ===================================================== */

    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener(
        "touchstart",
        function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

            stopAutoSlider();

        },
        { passive: true }
    );


    slider.addEventListener(
        "touchend",
        function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            const distance =
                touchEndX - touchStartX;

            /*
             * Swipe left
             */

            if (distance < -50) {

                nextSlide();

            }

            /*
             * Swipe right
             */

            else if (distance > 50) {

                previousSlide();

            }

            startAutoSlider();

        },
        { passive: true }
    );


    /* =====================================================
       START
       ===================================================== */

    createPages();

    createDots();

    goToPage(0);

    startAutoSlider();

});
</script>