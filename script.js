const botonesHeader = document.querySelectorAll(".btn-header");

async function recibirUrl(url){
    let response = await fetch(url)
    return response.json();
}

async function cargarPokemon(){

    const divPokemon = document.getElementById("listaPokemon");
    divPokemon.innerHTML = "";

    for(let x=1; x<=151; x++)
    { 
        let json = await recibirUrl('https://pokeapi.co/api/v2/pokemon/' + x);

    let nombre= json.name
    let habilidad = json.abilities[0].ability.name
    let hp = json.stats[0].base_stat
    let attack = json.stats[1].base_stat
    let defense = json.stats[2].base_stat
    let sped = json.stats[5].base_stat
    let id = json.id
    let idComplemento

    if(id.toString().length==1){
        idComplemento=` 00${id}`
    }
    if(id.toString().length==2){
        idComplemento=` 0${id}`
    }
    if(id.toString().length==3){
        idComplemento=` ${id}`
    }
    let tipos = json.types.map((type) => `<p class="${type.type.name} tipo"> ${type.type.name}</p>`)
    tipos = tipos.join('')
    let imagen = json.sprites.other["official-artwork"].front_default

    const pokemon = document.createElement("div");
    pokemon.classList.add("pokemon");

    pokemon.innerHTML=`
            <p class="idPokemon">#${idComplemento}</p><br> `+`
            <p class="nombre-pokemon">${nombre}</p><br> `+` 
            <div class="pokemon-imagen">
            <img src=${imagen}>
            </div>`+`
            <div class="pokemon-tipos">
            ${tipos}
            </div>
        `; 
        divPokemon.appendChild(pokemon);
    }   
}
cargarPokemon()