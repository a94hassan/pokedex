function renderChart() {
    Chart.defaults.font.family = 'Montserrat';
    Chart.defaults.font.size = 14;
    Chart.defaults.color = '#2c3641'; 
    let pokemonBaseStat = pokemonData['stats'];
    let ctx = document.getElementById('baseStatsChart');
    let customScaleFunction = (index) => {
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
                barPercentage: 0.15,
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
                    },
                    ticks: {
                        font: {
                            weight: 500
                        },
                        color: '#93979b'
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
            },
            aspectRatio: 1.5
        }
    });
}