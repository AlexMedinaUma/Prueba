function mostrar(id){
    fetch('https://api.ambr.top/v2/en/avatar/' + id)
    .then(personaje => personaje.json()) // Indicamos el formato de salida de los datos
    .then(personaje =>{
        console.log(personaje);
        
    })
}

mostrar();