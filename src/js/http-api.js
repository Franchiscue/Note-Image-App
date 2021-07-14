//HTML
const searchInput = document.getElementById("_searchInput");

//API
const httpProvider = (_search, _key) => `https://api.unsplash.com/search/photos?query=${_search}&per_page=30&client_id=${_key}`;
const apiKey = "Pon tu clave";


export const getImgsAPI = async() => {
    try {
        const resp = await fetch(httpProvider(searchInput.value, apiKey));
        if(!resp.ok) throw "Conection error";
        const { results } = await resp.json();
        return (results);
    } catch (error) {
        console.log(error);
    }
}