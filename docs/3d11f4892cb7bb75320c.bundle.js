/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/http-provider.js
//HTML
const searchInput = document.getElementById("_searchInput");

//API
const httpProvider = (_search, _key) => `https://api.unsplash.com/search/photos?query=${_search}&per_page=30&client_id=${_key}`;
const apiKey = "DS3ysthJJOEowS4k_roloV1rrVZEgQTQG1UbAKuCGW0";


const getImgsAPI = async() => {
    try {
        const resp = await fetch(httpProvider(searchInput.value, apiKey));
        if(!resp.ok) throw "Conection error";
        const { results } = await resp.json();
        return (results);
    } catch (error) {
        console.log(error);
    }
}
;// CONCATENATED MODULE: ./src/js/img-page.js

let btnSelect;

const searchDiv = document.getElementById("_searchDiv");
const selectedFileText = document.getElementById("_selectedFileText");
//VARIABLES
let selectedFile = "";
let fileUnsplash ="";


const createImgArray = (_results) =>{
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
;// CONCATENATED MODULE: ./src/js/day-night-control.js
const dayNightMode = () =>{ //Modo día y noche
    const date = new Date();
    const hour = date.getHours();
    if (hour > 7 && hour < 20){
        document.body.style.backgroundColor = "#FFFF99";
    } else {
        document.body.style.backgroundColor = "#c8c879";
    }
}
;// CONCATENATED MODULE: ./src/index.js
//Importar el CSS


//HTML
const ideaTextarea = document.getElementById("_ideaTextarea");
const btnAdd = document.getElementById("_btnAdd");
const btnShare = document.getElementById("_btnShare");
const src_searchInput = document.getElementById("_searchInput");
const btnDelete = document.getElementById("_btnDelete");
const btnSearch = document.getElementById("_btnSearch");
const btnUpload = document.getElementById("_btnUpload");
const cardsDiv = document.getElementById("_cardsDiv");

//Importar funciones y variables que necesitamos para que funcione la aplicación




//Eventos
window.addEventListener("load", dayNightMode);

src_searchInput.addEventListener("keyup", (e) => {
    if (e.key ==="Enter"){
        //Llamar API para cargar imágenes
        searchDiv.classList.remove("d-none");
        if (src_searchInput.value !== ""){
            getImgsAPI().then( resp => createImgArray(resp));
        }
    }
});

btnSearch.addEventListener("click", () =>{
    searchDiv.classList.remove("d-none");
    if (src_searchInput.value !== "") {
        getImgsAPI().then( resp => createImgArray(resp));
    }
});

btnAdd.addEventListener("click", () =>{
    if (ideaTextarea.value != "" && selectedFile != ""){
        cardsDiv.innerHTML += 
        `<div class="card">
            <a href="${fileUnsplash}" target="_blank">
                <img class="card-img-top" src="${selectedFile}" alt="Card image cap">
            </a>
            <div class="card-body">
                <p class="card-text">${ideaTextarea.value}</p>
            </div>
        </div>`
    } else if (selectedFile === ""){
        cardsDiv.innerHTML += 
        `<div class="card">
            <div class="card-body">
                <p class="card-text">${ideaTextarea.value}</p>
            </div>
        </div>`
    }
    
    ideaTextarea.value = "";
    src_searchInput.value = "";
    selectedFile = "";
    selectedFileText.value = "";
    searchDiv.classList.add("d-none");
});

btnShare.addEventListener("click", () =>{

})

btnDelete.addEventListener("click", () =>{
    selectedFileText.value = "";
    selectedFile = "";
})

btnUpload.addEventListener("change", (e)=>{
    selectedFileText.value = e.target.files[0].name;
    selectedFile = URL.createObjectURL(e.target.files[0]);
});
/******/ })()
;
//# sourceMappingURL=3d11f4892cb7bb75320c.bundle.js.map