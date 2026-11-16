
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

    const AUTO_TIME = 3500;

    const DESKTOP_ITEMS = 9;
    const MOBILE_ITEMS = 6;

    const MOBILE_BREAKPOINT = 450;

    let articles = Array.from(
        grid.querySelectorAll(".Article_Vid1")
    );

    let currentPage = 0;
    let itemsPerPage = DESKTOP_ITEMS;
    let totalPages = 0;

    let autoSlider = null;

    let touchStartX = 0;
    let touchEndX = 0;

    let resizeTimer = null;


    /* =====================================================
       RESPONSIVE SETTINGS
       ===================================================== */

    function getSettings() {

        if (window.innerWidth <= MOBILE_BREAKPOINT) {

            return {
                items: 6,
                columns: 2,
                rows: 3,
                gap: "12px 8px"
            };

        }

        return {
            items: 9,
            columns: 3,
            rows: 3,
            gap: "20px 15px"
        };

    }


    /* =====================================================
       CREATE PAGES
       ===================================================== */

    function createPages() {

        const settings = getSettings();

        itemsPerPage = settings.items;

        totalPages = Math.ceil(
            articles.length / itemsPerPage
        );

        /*
         * Remove old pages.
         */

        grid.replaceChildren();

        /*
         * Create new pages.
         */

        for (
            let i = 0;
            i < articles.length;
            i += itemsPerPage
        ) {

            const pageArticles = articles.slice(
                i,
                i + itemsPerPage
            );

            const page = document.createElement("div");

            page.className = "Related_Slider_Page";

            page.style.display = "grid";

            page.style.gridTemplateColumns =
                `repeat(${settings.columns}, minmax(0, 1fr))`;

            page.style.gridTemplateRows =
                `repeat(${settings.rows}, auto)`;

            page.style.gap = settings.gap;

            page.style.width = "100%";

            page.style.minWidth = "100%";

            page.style.flex = "0 0 100%";

            page.style.boxSizing = "border-box";

            /*
             * Add videos to page.
             */

            pageArticles.forEach(article => {

                page.appendChild(article);

            });

            grid.appendChild(page);

        }


        /*
         * Main slider.
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

            const dot = document.createElement("button");

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

        if (page >= totalPages) {
            page = 0;
        }

        if (page < 0) {
            page = totalPages - 1;
        }

        currentPage = page;

        const offset = currentPage * 100;

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

        goToPage(currentPage + 1);

    }


    /* =====================================================
       PREVIOUS
       ===================================================== */

    function previousSlide() {

        goToPage(currentPage - 1);

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

        if (totalPages <= 1) {
            return;
        }

        autoSlider = setInterval(function () {

            nextSlide();

        }, AUTO_TIME);

    }


    function stopAutoSlider() {

        if (autoSlider !== null) {

            clearInterval(autoSlider);

            autoSlider = null;

        }

    }


    function restartAutoSlider() {

        stopAutoSlider();

        startAutoSlider();

    }


    /* =====================================================
       PAUSE ON MOUSE HOVER
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

            if (distance < -50) {

                nextSlide();

            }

            else if (distance > 50) {

                previousSlide();

            }

            startAutoSlider();

        },
        { passive: true }
    );


    /* =====================================================
       RESPONSIVE REBUILD
       ===================================================== */

    function rebuildSlider() {

        /*
         * Preserve approximately the same
         * first visible video.
         */

        const oldFirstIndex =
            currentPage * itemsPerPage;

        stopAutoSlider();

        createPages();

        currentPage = Math.floor(
            oldFirstIndex / itemsPerPage
        );

        if (currentPage >= totalPages) {
            currentPage = Math.max(0, totalPages - 1);
        }

        createDots();

        goToPage(currentPage);

        startAutoSlider();

    }


    /* =====================================================
       WINDOW RESIZE
       ===================================================== */

    window.addEventListener("resize", function () {

        clearTimeout(resizeTimer);

        resizeTimer = setTimeout(function () {

            rebuildSlider();

        }, 200);

    });


    /* =====================================================
       START SLIDER
       ===================================================== */

    createPages();

    createDots();

    goToPage(0);

    startAutoSlider();

});
