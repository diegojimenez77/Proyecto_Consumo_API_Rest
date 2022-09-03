const API_URL_RANDOM = 'https://api.thecatapi.com/v1/images/search?limit=3';
const API_URL_FAVORITES = 'https://api.thecatapi.com/v1/favourites';
const API_URL_FAVORITES_DELETE = (id) => 'https://api.thecatapi.com/v1/favourites/${id}?api_key=live_0Y05FXCjJD0vezDgYu8qml2pDfNb15Xh9tPuPBl4ejdOcl8mwpflts2pc1ImOsFP';
const API_URL_UPLOAD = 'https://api.thecatapi.com/v1/images/upload';

const spanError = document.getElementById('error');

async function myCat() {
    const res = await fetch(API_URL_RANDOM);
    const data = await res.json();
    console.log('Random');
    console.log(data);
    
    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status;
    } else {
        const img0 = document.getElementById('img0');
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const img3 = document.getElementById('img3');
        const btn1 = document.getElementById('btn1');
        const btn2 = document.getElementById('btn2');
        const btn3 = document.getElementById('btn3');
        
        // img0.src = data[0].url;
        img1.src = data[0].url;
        img2.src = data[1].url;
        img3.src = data[2].url;
        
        btn1.onclick = () => saveFavoritesMichis(data[0].id);
        btn2.onclick = () => saveFavoritesMichis(data[1].id);
        btn3.onclick = () => saveFavoritesMichis(data[2].id);
    }
}

async function loadFavoritesMichis() {
    const res = await fetch(API_URL_FAVORITES, {
        method: 'GET',
        headers: {
            'X-API-KEY':'live_0Y05FXCjJD0vezDgYu8qml2pDfNb15Xh9tPuPBl4ejdOcl8mwpflts2pc1ImOsFP',
        },
    });
    const data = await res.json();
    console.log('Favorites');
    console.log(data);

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        const section = document.getElementById('favoritesMichis')
        section.innerHTML = '';
        const h2 = document.createElement('h2');
        const h2Text = document.createTextNode('Favoritos');
        h2.appendChild(h2Text);
        section.appendChild(h2);

        data.forEach(michi => {
           
           const article = document.createElement('article');
           const img = document.createElement('img');
           const btn = document.createElement('button');
           const btnText = document.createTextNode('Sacar de Favoritos');
           
           img.src = michi.image.url;
           img.width = 250;
           btn.appendChild(btnText);
           btn.onclick = () => deleteFavourites(michi.id);
           article.appendChild(img);
           article.appendChild(btn);
           section.appendChild(article);
        });
    }
}

async function saveFavoritesMichis(id) {
    const res = await fetch(API_URL_FAVORITES, {
        method:'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY':'live_0Y05FXCjJD0vezDgYu8qml2pDfNb15Xh9tPuPBl4ejdOcl8mwpflts2pc1ImOsFP',
        },
        body: JSON.stringify({
            image_id:id
            // L_H7aef7m
        }),
    });
    const data = await res.json();

    console.log('Save')
    console.log(res)

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Michi guardado')
        loadFavoritesMichis();
    }
};

async function deleteFavourites(id) {
    const res = await fetch(API_URL_FAVORITES_DELETE(id), {
        method:'DELETE',
        headers: {
            'X-API-KEY':'live_0Y05FXCjJD0vezDgYu8qml2pDfNb15Xh9tPuPBl4ejdOcl8mwpflts2pc1ImOsFP',
        },
        
    });
    const data = await res.json();

    if (res.status !== 200) {
        spanError.innerHTML = "Hubo un error: " + res.status + data.message;
    } else {
        console.log('Michi eliminado')
        loadFavoritesMichis();
    }
}

async function uploadMichiPhoto() {
        const form = document.getElementById('uploadingForm')
        const formData = new FormData (form);

        console.log(formData.get('file'))

        const res = await fetch(API_URL_UPLOAD, {
            method: 'POST',
            headers:{
                // 'Content-Type': 'multipart/form-data',
                'X-API-KEY': 'live_0Y05FXCjJD0vezDgYu8qml2pDfNb15Xh9tPuPBl4ejdOcl8mwpflts2pc1ImOsFP',
            },
            body : formData,
        })
        if (res.status !== 201) {
            spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`
        }
        else {
            console.log("Foto de michi cargada :)");
            console.log({ data });
            console.log(data.url);
            saveFavouriteMichi(data.id) //para agregar el michi cargado a favoritos.
        }
}

myCat();
const myButton = document.getElementById("show");
myButton.onclick = myCat;
loadFavoritesMichis();