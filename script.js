const container = document.getElementsByClassName('container')[0];
const loaderElt = document.getElementById('loader');
let lastImage = null;

window.addEventListener('DOMContentLoaded', (e) => {
    console.log('DOM loaded');
})

function addImage(imgURL, lastLoaded) {
    let newImg = document.createElement('img');
    newImg.setAttribute('src', imgURL);
    lastImage = newImg;
    container.append(newImg);
    if (lastLoaded) loaderElt.style.display = "none";
}

function getRandomImageURL(sourceURL){
    return fetch(sourceURL)
        .then((response) => {
            return response.url;
        })
        .catch((error) => {
            console.error("⚠ : If a \"Cross-Origin Request Blocked\" occurs, try to turn off your addblocker.");
            return "";
        })
}

function getNRandomImage(number, sourceURL) {
    loaderElt.style.display = "block";

    for(let i = 0; i < number; i++) {
        let currentImageURL = getRandomImageURL(url);
        currentImageURL
            .then((value) => {
                let last = false;
                console.log(i);
                if(i === (number - 1)) {
                    console.log('last img trigger');
                    last = true;
                }
                if(value.length !== 0) addImage(value, last);
            })
            .catch((error) => console.log(error));
    }
}

let url = "https://picsum.photos/200/300.jpg";
getNRandomImage(20, url);
