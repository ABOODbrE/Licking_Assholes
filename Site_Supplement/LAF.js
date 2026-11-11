/*============================================================================*/
/* ============================ 1- Start Tags JS ===============================*/
/*============================================================================*/
document.addEventListener("DOMContentLoaded", function ()
{ const slider = document.querySelector(".Dtags");
const prevButton = document.querySelector(".Bslider_Prev_Tags");
const nextButton = document.querySelector(".Bslider_Next_Tags");
if (!slider || !prevButton || !nextButton) { return; }
/* مقدار الحركة */ function getScrollAmount()
{ const tag = slider.querySelector(".a_D_Tags");
if (!tag) { return 250; } return tag.offsetWidth + 10; }
/* الحركة إلى اليسار */ function movePrev()
{ slider.scrollBy({ left: -getScrollAmount(), behavior: "smooth" });
resetAutoSlide(); } /* الحركة إلى اليمين */ function moveNext()
{ const maxScroll = slider.scrollWidth - slider.clientWidth;
/* * إذا وصلنا إلى النهاية * نرجع إلى البداية */
if (slider.scrollLeft >= maxScroll - 5)
{ slider.scrollTo({ left: 0, behavior: "smooth" }); }
else { slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" }); }
resetAutoSlide(); } /* الأسهم */ prevButton.addEventListener("click", movePrev);
nextButton.addEventListener("click", moveNext);
/* ================================ AUTO SLIDE ================================= */
let autoSlide; function startAutoSlide() { clearInterval(autoSlide);
autoSlide = setInterval(function ()
{ const maxScroll = slider.scrollWidth - slider.clientWidth;
/* * إذا وصلنا للنهاية * نرجع للبداية */
if (slider.scrollLeft >= maxScroll - 5)
{ slider.scrollTo({ left: 0, behavior: "smooth" }); } else
{ slider.scrollBy({ left: getScrollAmount(), behavior: "smooth" }); } }, 3000); }
/* إعادة تشغيل المؤقت */ function resetAutoSlide()
{ clearInterval(autoSlide); startAutoSlide(); }
/* بدء التشغيل */ startAutoSlide(); /* إيقاف الحركة أثناء لمس السلايدر */
slider.addEventListener("mouseenter", function () { clearInterval(autoSlide); });
/* إعادة التشغيل بعد خروج الماوس */
slider.addEventListener("mouseleave", function () { startAutoSlide(); });
/* دعم الموبايل */ slider.addEventListener("touchstart", function ()
{ clearInterval(autoSlide); }, { passive: true });
slider.addEventListener("touchend", function () { startAutoSlide(); },
{ passive: true }); });
/*============================================================================*/
/* ============================ 1- End Tags JS ===============================*/
/*============================================================================*/

/*============================================================================*/
/* ============================ 2- Start Slider Img JS ===============================*/
/*============================================================================*/
document.addEventListener("DOMContentLoaded", function () {

    var sliders = document.querySelectorAll(".D_Slider_Img");

    sliders.forEach(function (slider) {

        var container = slider.querySelector(".D_Slider_Counter_Video");
        var items = slider.querySelectorAll(".Div_Video_Img");
        var prev = slider.querySelector(".BSlider_Prev_Img");
        var next = slider.querySelector(".B_Slider_Next");

        if (!container || items.length === 0) {
            return;
        }

        var current = 0;
        var timer = null;


        /* =========================================
           تحديد عدد الصور الظاهرة
        ========================================= */

        function getVisible() {

            var width = window.innerWidth;

            if (width <= 480) {
                return 1;
            }

            if (width <= 767) {
                return 2;
            }

            if (width <= 991) {
                return 3;
            }

            return 4;
        }


        /* =========================================
           تجهيز السلايدر
        ========================================= */

        function setup() {

            var visible = getVisible();

            var containerWidth = container.clientWidth;

            /*
             * مساحة الأسهم
             */
            var arrowSpace = 90;

            var availableWidth =
                containerWidth - arrowSpace;

            if (availableWidth < 100) {
                availableWidth = containerWidth;
            }

            var itemWidth =
                availableWidth / visible;


            /*
             * ارتفاع الصور
             */
            var firstHeight = 0;


            items.forEach(function (item, i) {

                item.style.position = "absolute";

                item.style.width =
                    itemWidth + "px";

                item.style.boxSizing =
                    "border-box";

                item.style.padding =
                    "0 5px";

                item.style.transition =
                    "left 0.5s ease";


                /*
                 * تحديد مكان كل صورة
                 */

                var left =
                    45 + ((i - current) * itemWidth);


                item.style.left =
                    left + "px";


                item.style.top =
                    "0";


                item.style.margin =
                    "0";


                /*
                 * حساب الارتفاع
                 */

                if (i === 0) {

                    firstHeight =
                        item.offsetHeight;

                }

            });


            /*
             * ارتفاع الحاوية
             */

            if (firstHeight > 0) {

                container.style.height =
                    firstHeight + "px";

            }

        }


        /* =========================================
           تحريك السلايدر
        ========================================= */

        function move() {

            var visible = getVisible();

            var containerWidth =
                container.clientWidth;

            var arrowSpace = 90;

            var availableWidth =
                containerWidth - arrowSpace;

            if (availableWidth < 100) {
                availableWidth = containerWidth;
            }

            var itemWidth =
                availableWidth / visible;


            var max =
                Math.max(
                    0,
                    items.length - visible
                );


            /*
             * عند النهاية نعود للبداية
             */

            if (current > max) {
                current = 0;
            }


            if (current < 0) {
                current = max;
            }


            items.forEach(function (item, i) {

                var left =
                    45 +
                    ((i - current) * itemWidth);


                item.style.left =
                    left + "px";

            });

        }


        /* =========================================
           التالي
        ========================================= */

        function nextSlide() {

            var visible =
                getVisible();

            var max =
                Math.max(
                    0,
                    items.length - visible
                );


            if (max === 0) {
                return;
            }


            current++;


            if (current > max) {

                current = 0;

            }


            move();

        }


        /* =========================================
           السابق
        ========================================= */

        function previousSlide() {

            var visible =
                getVisible();

            var max =
                Math.max(
                    0,
                    items.length - visible
                );


            if (max === 0) {
                return;
            }


            current--;


            if (current < 0) {

                current = max;

            }


            move();

        }


        /* =========================================
           الأزرار
        ========================================= */

        if (next) {

            next.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    nextSlide();

                    restart();

                }
            );

        }


        if (prev) {

            prev.addEventListener(
                "click",
                function (e) {

                    e.preventDefault();
                    e.stopPropagation();

                    previousSlide();

                    restart();

                }
            );

        }


        /* =========================================
           التشغيل التلقائي
        ========================================= */

        function start() {

            stop();


            timer =
                setInterval(
                    function () {

                        nextSlide();

                    },
                    1500
                );

        }


        function stop() {

            if (timer !== null) {

                clearInterval(timer);

                timer = null;

            }

        }


        function restart() {

            stop();

            start();

        }


        /* =========================================
           إيقاف عند الماوس
        ========================================= */

        slider.addEventListener(
            "mouseenter",
            function () {

                stop();

            }
        );


        slider.addEventListener(
            "mouseleave",
            function () {

                start();

            }
        );


        /* =========================================
           Resize
        ========================================= */

        window.addEventListener(
            "resize",
            function () {

                setup();

                move();

            }
        );


        /* =========================================
           تشغيل
        ========================================= */

        setup();

        move();

        start();

    });

});
/*============================================================================*/
/* ============================ 2- End Slider Img JS ===============================*/
/*============================================================================*/

