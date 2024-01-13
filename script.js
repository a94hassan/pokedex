let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
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
    renderPokemonStats();
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

function renderPokemonStats() {
    let pokemonStats = document.getElementById('pokemonStats');
    let pokemonHeight = `${calcPokemonHeightInFootAndInch()} (${calcPokemonHeightInMeters()} m)`;
    let pokemonWeight = `${calcPokemonWeightInPounds()} lbs (${calcPokemonWeightInKilogram()} kg)`;
    pokemonStats.innerHTML = /*html*/`
        <table>
            <tr>
                <td>Species</td>
                <td>x</td>
            </tr>
            <tr>
                <td>Height</td>
                <td>${pokemonHeight}</td>
            </tr>
            <tr>
                <td>Weight</td>
                <td>${pokemonWeight}</td>
            </tr>
            <tr>
                <td>Abilities</td>
                <td id="pokemonAbilities"></td>
            </tr>
            <th>Breeding</th>
            <tr>
                <td>Gender</td>
                <td>x</td>
            </tr>
            <tr>
                <td>Egg Groups</td>
                <td>x</td>
            </tr>
            <tr>
                <td>Egg Cycle</td>
                <td>x</td>
            </tr>
        </table>
    `;
    renderPokemonAbilities();
}

function calcPokemonHeightInMeters() {
    let pokemonHeight = currentPokemon['height'];
    let pokemonHeightInCentimeters = pokemonHeight * 10;
    let pokemonHeightInMeters = (pokemonHeightInCentimeters / 100).toFixed(2);
    return pokemonHeightInMeters;
}

function calcPokemonHeightInFootAndInch() {
    let foot = Math.floor(calcPokemonHeightInMeters() * 3.28084);
    let inch = ((calcPokemonHeightInMeters() * 3.28084 - foot) * 12).toFixed(1);
    let pokemonHeightInFootAndInch = `${foot}'${inch}"`
    return pokemonHeightInFootAndInch;
}

function calcPokemonWeightInKilogram() {
    let pokemonWeight = currentPokemon['weight'];
    let pokemonWeightInKilogram = pokemonWeight / 10;
    return pokemonWeightInKilogram;
}

function calcPokemonWeightInPounds() {
    let poundsPerKilogram = 2.20462;
    let pokemonWeightInPounds = calcPokemonWeightInKilogram() * poundsPerKilogram;
    return pokemonWeightInPounds.toFixed(1);
}

function renderPokemonAbilities() {
    for (let i = 0; i < currentPokemon['abilities'].length; i++) {
        let pokemonAbility = currentPokemon['abilities'][i]['ability']['name'];
        let capitalizedPokemonAbility = pokemonAbility.charAt(0).toUpperCase() + pokemonAbility.slice(1);
        document.getElementById('pokemonAbilities').innerHTML += `${capitalizedPokemonAbility} `;
        if (i < currentPokemon['abilities'].length - 1) {
            document.getElementById('pokemonAbilities').innerHTML += ', ';
        }
    }
}