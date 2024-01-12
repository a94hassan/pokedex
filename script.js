let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo() {
    let name = currentPokemon['name']
    let capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
    let image = currentPokemon['sprites']['other']['official-artwork']['front_default']
    document.getElementById('pokemonName').innerHTML = capitalizedName
    document.getElementById('pokemonImage').src = image;

    
}