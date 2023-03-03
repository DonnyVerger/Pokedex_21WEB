
fetch('https://pokeapi.co/api/v2/pokemon/?limit=649')
  .then(response => response.json())
  .then(function(data){
    data.results.forEach(function(poke){
      ObtenerDatosPokemon(poke);
    })
  })
  .catch(error => {
    console.error(error);
  })

  function ObtenerDatosPokemon (poke){
    let url = poke.url
    fetch(url)
    .then(response => response.json())
    .then(function(Datas){
      ExtraerDatosPokemon(Datas);
    })
  }

  function ExtraerDatosPokemon(poke){
    let allPokemonContainer = document.getElementById('poke-container');
    let pokeContainer = document.createElement("div")
    pokeContainer.id="card_Poke";
    pokeContainer.classList.add('ui', 'card');
    asignarImagen(poke.id, pokeContainer);
    let pokeName = document.createElement('h4')
    pokeName.innerText = "Name: "+poke.name
    let pokeNumber = document.createElement('p')
    pokeNumber.innerText = "Number: "+`#${poke.id}`
    let pokeWeight = document.createElement('p');
    pokeWeight.innerText = "Weight: "+ (poke.weight/10)+" kg";
    let pokeTypesText = document.createElement('p')
    pokeTypesText.innerText = "Type: ";
    let pokeTypes = document.createElement('ul')
    let pokeTypes2 = poke.types;
    let typeName = pokeTypes2.map(function(p){
      return p.type.name;
    })
    let typeStr = typeName.toString();
    pokeTypes.textContent = typeStr.replace(',' , ' ');
    pokeContainer.append(pokeName, pokeNumber, pokeWeight, pokeTypesText, pokeTypes);  
    allPokemonContainer.appendChild(pokeContainer);                                                        
  }

  function asignarImagen(pokeID, containerDiv){
    var myID = pokeID;
    let pokeImgContainer = document.createElement('div')
    pokeImgContainer.classList.add('image')
    var pokeImage = document.createElement('img')
    pokeImage.src = "./assets/images/PokeImages/"+`${myID}`+".gif"
    pokeImgContainer.append(pokeImage);
    containerDiv.append(pokeImgContainer);
}

// const circle = document.getElementById('spinner-form');
const btnSubmit = document.getElementById("btn-submit");
btnSubmit.addEventListener('click', getPokemon);
// btnSubmit.addEventListener('click', (evento) => {
//   evento.preventDefault();
//   // circle.style.display = 'block';
//   document.getElementById("first-form").style.display = "block";
//   setTimeout(() => {
    
//     circle.style.display = 'none';
    
//   }, 3000);
// });
const pokemonInput = document.getElementById("pokemon-input");
const pokemonImg = document.getElementById("poke-img");
const pokemonCard = document.getElementById("card");
pokemonCard.classList.add("invisible");

async function getPokemon() {
  let pokemonInputValue = pokemonInput.value;
  if (!isCorrectValue(pokemonInputValue)) {
      showValue(false);
      return;
  }
  showValue(true);
  let request = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonInputValue}`);
  if (request.ok) {
      let responseInJson = await request.json();
      document.getElementById("first-form").style.display = "none";
      document.getElementById("second-form").style.display = "block";
      MostrarPoke(responseInJson);  
  }
  else {
    swal({
      tittle: "Pokemon no encontrado",
      text: "Pokemon no encontrado",
      icon: 'warning'
  });
  pokemonInput.value = "";
  }
}

function isCorrectValue(pokemonInputValue) {
  if (pokemonInputValue.length >= 1 && pokemonInputValue.length < 30) return true;
  else {
      return false;
  }
}

function showValue(confirm) {
  if (confirm) pokemonInput.style.border = '2px solid #000';
  else {
      pokemonInput.style.border = '2px solid #f00';
  }
}

function MostrarPoke(pokemon) {
  swal({
    tittle: "Pokemon encontrado",
    text: "Pokemon encontrado",
    icon: 'success'
  }); 
  pokemonInput.value = "";
  pokemonCard.classList.remove("invisible");
  // pokemonImg.setAttribute('src', pokemon.sprites.front_default);
  pokemonImg.setAttribute('src', "./assets/images/PokeImages/"+`${pokemon.id}`+".gif");
  document.getElementById("name").textContent = pokemon.name;
  document.getElementById("content-id").textContent = pokemon.id;
  let pokemonHeight = pokemon.height / 10;
  document.getElementById("content-height").textContent = pokemonHeight + ' m'; 
  let pokemonWeight = pokemon.weight / 10;
  document.getElementById("content-weight").textContent = pokemonWeight + ' Kg';
  let types = pokemon.types;
  let type_name = types.map(function(poke) {
      return poke.type.name;
  });
  let typeInStr = type_name.toString();
  document.getElementById('content-type').textContent = typeInStr.replace(',' , ' ');
}
