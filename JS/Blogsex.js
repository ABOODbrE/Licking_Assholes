const slider = document.querySelector(".Dthumbinal-slide");
const nextBtn = document.querySelector(".slider-next");
const prevBtn = document.querySelector(".slider-prev");


let autoSlide;


function moveNext(){

    slider.scrollLeft += slider.clientWidth / 4;


    if(
      slider.scrollLeft + slider.clientWidth 
      >= slider.scrollWidth
    ){

        slider.scrollLeft = 0;

    }

}



function movePrev(){

    slider.scrollLeft -= slider.clientWidth / 4;


    if(slider.scrollLeft <=0){

        slider.scrollLeft =
        slider.scrollWidth;

    }

}



nextBtn.onclick=function(){

    moveNext();

}



prevBtn.onclick=function(){

    movePrev();

}



/* AUTO PLAY */

function startAuto(){

autoSlide=setInterval(
moveNext,
3000
);

}



function stopAuto(){

clearInterval(autoSlide);

}



slider.addEventListener(
"mouseenter",
stopAuto
);


slider.addEventListener(
"mouseleave",
startAuto
);



startAuto();
