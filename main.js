const contenedorPersonajes = document.getElementById('contenedor-personajes');
const filtroFemale = document.getElementById('filtro-female');
const filtroMale = document.getElementById('filtro-male');
const filtroOther = document.getElementById('filtro-other');


const getData = () => {
    const url = 'https://rickandmortyapi.com/api/character';
    fetch(url)
        .then(resp => resp.json())
        .then(json => {
            printData(json.results)
            data = json;
        }
        )
        .catch(err => console.error(err))
}
let data = [];

const printData = json => {
    const arr = json;
    let card = '';
    arr.forEach(personaje => {
        const { name, gender, species, status, origin, location, image } = personaje
        card += `<div class="col s12 m6 l3">
        <div class="card personaje-card">
          <div class="card-image personaje-imagen">
            <img
              src="${image}" alt="${name}"
            />
          </div>
          <div class="card-content">
            <p>${name}</p>
            <p>Gender: ${gender}</p>
            <p>Species: ${species}</p>
            <p>Estado: ${status}</p>
            <p>Origin: ${origin.name} (C-137)</p>
            <p>Location: ${location.name}</p>
          </div>
          <div class="card-action">
            <a href="#">Ver más...</a>
          </div>
        </div>
      </div>`;
    })
    contenedorPersonajes.innerHTML = card
}
filtroFemale.addEventListener('click', () => {
    const female = data.results.filter(personaje => personaje.gender==='Female')
    printData(female)
})
filtroMale.addEventListener('click', () => {
    const male = data.results.filter(personaje => personaje.gender==='Male')
    printData(male)
})
filtroOther.addEventListener('click', () => {
    const other = data.results.filter(personaje => personaje.gender!=='Female' && personaje.gender !=='Male')
    printData(other)
})
$(document).ready(function () {
    $(".dropdown-trigger").dropdown();
    getData()
})