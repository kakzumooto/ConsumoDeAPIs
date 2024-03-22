window.onload = llenarSelect

function iniciar(){
    let boton = document.getElementById("btnCargar")
    boton = addEventListener("click",clickBoton)

}

async function recibirUrl(url){
    let response = await fetch(url)
    return response.json();
}

async function llenarSelect(){
    let selectPokemon = document.getElementById("selectPokemon")
    let opciones = "";
    for(let x=1; x<=150; x++)
    {
        let json= await recibirUrl('https://pokeapi.co/api/v2/pokemon/' + x)  
        opciones += `<option>${json.name}</option>`;       
    }
    selectPokemon.innerHTML= opciones
   iniciar()
}



async function clickBoton () { 

    let seleccionPokemon = document.getElementById("selectPokemon").value
        console.log(seleccionPokemon)
    
    
let json= await recibirUrl('https://pokeapi.co/api/v2/pokemon/'+ seleccionPokemon)
let divPokemon = document.getElementById("imagenPokemon")
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


divPokemon.innerHTML=` 
                    <p>#${idComplemento}</p><br> `+`
                    <p>Nombre: ${nombre}</p><br> `+` 
                    <p>Habilidad: ${habilidad}</p><br>`+`
                    <p>HP: ${hp}</p><br>`+`
                    <p>attack: ${attack}</p><br>`+`
                    <p>defense: ${defense}</p><br>`+`
                    <p>sped: ${sped}</p><br>`+`
                    <div class="pokemon-tipos">
                    ${tipos}
                    </div>
                    <img src=${imagen}>
                    `

}




