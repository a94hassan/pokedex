let typeColors = {'fire': '#fb6c6c', 'water': '#76bdfe', 'grass': '#46C19C', 'electric': '#ffd86f', 'ground': '#91746B', 'poison': '#C288C1', 'fairy': '#F3BFD5', 'ghost': '#563B63', 'dragon': '#44667D', 'bug': '#98c14d', 'normal': '#BBBBBB', 'ice': '#ADCFE2', 'fighting': '#E5A66E', 'flying': '#005E7C', 'psychic': '#D17BE2', 'rock': '#A9A87D', 'dark': '#333333', 'steel': '#B8B8D0'};
let shape = {'ball':'./img/shape01.png','squiggle':'./img/shape02.png','fish':'./img/shape03.png','arms':'./img/shape04.png','blob':'./img/shape05.png','upright':'./img/shape06.png','legs':'./img/shape07.png','quadruped':'./img/shape08.png','wings':'./img/shape09.png','tentacles':'./img/shape10.png','heads':'./img/shape11.png','humanoid':'./img/shape12.png','bug-wings':'./img/shape13.png','armor':'./img/shape14.png'};
let pokemonData;
let pokemonSpeciesData;
let startNumberOfPokemons = 40;
let startIndex = 1;

async function fetchData() {
    for (let i = startIndex; i < startIndex + startNumberOfPokemons; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let data = await response.json();
        renderOverview(i, data);
    }
}

async function load20MorePokemons() {
    startIndex += startNumberOfPokemons;
    startNumberOfPokemons = 20;
    await fetchData();
}

function renderOverview(i, data) {
    let formattedPokemonID = "#" + i.toString().padStart(3, '0');
    let pokemonName = data['name'];
    let capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    let pokemonTypes = renderPokemonsTypes(data['types']);
    let pokemonImage = data['sprites']['other']['official-artwork']['front_default'];
    let pokemonsOverview = document.getElementById('pokemonsOverview');
    pokemonsOverview.innerHTML += generatePokemonsOverviewHtml(i, formattedPokemonID, capitalizedPokemonName, pokemonTypes, pokemonImage);
    renderPokemonOverviewBGColor(i, data);    
}

function renderPokemonsTypes(types) {
    let pokemonTypes = '';
    for (let i = 0; i < types.length; i++) {
        let type = types[i]['type']['name'];
        let capitalizedPokemonType = type.charAt(0).toUpperCase() + type.slice(1);
        pokemonTypes += `<div class="pokemonTypeOverview">${capitalizedPokemonType}</div>`;
    }
    return pokemonTypes;
}

function renderPokemonOverviewBGColor(i, data) {
    let bgColor = typeColors[data['types'][0]['type']['name']];
    document.getElementById(`pokemonOverview${i}`).style = `background-color: ${bgColor}`;
}

async function openDialog(i) {
    document.getElementById('dialogBG').style = 'display: unset';
    await fetchPokemonData(i);
    openPokemonStatsTab('about', 'aboutContent');
}

function closeDialog() {
    document.getElementById('dialogBG').style = 'display: none';
}

