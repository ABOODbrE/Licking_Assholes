document.addEventListener("DOMContentLoaded", function(){

    const mixed = document.querySelector(".mixed");
    const items = [...mixed.querySelectorAll(".video_div")];

    const perPage = 40;
    const pageCount = Math.ceil(items.length / perPage);

    mixed.innerHTML = "";

    const pages = [];

    for(let p=0; p<pageCount; p++){

        const page = document.createElement("div");
        page.className = "mixed-page";

        if(p !== 0){
            page.style.display = "none";
        }

        items
        .slice(p*perPage,(p+1)*perPage)
        .forEach(item => page.appendChild(item));

        mixed.appendChild(page);
        pages.push(page);
    }

    if(pageCount > 1){

        const nav = document.createElement("div");
        nav.className = "mixed-pagination";

        for(let i=0;i<pageCount;i++){

            const btn = document.createElement("button");
            btn.textContent = i + 1;

            if(i===0){
                btn.classList.add("active");
            }

            btn.onclick = function(){

                pages.forEach(page=>{
                    page.style.display="none";
                });

                pages[i].style.display="grid";

                nav.querySelectorAll("button").forEach(b=>{
                    b.classList.remove("active");
                });

                btn.classList.add("active");
            };

            nav.appendChild(btn);
        }

        mixed.appendChild(nav);
    }

});