/*============================================================================*/
/* ============================ 3- Start Thumbinal_Videos JS ===============================*/
/*============================================================================*/
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".D_Video_Count");
    const prev = document.querySelector(".BSlider_Prev_Img_V");
    const next = document.querySelector(".B_Slider_Next_V");

    if (!slider || !prev || !next) return;


    /* =========================================
       SPEED
    ========================================= */

    const AUTO_SPEED = 0.8;
    const FAST_SPEED = 4.5;

    let speed = AUTO_SPEED;
    let direction = 1;


    /* =========================================
       CONTINUOUS MOVEMENT
    ========================================= */

    function slide() {

        const max =
            slider.scrollWidth - slider.clientWidth;


        let position =
            slider.scrollLeft + (direction * speed);


        /* RIGHT END */

        if (position >= max) {

            position = max;
            direction = -1;

        }


        /* LEFT END */

        if (position <= 0) {

            position = 0;
            direction = 1;

        }


        slider.scrollLeft = position;


        requestAnimationFrame(slide);
    }


    /* =========================================
       RIGHT BUTTON
    ========================================= */

    function rightDown(e) {

        e.preventDefault();

        direction = 1;

        speed = FAST_SPEED;

    }


    /* =========================================
       LEFT BUTTON
    ========================================= */

    function leftDown(e) {

        e.preventDefault();

        direction = -1;

        speed = FAST_SPEED;

    }


    /* =========================================
       RELEASE
    ========================================= */

    function release() {

        speed = AUTO_SPEED;

    }


    /* =========================================
       MOUSE
    ========================================= */

    next.addEventListener("mousedown", rightDown);

    prev.addEventListener("mousedown", leftDown);

    document.addEventListener("mouseup", release);


    /* =========================================
       TOUCH
    ========================================= */

    next.addEventListener("touchstart", rightDown, {
        passive: false
    });

    prev.addEventListener("touchstart", leftDown, {
        passive: false
    });

    document.addEventListener("touchend", release);


    /* =========================================
       START
    ========================================= */

    slide();

});

