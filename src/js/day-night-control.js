export const dayNightMode = () =>{ //Modo día y noche
    const date = new Date();
    const hour = date.getHours();
    if (hour > 7 && hour < 20){
        document.body.style.backgroundColor = "#FFFF99";
    } else {
        document.body.style.backgroundColor = "#c8c879";
    }
}