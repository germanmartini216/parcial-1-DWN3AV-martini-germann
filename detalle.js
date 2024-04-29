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
                    abilities: pokemonData.abilities.map(ability => ability.ability.name)
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

function mostrarCardDetallada(pokemon) {
    const card = document.createElement('div');
    card.classList.add('card', 'mt-5');
    card.innerHTML = `
        <img src="${pokemon.imageUrl}" class="card-img-top" alt="${pokemon.name}">
        <div class="card-body">
            <h3 class="card-title">${pokemon.name}</h3>
            <p class="card-text">Tipo: ${pokemon.type}</p>
            <p class="card-text">Habilidades: ${pokemon.abilities.join(', ')}</p>
            <button class="btn btn-primary" id="volverIndex">Volver al Index</button>
        </div>
    `;
    return card;
}

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get('id');

    fetchPokemon(pokemonName).then(pokemon => {
        if (pokemon) {
            const mostradita = document.getElementById('pokemonDetails');
            const cardDetallada = mostrarCardDetallada(pokemon);
            mostradita.appendChild(cardDetallada);
            
            const pokemonsVistos = JSON.parse(localStorage.getItem('pokemonsVistos')) || [];
            pokemonsVistos.push(pokemon);
            localStorage.setItem('pokemonsVistos', JSON.stringify(pokemonsVistos));

            const volverIndexBtn = document.getElementById('volverIndex');
            volverIndexBtn.addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const verHistorialBtn = document.getElementById('verHistorialBtn');

    verHistorialBtn.addEventListener('click', function() {
        window.location.href = 'historial.html';
    });
});
