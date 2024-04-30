function fetchPokemon(pokemonId) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then(resultado => {
            if (!resultado.ok) {
                throw new Error(`Error al conseguir datos del Pokemon ${pokemonId}`);
            }
            return resultado.json();
        })
        .then(pokemonData => {
            if (pokemonData) {
                return {
                    name: pokemonData.name,
                    type: pokemonData.types.map(type => type.type.name).join(', '),
                    imageUrl: pokemonData.sprites.other['official-artwork'].front_default,
                };
            } else {
                return null;
            }
        })
        .catch(error => {
            console.error(error);
            return null;
        });
}

function crearCardPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('col-md-4', 'mb-4');
    card.innerHTML = `
        <div class="card">
            <img src="${pokemon.imageUrl}" class="card-img-top" alt="${pokemon.name}">
            <div class="card-body">
                <h3 class="card-title">${pokemon.name}</h3>
                <a href="detalle.html?id=${pokemon.name}" class="btn btn-primary btn-sm">Ver detalles</a>
            </div>
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', function () {
    const mostradita = document.getElementById('pokemonRow');

    for (let poke = 1; poke <= 100; poke++) {
        fetchPokemon(poke).then(pokemon => {
            if (pokemon) {
                const card2 = crearCardPokemon(pokemon);
                mostradita.appendChild(card2);
            }
        });
    }
});


document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const searchResults = document.getElementById('searchResults');

    searchButton.addEventListener('click', function () {
        const buscartermino = searchInput.value.toLowerCase().trim();

        if (buscartermino.length === 0) {
            searchResults.innerHTML = '';
            return;
        }

        searchResults.innerHTML = 'Buscando...';

        searchPokemon(buscartermino).then(results => {
            displaySearchResults(results);
        }).catch(error => {
            console.error('Error al buscar Pokémon:', error);
            searchResults.innerHTML = 'Error al buscar Pokémon, intentalo de nuevo';
        });
    });

    function searchPokemon(buscartermino) {
        const results = [];

        const promises = [];
        for (let poke = 1; poke <= 100; poke++) {
            const promise = fetchPokemon(poke).then(pokemon => {
                if (pokemon && pokemon.name.toLowerCase().includes(buscartermino)) {
                    results.push(pokemon);
                }
            });
            promises.push(promise);
        }

        return Promise.all(promises).then(() => results);
    }

    function displaySearchResults(results) {
        if (results.length === 0) {
            searchResults.innerHTML = 'No se encontraron Pokémon.';
            return;
        }

        const resultList = results.map(pokemon => {
            return `
                <div class="search-result" data-pokemon-name="${pokemon.name}">
                    <img src="${pokemon.imageUrl}" alt="${pokemon.name}">
                    <span>${pokemon.name}</span>
                </div>
            `;
        }).join('');

        searchResults.innerHTML = resultList;

        const searchResultItems = document.querySelectorAll('.search-result');
        searchResultItems.forEach(item => {
            item.addEventListener('click', function () {
                const pokemonName = item.dataset.pokemonName;
                window.location.href = `detalle.html?id=${pokemonName}`;
            });
        });
    }
});
