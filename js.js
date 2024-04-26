function fetch_Pokemon(pokemonId) {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
      .then(resultado => {
        if (!resultado.ok) {
          const mensaje = (`Error al conseguir datos del Pokemon ${pokemonId}`);
          mensaje();
          return null;
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
  
  
  document.addEventListener('DOMContentLoaded', function () {
    function fetch_Pokemon(pokemonId) {
        return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then(resultado => {
                if (!resultado.ok) {
                    return null;
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
  
    function crear_card_Pokemon(pokemon) {
        const card = `
            <div class="col-md-4 mb-4">
                <div class="card">
                    <img src="${pokemon.imageUrl}" class="card-img-top" alt="${pokemon.name}">
                    <div class="card-body">
                        <h5 class="card-title">${pokemon.name}</h5>
                        <button class="btn btn-primary btn-sm btn-details" data-name="${pokemon.name}">Ver detalles</button>
                    </div>
                </div>
            </div>
        `;
        return card;
    }
  
    const mostradita = document.getElementById('pokemonRow');
  
    for (let poke = 1; poke <= 100; poke++) {
        fetch_Pokemon(poke).then(pokemon => {
            if (pokemon) {
                const card2 = crear_card_Pokemon(pokemon);
                mostradita.innerHTML += card2;
            }
        });
    }
  
    mostradita.addEventListener('click', function (event) {
        if (event.target.classList.contains('btn-details')) {
            const pokemonName = event.target.dataset.name;
            fetch_Pokemon(pokemonName).then(pokemon => {
                if (pokemon) {
                    mostrar_modal(pokemon);
                    $('#pokemonModal').modal('show');
                }
            });
        }
    });
  }); 
  
  
  
  