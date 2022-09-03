const contenedorPersonajes = document.getElementById('contenedor-personajes');
const filtroFemale = document.getElementById('filtro-female');
const filtroMale = document.getElementById('filtro-male');
const filtroOther = document.getElementById('filtro-other');
const filtroAll= document.getElementById('filtro-all');
const paginaActual = document.getElementById('pagina-actual');
const totalPaginas = document.getElementById('total-paginas');
const firstPage = document.getElementById('first-page');
const previousPage = document.getElementById('previous-page');
const nextPage = document.getElementById('next-page');
const lastPage = document.getElementById('last-page');
const contenedorLoader = document.getElementById('contenedor-loader');
console.log(contenedorLoader)

let pagina = 1;
let total = 0;

const getData = async () => {
  contenedorLoader.classList.remove('esconder')
  contenedorPersonajes.classList.add('esconder')
  const url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;

  const resp = await fetch(url)
  const json = await resp.json()
  printData(json.results)
  total = json.info.pages
  paginaActual.innerHTML = pagina;
  totalPaginas.innerHTML = total;
  data= json
  updatePagination()
  setTimeout(()=>{
    contenedorLoader.classList.add('esconder')
    contenedorPersonajes.classList.remove('esconder')
  },500)
  return json
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
          <div class="card-content descripcion-personaje">
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
  const female = data.results.filter(personaje => personaje.gender === 'Female')
  printData(female)
})
filtroMale.addEventListener('click', () => {
  const male = data.results.filter(personaje => personaje.gender === 'Male')
  printData(male)
})
filtroOther.addEventListener('click', () => {
  const other = data.results.filter(personaje => personaje.gender !== 'Female' && personaje.gender !== 'Male')
  printData(other)
})
filtroAll.addEventListener('click',() => {
  printData(data.results)
})
//Paginacion

const pagination = async (data) => {
  const result = await data
  console.log(result)
  nextPage.addEventListener('click', () => {
    pagina += 1
    getData()
  })
  previousPage.addEventListener('click', () => {
    pagina -= 1
    getData()
  })
  lastPage.addEventListener('click', () => {
    if (pagina <= result.info.pages) {
      pagina = result.info.pages
      getData()
    }
  })
  firstPage.addEventListener('click', () => {
    if (pagina >= 2) {
      pagina = 1
      getData()
    }
  })
}
const updatePagination = () =>{
  if(pagina <= 1){  
    previousPage.disabled = true
    firstPage.disabled = true
  }
  else{
    previousPage.disabled = false
    firstPage.disabled = false
  }
  if(pagina >= total){  
    lastPage.disabled = true
    nextPage.disabled = true
  }
  else{
    lastPage.disabled = false
    nextPage.disabled = false
  }
}


$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  pagination(getData())
})