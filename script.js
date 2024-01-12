let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    currentPokemon = await response.json();
    console.log('Loaded pokemon', currentPokemon);

    renderPokemonInfo();
}

function renderPokemonInfo() {
    let pokemonName = currentPokemon['name'];
    let capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    let pokemonImage = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let pokemonId = currentPokemon['id'];
    let formattedPokemonId = "#" + pokemonId.toString().padStart(3, '0');
    document.getElementById('pokemonName').innerHTML = capitalizedPokemonName;
    document.getElementById('pokemonImage').src = pokemonImage;
    document.getElementById('pokemonId').innerHTML = formattedPokemonId;
    renderPokemonTypes();
    renderPokedexBGColor();
}

function renderPokemonTypes() {
    for (let i = 0; i < currentPokemon['types'].length; i++) {
        let pokemonType = currentPokemon['types'][i]['type']['name'];
        let capitalizedPokemonType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
        document.getElementById('pokemonTypes').innerHTML += /*html*/`
            <div class="pokemonType">${capitalizedPokemonType}</div>
        `;
    }
}

function renderPokedexBGColor() {
    let typeColors = {
        'normal': '#a4acaf',
        'fire': '#fd7d24',
        'water': '#4592c4',
        'grass': '#9bcc50',
        'electric': '#eed535',
        'ice': '#51c4e7',
        'fighting': '#d56723',

        'ground': '#403233',

        'flying': '#005E7C',

        'poison': '#b97fc9',
        'psychic': '#f366b9',
        'bug': '#729f3f',
        'rock': '#a38c21',
        'ghost': '#7b62a3',

        'dragon': '#0C1618',

        'fairy': '#fdb9e9',
        'steel': '#9eb7b8'
    };
    let bgColor = typeColors[currentPokemon['types'][0]['type']['name']];
    document.getElementById('pokedexTop').style = `background-color: ${bgColor}`;
}