const videos = document.querySelectorAll(".porn_video_div");
const pagination = document.querySelector(".pagination");

let perPage = 2;
let currentPage = 1;

function showPage(page){

    currentPage = page;

    videos.forEach((video,index)=>{

        if(
            index >= (page-1)*perPage &&
            index < page*perPage
        ){
            video.style.display="block";
        }
        else{
            video.style.display="none";
        }

    });


    document.querySelectorAll(".pagination button")
    .forEach(btn=>{
        btn.classList.remove("active");
    });

    document
    .querySelector(`button[data-page="${page}"]`)
    .classList.add("active");

}



let pages = Math.ceil(videos.length/perPage);


for(let i=1;i<=pages;i++){

    let btn=document.createElement("button");

    btn.innerHTML=i;
    btn.dataset.page=i;

    btn.onclick=function(){
        showPage(i);
    };

    pagination.appendChild(btn);

}


showPage(1);
