const itemsPerPage = 2;

const container = document.querySelector(".porn_videos_cont");
const items = Array.from(container.children);

const pagination = document.getElementById("pagination");

const totalPages = Math.ceil(items.length / itemsPerPage);

function showPage(page){

    items.forEach(item => item.style.display = "none");

    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    items.slice(start, end).forEach(item=>{
        item.style.display = "block";
    });

    document.querySelectorAll("#pagination button").forEach(btn=>{
        btn.classList.remove("active");
    });

    document.querySelector(`#pagination button[data-page="${page}"]`)
        .classList.add("active");
}

for(let i=1;i<=totalPages;i++){

    const btn=document.createElement("button");
    btn.textContent=i;
    btn.dataset.page=i;

    btn.onclick=()=>showPage(i);

    pagination.appendChild(btn);
}

showPage(1);