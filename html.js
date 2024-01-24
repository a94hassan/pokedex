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

function generateAboutTabHtml() {
    return /*html*/`
        <div id="aboutContent">
            <p id="pokemonFlavorText"></p>
            <table>
                <th>General</th>
                <tr>
                    <td>Name</td>
                    <td id="pokemonAboutName"></td>
                </tr>
                <tr>
                    <td>ID</td>
                    <td id="pokemonAboutID"></td>
                </tr>
                <tr>
                    <td>Type(s)</td>
                    <td id="pokemonAboutType"></td>
                </tr>
                <tr>
                    <td>Habitat</td>
                    <td id="pokemonAboutHabitat"></td>
                </tr>
                <tr>
                    <td>Pokedex Color</td>
                    <td id="pokemonAboutPokedexColor"></td>
                </tr>
            </table>
        </div>
    `;
}

function generateBaseStatsTabHtml() {
    return /*html*/`
        <div id="baseStatsContent" style="display: none">
            <canvas id="baseStatsChart"></canvas>
        </div>
    `;
}

function generateFormTabHtml(pokemonHeight, pokemonWeight) {
    return /*html*/`
        <div id="formContent" style="display: none">
            <table>
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
                <tr>
                    <td>Shape</td>
                    <td id="pokemonShape"></td>
                </tr>
                <tr>
                    <td>Shiny</td>
                    <td id="pokemonShiny"></td>
                </tr>
            </table>
        </div>
    `;    
}

function generateTrainingTabHtml() {
    return /*html*/`
        <table id="trainingContent" style="display: none">

            <tr>
                <td>Base Friendship</td>
                <td id="pokemonFriendship"></td>
            </tr>
            <tr>
                <td>Base Experience</td>
                <td id="pokemonExperience"></td>
            </tr>
            <tr>
                <td>Catch Rate</td>
                <td id="pokemonCatchRate"></td>
            </tr>            
            <tr>
                <td>Leveling Rate</td>
                <td id="pokemonLevelingRate"></td>
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
                <td>Hatch Time</td>
                <td id="pokemonHatchTime"></td>
            </tr>
        </table>
    `;    
}