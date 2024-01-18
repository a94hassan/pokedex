let typeColors = {'fire': '#fb6c6c', 'water': '#76bdfe', 'grass': '#46C19C', 'electric': '#ffd86f', 'ground': '#91746B', 'poison': '#C288C1', 'fairy': '#F3BFD5', 'ghost': '#563B63', 'dragon': '#44667D', 'bug': '#98c14d', 'normal': '#BBBBBB', 'ice': '#ADCFE2', 'fighting': '#E5A66E', 'flying': '#005E7C', 'psychic': '#D17BE2', 'rock': '#A9A87D', 'dark': '#333333', 'steel': '#B8B8D0'};
let startNumberOfPokemons = 20;
let currentIndex = 1;



async function fetchData() {
    for (let i = currentIndex; i < currentIndex + startNumberOfPokemons; i++) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        let data = await response.json();
        renderOverview(i, data);
    }
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

function generatePokemonsOverviewHtml(i, formattedPokemonID, capitalizedPokemonName, pokemonTypes, pokemonImage) {
    return /*html*/`
        <div class="pokemonOverview" id="pokemonOverview${i}" onclick="openDialog(${i})">
            <h5 class="pokemonIDOverview">${formattedPokemonID}</h5>
            <div class="pokemonOverviewBottom">
                <div>
                    <h4>${capitalizedPokemonName}</h4>
                    ${pokemonTypes}
                </div>
                <div>
                    <img src="${pokemonImage}">
                </div>
            </div>
        </div>
    `; 
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

function load20MorePokemons() {
    currentIndex += 20;    
    fetchData();
}











async function openDialog(i) {
    document.getElementById('dialogBG').style = 'display: unset';
    await fetchPokemonData(i);
}

function closeDialog() {
    document.getElementById('dialogBG').style = 'display: none';
}




let pokemonSpeciesData;
let pokemonData;

async function fetchPokemonData(i) {
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
    pokemonData = await response.json();
    let response2 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${i}`);
    pokemonSpeciesData = await response2.json();
    renderPokemonInfo();
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
    pokemonStats.innerHTML = generateAboutTabHtml(pokemonHeight, pokemonWeight) + generateBaseStatsTabHtml() + generateEvolutionTabHtml() + generateMovesTabHtml();
    renderPokemonSpecies();
    renderPokemonAbilities();
    renderPokemonGender();
    renderPokemonEggGroups();
    renderPokemonEggCycle();
    renderChart(2);
}

function generateAboutTabHtml(pokemonHeight, pokemonWeight) {
    return /*html*/`
        <table id="aboutContent">
            <tr>
                <td>Species</td>
                <td id="pokemonSpecies"></td>
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
                <td id="pokemonGender"></td>
            </tr>
            <tr>
                <td>Egg Groups</td>
                <td id="pokemonEggGroups"></td>
            </tr>
            <tr>
                <td>Egg Cycle</td>
                <td id="pokemonEggCycle"></td>
            </tr>
        </table>
    `;
}

function generateBaseStatsTabHtml() {
    let pokemonName = pokemonData['name'];
    let capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    return /*html*/`
        <div id="baseStatsContent" style="display: none">
            <div>
                <canvas id="myChart"></canvas>
            </div>
            <table>
                <th>Type defenses</th>
                <tr>
                    <td>The effectiveness of each type on ${capitalizedPokemonName}</td>
                </tr>
            </table>
        </div>
    `;
}

function generateEvolutionTabHtml() {
    return /*html*/`
        <div id="evolutionContent" style="display: none">Evolution</div>
    `;    
}

function generateMovesTabHtml() {
    return /*html*/`
        <div id="movesContent" style="display: none">Moves</div>
    `;    
}

function openPokemonStatsTab(tabID, contentID) {
    document.getElementById(tabID).classList.add('pokemonStatsNavBarHighlight');
    document.getElementById(contentID).style.display = 'unset';
    ['about', 'baseStats', 'evolution', 'moves'].forEach(tab => {
        if (tab !== tabID) {
            document.getElementById(tab).classList.remove('pokemonStatsNavBarHighlight');
            document.getElementById(tab + 'Content').style.display = 'none';
        }
    });
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

function renderPokemonEggCycle() {
    let pokemonEggCycle = pokemonData['types'][0]['type']['name'];
    let capitalizedPokemonEggCycle = pokemonEggCycle.charAt(0).toUpperCase() + pokemonEggCycle.slice(1);
    document.getElementById('pokemonEggCycle').innerHTML = capitalizedPokemonEggCycle;
}

function renderChart() {
    Chart.defaults.font.family = 'Montserrat';
    Chart.defaults.font.size = 13;
    let pokemonBaseStat = pokemonData['stats'];
    let ctx = document.getElementById('myChart');
    const customScaleFunction = (value, index, values) => {
        return pokemonBaseStat[index]['base_stat'];
    };
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HP', 'Attack', 'Defense', 'Sp. Atk', 'Sp. Def', 'Speed'],
            datasets: [{
                data: [pokemonBaseStat[0]['base_stat'], pokemonBaseStat[1]['base_stat'], pokemonBaseStat[2]['base_stat'], pokemonBaseStat[3]['base_stat'], pokemonBaseStat[4]['base_stat'], pokemonBaseStat[5]['base_stat'] ],
                backgroundColor: [
                    '#fb6d6d',
                    '#44be75',
                    '#fb6d6d',
                    '#44be75',
                    '#44be75',
                    '#fb6d6d'
                  ],
                borderWidth: 0,
                barPercentage: 0.2,
                borderSkipped: false,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    },
                    ticks: {
                        callback: customScaleFunction,
                        font: {
                            weight: 600
                        }
                    }
                },
                y2: {
                    beginAtZero: true,
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                }
            },
            plugins: {
                legend: {
                    display: false,
                    labels: {
                        font: {
                            family: undefined
                        }
                    }
                }
            }
        } 
    });
}







