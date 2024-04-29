document.addEventListener('DOMContentLoaded', function () {
    const irAIndexBtn = document.getElementById('irAIndexBtn');

    irAIndexBtn.addEventListener('click', function() {
        window.location.href = 'index.html';
    });

    const pokemonsVistos = JSON.parse(localStorage.getItem('pokemonsVistos')) || [];

    const listaPokemonsVistos = document.getElementById('listaPokemonsVistos');
    listaPokemonsVistos.innerHTML = ''; 

    pokemonsVistos.forEach((pokemon, index) => {
        const card = mostrarCardDetallada(pokemon, index);
        listaPokemonsVistos.appendChild(card); 
    });
});

function mostrarCardDetallada(pokemon, index) {
    const card = document.createElement('div');
    card.classList.add('card', 'mt-3', 'mb-3');
    card.innerHTML = `
        <div class="card-img-container"> <!-- Contenedor de la imagen con clase -->
            <img src="${pokemon.imageUrl}" class="card-img-top img-smaller" alt="${pokemon.name}"> <!-- Agrega la clase img-smaller -->
        </div>
        <div class="card-body">
            <h5 class="card-title">${pokemon.name}</h5>
            <p class="card-text">Tipo: ${pokemon.type}</p>
            <p class="card-text">Habilidades: ${pokemon.abilities.join(', ')}</p>
            <button class="btn btn-danger eliminar-pokemon" data-index="${index}">Eliminar</button>
        </div>
    `;
    return card;
}


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('eliminar-pokemon')) {
        const index = parseInt(event.target.dataset.index);
        eliminarPokemonDelHistorial(index);
        actualizarInterfaz();
    }
});

function eliminarPokemonDelHistorial(index) {
    const pokemonsVistos = JSON.parse(localStorage.getItem('pokemonsVistos')) || [];
    pokemonsVistos.splice(index, 1);
    localStorage.setItem('pokemonsVistos', JSON.stringify(pokemonsVistos)); 
}

function actualizarInterfaz() {
    const listaPokemonsVistos = document.getElementById('listaPokemonsVistos');
    listaPokemonsVistos.innerHTML = '';

    const pokemonsVistos = JSON.parse(localStorage.getItem('pokemonsVistos')) || [];
    pokemonsVistos.forEach((pokemon, index) => {
        const card = mostrarCardDetallada(pokemon, index); 
        listaPokemonsVistos.appendChild(card);
    });
}
