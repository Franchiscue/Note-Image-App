
let btnSelect;

export const searchDiv = document.getElementById("_searchDiv");
export const selectedFileText = document.getElementById("_selectedFileText");
//VARIABLES
export let selectedFile = "";
export let fileUnsplash ="";


export const createImgArray = (_results) =>{
    searchDiv.innerHTML = `<div class="row row-cols-6 d-flex justify-content-around searchResult mb-2"></div>`;
    _results.forEach(el => {
        searchDiv.firstChild.innerHTML += 
        `<div class="card m-1 searchedImgs">
            <div class="imgDiv" style="background-image: url(${el.urls.thumb}); background-size: cover;"></div>
            <div class="card-body">
                <h6 class="card-title text-center">${el.user.name}</h6>
                <div class="d-flex justify-content-between">
                    <a href="${el.links.html}" target="_blank" class="btn btn-primary">Link</a>
                </div>
            </div>
        </div>`;
    });
    for (let i = 0; i < searchDiv.children[0].children.length; i++) {
        let element = searchDiv.children[0].children[i].children[1].children[1];
        btnSelect = document.createElement("BUTTON")
        btnSelect.setAttribute("type", "button");
        btnSelect.classList.add("btn","btn-success")
        btnSelect.textContent = "Select";
        btnSelect.addEventListener("click", (e)=>{
            let urlImg = e.path[3].children[0].attributes[1].value.match(/\bhttps?::\/\/\S+/gi) || e.path[3].children[0].attributes[1].value.match(/\bhttps?:\/\/\S+/gi).toString();
            selectedFileText.value = e.path[2].children[0].innerHTML;
            selectedFile = urlImg.substring(0, urlImg.length-1);
            fileUnsplash = e.path[1].children[0].href;
        })
        element.appendChild(btnSelect);
    }
}