async function getPokemonBySearch() {
    let searchQuery = document.getElementById('searchQuery').value.toLowerCase();
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchQuery}`);
    let data = await response.json();
    let pokemonID = data['id'];
    openDialog(pokemonID);
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchQuery').addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            getPokemonBySearch();
        }
    });
})

async function fetchPokemonData(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    pokemonData = await response.json();
    let response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    pokemonSpeciesData = await response2.json();
    renderPokemonInfo();
    renderNavigation(i);
}

function renderNavigation(i) {
    if (i > 1) {
        document.getElementById('pokedexArrowLeft').onclick = function() {
            previousPokemon(i);
        }
        document.getElementById('pokedexArrowLeft').style = 'display: unset';
    } else {
        document.getElementById('pokedexArrowLeft').style = 'display: none';
    }
    document.getElementById('pokedexArrowRight').onclick = function() {
        nextPokemon(i);
    }
}

async function previousPokemon(i) {
    i--;
    await fetchPokemonData(i);
    openPokemonStatsTab('about', 'aboutContent');
}

async function nextPokemon(i) {
    i++;
    await fetchPokemonData(i);
    openPokemonStatsTab('about', 'aboutContent');
}

function renderPokemonInfo() {
    let pokemonName = pokemonData['name'];
    let capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    let pokemonImage = pokemonData['sprites']['other']['official-artwork']['front_default'];
    let pokemonID = pokemonData['id'];
    let formattedPokemonID = "#" + pokemonID.toString().padStart(3, '0');
    document.getElementById('pokemonName').innerHTML = capitalizedPokemonName;
    document.getElementById('pokemonImage').src = pokemonImage;
    document.getElementById('pokemonID').innerHTML = formattedPokemonID;
    renderPokemonTypes();
    renderPokedexBGColor();
    renderPokemonStats();
}

function renderPokemonTypes() {
    document.getElementById('pokemonTypes').innerHTML = '';
    for (let i = 0; i < pokemonData['types'].length; i++) {
        let pokemonType = pokemonData['types'][i]['type']['name'];
        let capitalizedPokemonType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
        document.getElementById('pokemonTypes').innerHTML += /*html*/`
            <div class="pokemonType">${capitalizedPokemonType}</div>
        `;
    }
}

function renderPokedexBGColor() {
    let bgColor = typeColors[pokemonData['types'][0]['type']['name']];
    document.getElementById('pokedexTop').style = `background-color: ${bgColor}`;
}

function renderPokemonStats() {
    let pokemonStats = document.getElementById('pokemonStats');
    let pokemonHeight = `${calcPokemonHeightInFootAndInch()} (${calcPokemonHeightInMeters()} m)`;
    let pokemonWeight = `${calcPokemonWeightInPounds()} lbs (${calcPokemonWeightInKilogram()} kg)`;
    pokemonStats.innerHTML = generateAboutTabHtml()+ generateBaseStatsTabHtml() + generateFormTabHtml(pokemonHeight, pokemonWeight) + generateTrainingTabHtml();
    renderChart();
    aboutTabRendering();
    formTabRendering();
    trainingTabRendering();
}

function aboutTabRendering() {
    renderPokemonFlavorText();
    renderPokemonAboutName();
    renderPokemonAboutID();
    renderPokemonAboutType();
    renderPokemonAboutHabitat();
    renderPokemonPokedexColor();
}

function formTabRendering() {
    renderPokemonSpecies();
    renderPokemonAbilities();
    renderPokemonShape();
    renderPokemonShiny();
}

function trainingTabRendering() {
    renderPokemonGender();
    renderPokemonEggGroups();
    renderPokemonHatchTime();
    renderPokemonFriendship();
    renderPokemonLevelingRate();
    renderPokemonExperience();
    renderPokemonCatchRate();
}

function openPokemonStatsTab(tabID, contentID) {
    document.getElementById(tabID).classList.add('pokemonStatsNavBarHighlight');
    document.getElementById(contentID).style.display = 'unset';
    ['about', 'baseStats', 'form', 'training'].forEach(tab => {
        if (tab !== tabID) {
            document.getElementById(tab).classList.remove('pokemonStatsNavBarHighlight');
            document.getElementById(tab + 'Content').style.display = 'none';
        }
    });
}

function renderPokemonFlavorText() {
    for (let i = 0; i < pokemonSpeciesData['flavor_text_entries'].length; i++) {
        let pokemonFlavorTextData = pokemonSpeciesData['flavor_text_entries'][i];
        if (pokemonFlavorTextData['language']['name'] == 'en') {
            let pokemonFlavorText = pokemonSpeciesData['flavor_text_entries'][i]['flavor_text'];
            document.getElementById('pokemonFlavorText').innerHTML = pokemonFlavorText;
        }
    }
}

function renderPokemonAboutName() {
    let pokemonName = pokemonData['name'];
    let capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemonAboutName').innerHTML = capitalizedPokemonName;
}

function renderPokemonAboutID() {
    let pokemonID = pokemonData['id'];
    document.getElementById('pokemonAboutID').innerHTML = pokemonID;
}

function renderPokemonAboutType() {
    document.getElementById('pokemonAboutType').innerHTML = '';
    for (let i = 0; i < pokemonData['types'].length; i++) {
        let pokemonType = pokemonData['types'][i]['type']['name'];
        let capitalizedPokemonType = pokemonType.charAt(0).toUpperCase() + pokemonType.slice(1);
        document.getElementById('pokemonAboutType').innerHTML += capitalizedPokemonType;
        if (i < pokemonData['types'].length - 1) {
            document.getElementById('pokemonAboutType').innerHTML += ', ';
        }
    }
}

function renderPokemonAboutHabitat() {
    let pokemonHabitat = pokemonSpeciesData['habitat']['name'];
    let capitalizedPokemonHabitat = pokemonHabitat.charAt(0).toUpperCase() + pokemonHabitat.slice(1);
    document.getElementById('pokemonAboutHabitat').innerHTML = capitalizedPokemonHabitat;
}

function renderPokemonPokedexColor() {
    let pokemonPokedexColor = pokemonSpeciesData['color']['name'];
    let capitalizedPokemonPokedexColor = pokemonPokedexColor.charAt(0).toUpperCase() + pokemonPokedexColor.slice(1);
    document.getElementById('pokemonAboutPokedexColor').innerHTML = /*html*/`
    <div id="pokedexColor"></div>${capitalizedPokemonPokedexColor}
    `;
    document.getElementById('pokedexColor').style = `background-color: ${pokemonPokedexColor}`;
}

function renderPokemonShape() {
    let pokemonShape = pokemonSpeciesData['shape']['name'];
    let capitalizedPokemonShape = pokemonShape.charAt(0).toUpperCase() + pokemonShape.slice(1);
    let pokemonShapeImage = shape[pokemonSpeciesData['shape']['name']];
    document.getElementById('pokemonShape').innerHTML = /*html*/`
        ${capitalizedPokemonShape} <img src="${pokemonShapeImage}">
        `;
}

function renderPokemonSpecies() {
    let pokemonSpecies = pokemonSpeciesData['genera'][7]['genus'];
    document.getElementById('pokemonSpecies').innerHTML = pokemonSpecies.replace(" Pokémon", "");
}

function calcPokemonHeightInMeters() {
    let pokemonHeight = pokemonData['height'];
    let pokemonHeightInCentimeters = pokemonHeight * 10;
    let pokemonHeightInMeters = (pokemonHeightInCentimeters / 100).toFixed(2);
    return pokemonHeightInMeters;
}

function calcPokemonHeightInFootAndInch() {
    let foot = Math.floor(calcPokemonHeightInMeters(pokemonData) * 3.28084);
    let inch = ((calcPokemonHeightInMeters(pokemonData) * 3.28084 - foot) * 12).toFixed(1);
    let pokemonHeightInFootAndInch = `${foot}'${inch}"`
    return pokemonHeightInFootAndInch;
}

