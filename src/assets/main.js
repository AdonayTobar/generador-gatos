
const API = 'https://api.thecatapi.com/v1/images/search?limit=2';
//El limit 3 se lo agregue yo, y quiere decir que me traiga 3 imagenes

const API_FAVORITOS = 'https://api.thecatapi.com/v1/favourites';

//API para eliminar gatos
const API_FAVORITOS_DELETE = (id) => `https://api.thecatapi.com/v1/favourites/${id}`;

//Api para subir fotos de nuevos gatitos
const API_SUBIR_GATO = 'https://api.thecatapi.com/v1/images/upload';

const spanError = document.querySelector('.error');
//Esta es la forma usando fetch, fue el incio de la clase
/* fetch(API)
    .then(res => res.json())
    .then(data => {
        const img = document.querySelector('img');
        img.src = data[0].url;
    }) */

//Forma usando Async await

async function gatosAleatorios(){
    const res = await fetch(API);
    const data = await res.json();

    if(res.status !== 200){//Es cualquier cosa que no sea 200
        spanError.innerHTML = 'Hubo un error: ' + res.status;
    } else {
        const img1 = document.getElementById('img1');
        const img2 = document.getElementById('img2');
        const guardar1 = document.getElementById('guardar');
        const guardar2 = document.getElementById('guardar1');

        //Hacemos una funcion flecha porque la funcion estaba agregando los gatitos de un solo y guardaba los dos gatos
        guardar1.onclick = () => guardarGatosFavoritos(data[0].id);
        guardar2.onclick = () => guardarGatosFavoritos(data[1].id);

        img1.src = data[0].url;
        img2.src = data[1].url;
    }
    

}

async function gatosFavoritos(){
    const res = await fetch(API_FAVORITOS, {
        method: 'GET',
        headers: {
            'X-API-KEY': 'live_yoYXZ8toTeTHaou0OebWQKw3QYCDpF5ee2WaqzjkRcJPzuTEECmDkDjDNgcte38G',
        }
    });
    const data = await res.json();
    console.log(data);
    if(res.status !== 200){//Es cualquier cosa que no sea 200
        spanError.innerHTML = 'Hubo un error: ' + res.status;
    } else {
        favoritos.innerHTML = "";
        data.forEach(gatos => {

            {/* <div class="rounded-md h-64 w-80 overflow-hidden relative">
                <img class="min-w-80 min-h-full  rounded-md  z-10" alt="Imagen de gatitos">
                <button class="bg-red-500 border-2 border-gray-900 rounded-full h-8 w-8 text-white font-bold flex items-center place-content-center absolute z-1000 top-52 right-2">-</button>
            </div> */}


            //Declarando el div existente
            let favoritos = document.getElementById("favoritos");
            //Creando el elmento div.
            const divfav = document.createElement('div');
            divfav.classList.add('rounded-md', 'h-64', 'w-80', 'overflow-hidden', 'relative', 'transition', 'duration-1000');
            //Creando el elmeento img
            const imgfav = document.createElement('img');
            imgfav.setAttribute('alt', 'Imagen favorita de gatitos');
            imgfav.src = gatos.image.url;
            imgfav.classList.add('min-w-80', 'min-h-full' , 'rounded-md',  'z-10');
            //Creando el boton para elminar de favoritos.
            const eliminarFav = document.createElement('button');
            eliminarFav.classList.add('bg-red-500', 'border-2','border-gray-900', 'rounded-full', 'h-8', 'w-8', 'text-white', 'font-bold', 'flex', 'items-center','place-content-center', 'absolute' ,'z-1000', 'top-52', 'right-2');
            //Creando el texto del boton
            const botonText = document.createTextNode('-');
            eliminarFav.appendChild(botonText);
            //Llamando a la funcion para eliminar gatos
            eliminarFav.onclick = () => eliminarGato(gatos.id);

            //Agregando cada cosa a su lugar
            //Agregando la imagen y el boton al div
            divfav.appendChild(imgfav);
            divfav.appendChild(eliminarFav);   
            //Agregando el div creado al div existente en el html
            favoritos.appendChild(divfav);
            console.log(gatos.image.url);
        });
    }


}

async function guardarGatosFavoritos(id){
    console.log('El boton funciona');

    const res = await fetch(API_FAVORITOS, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-KEY': 'live_yoYXZ8toTeTHaou0OebWQKw3QYCDpF5ee2WaqzjkRcJPzuTEECmDkDjDNgcte38G',
        },
        body: JSON.stringify({
            image_id: id
        }),
    });
    const data = await res.json();
    console.log(res);
    gatosFavoritos();
}

async function eliminarGato(id){
    console.log('el gato ha sido eliminado');
    const res = await fetch(API_FAVORITOS_DELETE(id), {
        method: 'DELETE',
        headers: {
            'Content-Type': 'multipart/form-data',
            'X-API-KEY': 'live_yoYXZ8toTeTHaou0OebWQKw3QYCDpF5ee2WaqzjkRcJPzuTEECmDkDjDNgcte38G',
        }
    });
    const data = await res.json();
    gatosFavoritos();
}
//Esta funcion se utiliza para subir un archivo
async function subirGato(){
    const form = document.querySelector('#cargarForm');
    const formData = new FormData(form);
    

    console.log(formData.get('file'));

    const res = await fetch(API_SUBIR_GATO, {
        method: 'POST',
        headers: {
            'X-API-KEY': 'live_yoYXZ8toTeTHaou0OebWQKw3QYCDpF5ee2WaqzjkRcJPzuTEECmDkDjDNgcte38G',
        },
        body: formData,
    })
    console.log(res);
}

 // Aquí iría el código para mostrar la vista previa del archivo
 const archivoInput = document.getElementById('file');
 const vistaPreviaImg = document.getElementById('vista-previa');

 archivoInput.addEventListener('change', function() {
     const archivo = archivoInput.files[0];

     if (archivo) {
         const lector = new FileReader();

         lector.addEventListener('load', function() {
             vistaPreviaImg.setAttribute('src', lector.result);
             vistaPreviaImg.classList.remove("hidden");
         });

         lector.readAsDataURL(archivo);
     }
 });


const btnsubirG = document.querySelector('#btnS');
btnsubirG.onclick = subirGato;

const boton = document.querySelector('.recargar');

boton.onclick = gatosAleatorios;

//Para guardar


gatosFavoritos();
guardarGatosFavoritos();
gatosAleatorios();
