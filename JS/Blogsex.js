<script>
<![CDATA[
document.addEventListener("DOMContentLoaded", function () {

    const slider = document.querySelector(".Dthumbinal-slide");
    const nextBtn = document.querySelector(".slider-next");
    const prevBtn = document.querySelector(".slider-prev");

    if (!slider || !nextBtn || !prevBtn) {
        return;
    }

    let autoSlide;

    function moveNext() {

        const amount = slider.clientWidth / 4;

        if (
            slider.scrollLeft + slider.clientWidth
            >= slider.scrollWidth - 5
        ) {

            slider.scrollTo({
                left: 0,
                behavior: "smooth"
            });

        } else {

            slider.scrollBy({
                left: amount,
                behavior: "smooth"
            });

        }

    }


    function movePrev() {

        const amount = slider.clientWidth / 4;

        if (slider.scrollLeft <= 5) {

            slider.scrollTo({
                left: slider.scrollWidth - slider.clientWidth,
                behavior: "smooth"
            });

        } else {

            slider.scrollBy({
                left: -amount,
                behavior: "smooth"
            });

        }

    }


    nextBtn.addEventListener("click", moveNext);

    prevBtn.addEventListener("click", movePrev);


    function startAuto() {

        stopAuto();

        autoSlide = setInterval(function () {
            moveNext();
        }, 3000);

    }


    function stopAuto() {

        if (autoSlide) {
            clearInterval(autoSlide);
        }

    }


    slider.addEventListener("mouseenter", stopAuto);

    slider.addEventListener("mouseleave", startAuto);


    startAuto();

});
]]>
</script>