function calcPokemonWeightInKilogram() {
    let pokemonWeight = pokemonData['weight'];
    let pokemonWeightInKilogram = pokemonWeight / 10;
    return pokemonWeightInKilogram;
}

function calcPokemonWeightInPounds() {
    let poundsPerKilogram = 2.20462;
    let pokemonWeightInPounds = calcPokemonWeightInKilogram(pokemonData) * poundsPerKilogram;
    return pokemonWeightInPounds.toFixed(1);
}

function renderPokemonAbilities() {
    for (let i = 0; i < pokemonData['abilities'].length; i++) {
        let pokemonAbility = pokemonData['abilities'][i]['ability']['name'];
        let capitalizedPokemonAbility = pokemonAbility.charAt(0).toUpperCase() + pokemonAbility.slice(1);
        document.getElementById('pokemonAbilities').innerHTML += `${capitalizedPokemonAbility} `;
        if (i < pokemonData['abilities'].length - 1) {
            document.getElementById('pokemonAbilities').innerHTML += ', ';
        }
    }
}

function renderPokemonShiny() {
    let pokemonShinyImage = pokemonData['sprites']['other']['official-artwork']['front_shiny'];
    document.getElementById('pokemonShiny').innerHTML = `<img src = ${pokemonShinyImage}>`;
}

function renderPokemonGender() {
    let pokemonGenderFemaleRate = pokemonSpeciesData['gender_rate'];
    let pokemonGenderFemaleRateInPercent = ((pokemonGenderFemaleRate / 8) * 100);
    let pokemonGenderMaleRateInPercent = (100 - pokemonGenderFemaleRateInPercent);
    if (pokemonGenderFemaleRate != -1) {
        document.getElementById('pokemonGender').innerHTML = `<div><img src="./img/male_icon.png">${pokemonGenderMaleRateInPercent}%</div><div><img src="./img/female_icon.png">${pokemonGenderFemaleRateInPercent}%</div>`
    } else {
        document.getElementById('pokemonGender').innerHTML = 'genderless'
    }
}

function renderPokemonEggGroups() {
    for (let i = 0; i < pokemonSpeciesData['egg_groups'].length; i++) {
        let pokemonEggGroup = pokemonSpeciesData['egg_groups'][i]['name']
        let capitalizedPokemonEggGroup = pokemonEggGroup.charAt(0).toUpperCase() + pokemonEggGroup.slice(1);
        document.getElementById('pokemonEggGroups').innerHTML += capitalizedPokemonEggGroup;
        if (i < pokemonSpeciesData['egg_groups'].length - 1) {
            document.getElementById('pokemonEggGroups').innerHTML += ', ';
        }
    }   
}

function renderPokemonHatchTime() {
    let pokemonHatchTime = pokemonSpeciesData['hatch_counter'];
    document.getElementById('pokemonHatchTime').innerHTML = pokemonHatchTime + ' Cycles';
}

function renderPokemonLevelingRate() {
    let pokemonLevelingRate = pokemonSpeciesData['growth_rate']['name'];
    let capitalizedPokemonLevelingRate = pokemonLevelingRate.charAt(0).toUpperCase() + pokemonLevelingRate.slice(1);
    document.getElementById('pokemonLevelingRate').innerHTML = capitalizedPokemonLevelingRate;
}

function renderPokemonFriendship() {
    let pokemonFriendship = pokemonSpeciesData['base_happiness'];
    document.getElementById('pokemonFriendship').innerHTML = pokemonFriendship;
}

function renderPokemonExperience() {
    let pokemonExperience = pokemonData['base_experience'];
    document.getElementById('pokemonExperience').innerHTML = pokemonExperience;
}

function renderPokemonCatchRate() {
    let pokemonCatchRate = pokemonSpeciesData['capture_rate'];
    document.getElementById('pokemonCatchRate').innerHTML = pokemonCatchRate;
}
