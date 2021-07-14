//Importar el CSS
import "./css/style.css"

//HTML
const ideaTextarea = document.getElementById("_ideaTextarea");
const btnAdd = document.getElementById("_btnAdd");
const btnShare = document.getElementById("_btnShare");
const searchInput = document.getElementById("_searchInput");
const btnDelete = document.getElementById("_btnDelete");
const btnSearch = document.getElementById("_btnSearch");
const btnUpload = document.getElementById("_btnUpload");
const cardsDiv = document.getElementById("_cardsDiv");

//Importar funciones y variables que necesitamos para que funcione la aplicación
import { getImgsAPI } from "./js/http-provider"
import {createImgArray, searchDiv, selectedFileText, selectedFile, fileUnsplash} from "./js/img-page"
import {dayNightMode}  from "./js/day-night-control"

//Eventos
window.addEventListener("load", dayNightMode);

searchInput.addEventListener("keyup", (e) => {
    if (e.key ==="Enter"){
        //Llamar API para cargar imágenes
        searchDiv.classList.remove("d-none");
        if (searchInput.value !== ""){
            getImgsAPI().then( resp => createImgArray(resp));
        }
    }
});

btnSearch.addEventListener("click", () =>{
    searchDiv.classList.remove("d-none");
    if (searchInput.value !== "") {
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
    searchInput.value = "";
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