const randomImageURL = "https://picsum.photos/200/300.jpg";
const container = document.getElementsByClassName('container')[0];
const loaderElt = document.getElementById('loader');

// ---------- Images loader management ---------- //

function createImage(imgURL, alt){
    let newImg = document.createElement('img');
    newImg.setAttribute('src', imgURL);
    newImg.setAttribute('alt', alt);
    return newImg;
}

function fetchImage(sourceURL){
    return fetch(sourceURL)
        .then((response) => {
            return response.url;
        })
        .catch((error) => {
            console.error("Fetched image error : If a \"Cross-Origin Request Blocked\" occurs, try to turn off your addblocker.");
            return "";
        })
}

function makeImagePromise(url, index=0) {
    let imgPromise = new Promise((resolve, reject) => {
        let imgURL = fetchImage(url);
        imgURL
            .then((url) => {
                let newImg = createImage(url, index);
                resolve(newImg);
            });
    });

    return imgPromise;
}

function makeImageListPromise(number, url) {
    let imgListPromise = new Promise((resolve, reject) => {

        let promiseList = new Array();
        
        for (let i=0; i<number; i++) { promiseList.push(makeImagePromise(url, i)) }
        
        Promise.all(promiseList)
            .then((res) => {
                console.log(`${number} image(s) were loaded.`)
                resolve(res);
            });
    })

    return imgListPromise;
}

function loadImages(number, url = randomImageURL) {
    makeImageListPromise(number, url)
        .then((imgList) => {
            loaderElt.style.display = 'none';
            for (let i=0; i<imgList.length; i++) { container.append(imgList[i]) }
        });
}

// ---------- Auto reload ---------- //

// To continue

// ---------- Main ---------- //

loadImages(20);