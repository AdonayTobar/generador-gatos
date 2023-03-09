console.log('Hello word');


const API = 'https://api.thecatapi.com/v1/images/search';


//Esta es la forma usando fetch
/* fetch(API)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    }) */

//Forma usando Async await

async function MyCat(){
    const res = await fetch(API);
    const data = await res.json();
    const img = document.querySelector('img');
    img.src = data[0].url;
}

const boton = document.querySelector('button');

boton.onclick = MyCat;