console.log('Hello word');


const API = 'https://api.thecatapi.com/v1/images/search?limit=3&api_key=live_LWlII4fc0XuFqpDFwI0gaXUnT14r7RLYu3Cp6hSVdU4iipg0YoKByXwIkWfdqqsG';
//El limit 3 se lo agregue yo, y quiere decir que me traiga 3 imagenes


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
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    const img3 = document.getElementById('img3');
    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;

}

const boton = document.querySelector('button');

boton.onclick = MyCat;

MyCat();