/*============================================================================*/
/* ============================ 3- End Thumbinal_Videos JS ===============================*/
/*============================================================================*/

/*============================================================================*/
/* ============================ 4- Start video Reaction JS In Video.php ===============================*/
/*============================================================================*/
function videoReaction(type, button)
{ const likeBtn = document.querySelector('.Like_Btn');
const dislikeBtn = document.querySelector('.Dislike_Btn');
const likeCount = document.getElementById('likeCount');
const dislikeCount = document.getElementById('dislikeCount');
 /* ========================================== LIKE ========================================== */
if (type === 'like') { /* * إذا كان Like مضغوطًا بالفعل * نلغي الضغط */
if (likeBtn.classList.contains('active'))
{ likeBtn.classList.remove('active');
likeCount.textContent = '0'; return; }
/* * تفعيل Like * وإلغاء Dislike */
likeBtn.classList.add('active');
dislikeBtn.classList.remove('active'); likeCount.textContent = '1';
dislikeCount.textContent = '0'; return; }
/* ========================================== DISLIKE ========================================== */
if (type === 'dislike') { /* * إذا كان Dislike مضغوطًا بالفعل * نلغي الضغط */
if (dislikeBtn.classList.contains('active'))
{ dislikeBtn.classList.remove('active');
dislikeCount.textContent = '0'; return; } /* * تفعيل Dislike * وإلغاء Like */
dislikeBtn.classList.add('active'); likeBtn.classList.remove('active');
dislikeCount.textContent = '1'; likeCount.textContent = '0'; } }

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*++++++++++++++++++++ Start Slider Related Video +++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/*++++++++++++++++++++ End Slider Related Video +++++++++++++++++++++++++++++++++*/
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/



/*============================================================================*/
/* ============================ 4- End video Reaction In Video.php ===============================*/
/*============================================================================*/







/*============================================================================*/
/* ============================ - Start ..... JS ===============================*/
/*============================================================================*/

/*============================================================================*/
/* ============================ - End ..... JS ===============================*/
/*============================================================================*/

/*
 ضع مسار ربط ملف التنسيق هذا :
 <script src="../LAF.js" defer></script>

في كل الصفحات المطلوبة
*/
