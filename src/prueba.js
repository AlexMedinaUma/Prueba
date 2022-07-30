const grid = document.querySelector('#grid-personajes');
const content = document.getElementById('content');
const arrayElemento = [];
const arrayWeapon = [];
const elementos = ['Electric','Grass','Wind','Fire','Water','Rock','Ice'];
const weapons = ["WEAPON_SWORD_ONE_HAND","WEAPON_CATALYST","WEAPON_CLAYMORE","WEAPON_BOW","WEAPON_POLE"];

function cargarPersonajes(){
    //fetch('https://api.ambr.top/v2/en/avatar')
    fetch('https://api.ambr.top/v2/en/avatar')
        .then(personajes => personajes.json()) // Indicamos el formato de salida de los datos
        .then(personajes =>{
            var personajesArr = Object.entries(personajes.data.items);
            var personajesSorted = personajesArr.sort((a,b) => a[1].name > b[1].name ? 1 : b[1].name > a[1].name ? -1 : 0);

            cargar(personajesSorted);
            
        }) // 
}
function filtrar(element,weapon){
    
    vaciar();
    
    if(element !== undefined){

        let stringElement = element + '-icon';
        const botonElement = document.getElementById(stringElement);

        if(!arrayElemento.includes(element)){
            arrayElemento.push(element);
            botonElement.className = "p-1 bg-slate-500 hover:bg-slate-400 rounded-xl transition duration-300";
        }else{
            let i = arrayElemento.indexOf(element);
            arrayElemento.splice(i,1);
            botonElement.className = "p-1 hover:bg-slate-500 rounded-xl transition duration-300";
        }
    }else{

        let stringWeapon = weapon + '-icon';
        const botonWeapon = document.getElementById(stringWeapon);

        if(!arrayWeapon.includes(weapon)){
            arrayWeapon.push(weapon);
            botonWeapon.className = "p-1 bg-slate-500 hover:bg-slate-400 rounded-xl transition duration-300";
        }else{
            let i = arrayWeapon.indexOf(weapon);
            arrayWeapon.splice(i,1);
            botonWeapon.className = "p-1 hover:bg-slate-500 rounded-xl transition duration-300";
        }
    }
    
    
    
    fetch('https://api.ambr.top/v2/en/avatar')
        .then(personajes => personajes.json()) // Indicamos el formato de salida de los datos
        .then(personajes =>{
            var personajesArr = Object.entries(personajes.data.items);
            var personajesSorted = personajesArr.sort((a,b) => a[1].name > b[1].name ? 1 : b[1].name > a[1].name ? -1 : 0);
            if(arrayElemento.length > 0 && arrayWeapon.length > 0){
                personajesSorted = personajesSorted.filter(p => arrayElemento.includes(p[1].element) && arrayWeapon.includes(p[1].weaponType));
            }else if(arrayElemento.length > 0 && arrayWeapon.length == 0){
                personajesSorted = personajesSorted.filter(p => arrayElemento.includes(p[1].element));
            }else if(arrayElemento.length == 0 && arrayWeapon.length > 0){
                personajesSorted = personajesSorted.filter(p => arrayWeapon.includes(p[1].weaponType));
            }
            
            cargar(personajesSorted);
            
        }) 
    
}

function filtrarNombre(){
    vaciar();
    vaciarBotones();
    let x = document.getElementById("search").value;
    fetch('https://api.ambr.top/v2/en/avatar')
    .then(personajes => personajes.json()) // Indicamos el formato de salida de los datos
    .then(personajes =>{
        var personajesArr = Object.entries(personajes.data.items);
        var personajesSorted = personajesArr.sort((a,b) => a[1].name > b[1].name ? 1 : b[1].name > a[1].name ? -1 : 0);

        personajesSorted = personajesSorted.filter(p => p[1].name.toLowerCase().includes(x.toLowerCase()));
        cargar(personajesSorted);
        
    }) // 
}
function vaciar(){
    grid.innerHTML = '';
}

function vaciarBotones(){
    elementos.forEach(e =>{
        let sElement = e + '-icon';
        const bElement = document.getElementById(sElement);
        let i = arrayElemento.indexOf(e);
        arrayElemento.splice(i,1);
        bElement.className = "p-1 hover:bg-slate-500 rounded-xl transition duration-300";
    });
    weapons.forEach(w =>{
        let sWeapon = w + '-icon';
        const bWeapon = document.getElementById(sWeapon);
        let i = arrayWeapon.indexOf(w);
        arrayWeapon.splice(i,1);
        bWeapon.className = "p-1 hover:bg-slate-500 rounded-xl transition duration-300";
    });
}

function cargar(array){
    array.forEach(item =>{
        const div = document.createElement('div');
        div.id
        div.innerHTML += `
        <button type="button" onclick="prueba(${item[1].id})" >
        <div class="w-40 transform rounded-xl shadow-2xl transition duration-300 hover:scale-105">
        <div class="relative">
            <img class="rounded-xl rounded-b-none bg-slate-700" src="https://api.ambr.top/assets/UI/${item[1].icon}.png" />
            <div class="inset-y-50 absolute top-0">
                <img class="mx-auto h-11" src="https://api.ambr.top/assets/UI/UI_Buff_Element_${item[1].element}.png" />
            </div>
            <div class="absolute inset-x-0 bottom-0 bg-black bg-opacity-40">
                <img class="mx-auto h-11" src="/img/${item[1].rank}-Star.png"/>
            </div>
            </div>
            <div class="px-2 bg-yellow-50 rounded-b-lg h-16 flex items-center justify-center">
                <div class="text-center text-xl font-bold text-gray-800">${item[1].name}</div>
            </div>
        </div>
    </div>
    </button>
            
        `;
        
        grid.appendChild(div);
    });
}
cargarPersonajes();



function prueba(id){
    content.innerHTML = '';

    fetch('https://api.ambr.top/v2/en/avatar/' + id)
    .then(personaje => personaje.json()) // Indicamos el formato de salida de los datos
    .then(personaje =>{
       console.log(personaje)
       const div = document.createElement('div');
       console.log(personaje.data.talent[0]);
       div.id
       div.innerHTML += `
       <div class="container flex flex-wrap mx-auto mt-20 shadow-lg bg-[url('https://api.ambr.top/assets/UI/namecard/UI_NameCardPic_${personaje.data.icon.substring(14)}_P.png')] h-60 bg-cover bg-center" >
       <div class="flex flex-wrap w-60">
           <img src="https://api.ambr.top/assets/UI/${personaje.data.icon}.png" />
       </div>
   </div>
   <div class="container grid grid-cols-7 mx-auto shadow-lg bg-slate-700 h-11 text-white text-lg text-center" >
   
        <button onClick="document.getElementById('divGeneral').scrollIntoView();">
            <div class="hover:bg-slate-500 py-2 rounded-sm transition duration-300 ">
                General
            </div>
        </button>
       
        <button onClick="document.getElementById('divTalentos').scrollIntoView();">
            <div class="hover:bg-slate-500 py-2 rounded-sm transition duration-300 ">
                Talents
            </div>
        </button>

       <button onClick="document.getElementById('divUTalentos').scrollIntoView();">
            <div class="hover:bg-slate-500 py-2 rounded-sm transition duration-300 ">
                Talents Upgrade
            </div>
        </button>

        <button onClick="document.getElementById('divPTalentos').scrollIntoView();">
            <div class="hover:bg-slate-500 py-2 rounded-sm transition duration-300 ">
                Passive Talents
            </div>
        </button>

        <button onClick="document.getElementById('divConstelacion').scrollIntoView();">
            <div class="hover:bg-slate-500 py-2 rounded-sm transition duration-300 ">
                Constellations
            </div>
        </button>

       <div class="hover:bg-slate-500  py-2 rounded-sm transition duration-300">
           Build
       </div>
       <div class="hover:bg-slate-500 py-2 rounded-sm transition duration-300">
           Teams
       </div>
   </div>

   <div class="container grid grid-cols-2 mx-auto  mt-4 justify-items-around gap-4" id="divGeneral">
       
       <div class="overflow-x-auto">
           <table class="w-full text-sm text-slate-700 dark:text-gray-400 text-center shadow-lg" id="tablaStats">
               <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400" id="headStats">
                   
               </thead>

           </table>
       </div>
       <div class="overflow-x-auto">
           <table class=" overflow-y-auto w-full h-fit text-sm text-left text-slate-700 dark:text-gray-400 text-center shadow-lg ">
               <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400" >
                   <tr>
                       <th scope="col" class="py-3 px-6 text-white">
                           RANK
                       </th>
                       <th scope="col" class="py-3 px-6 text-white">
                           Lv
                       </th>
                       <th scope="col" class="py-3 px-6 text-white">
                           Cost
                       </th>
                       <th scope="col" class="py-3 px-6 text-white">
                           Mat 1
                       </th>
                       <th scope="col" class="py-3 px-6 text-white">
                           Mat 2
                       </th>
                       <th scope="col" class="py-3 px-6 text-white">
                           Mat 3
                       </th>
                       <th scope="col" class="py-3 px-6 text-white">
                           Mat 4
                       </th>
                   </tr>
               </thead>
               <tbody>
               
                <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${personaje.data.upgrade.promote[1].promoteLevel}
                    </th>
                    <td class="py-4 px-6">
                        ${personaje.data.upgrade.promote[0].unlockMaxLevel}
                    </td>
                    <td class="py-4 px-6">
                        ${personaje.data.upgrade.promote[1].coinCost}
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[1].costItems)[0]}.png" />
                                <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                ${Object.values(personaje.data.upgrade.promote[1].costItems)[0]}
                                </div>  
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[1].costItems)[1]}.png" />
                                <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                ${Object.values(personaje.data.upgrade.promote[1].costItems)[1]}
                                </div>  
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[1].costItems)[2]}.png" />
                                <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                ${Object.values(personaje.data.upgrade.promote[1].costItems)[2]}
                                </div>  
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                 
                            </div>
                        </div>
                    </td>
                </tr>
                        <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                        <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            ${personaje.data.upgrade.promote[2].promoteLevel}
                        </th>
                        <td class="py-4 px-6">
                            ${personaje.data.upgrade.promote[1].unlockMaxLevel}
                        </td>
                        <td class="py-4 px-6">
                            ${personaje.data.upgrade.promote[2].coinCost}
                        </td>
                        <td class="py-4 px-6">
                            <div class="w-20 rounded-xl shadow-2xl">
                                <div class="relative">
                                    <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[2].costItems)[0]}.png" />
                                    <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                    ${Object.values(personaje.data.upgrade.promote[2].costItems)[0]}
                                    </div>  
                                </div>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="w-20 rounded-xl shadow-2xl">
                                <div class="relative">
                                    <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[2].costItems)[1]}.png" />
                                    <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                    ${Object.values(personaje.data.upgrade.promote[2].costItems)[1]}
                                    </div>  
                                </div>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="w-20 rounded-xl shadow-2xl">
                                <div class="relative">
                                    <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[2].costItems)[2]}.png" />
                                    <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                    ${Object.values(personaje.data.upgrade.promote[2].costItems)[2]}
                                    </div>  
                                </div>
                            </div>
                        </td>
                        <td class="py-4 px-6">
                            <div class="w-20 rounded-xl shadow-2xl">
                                <div class="relative">
                                    <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[2].costItems)[3]}.png" />
                                    <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                    ${Object.values(personaje.data.upgrade.promote[2].costItems)[3]}
                                    </div>  
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${personaje.data.upgrade.promote[3].promoteLevel}
                    </th>
                    <td class="py-4 px-6">
                        ${personaje.data.upgrade.promote[2].unlockMaxLevel}
                    </td>
                    <td class="py-4 px-6">
                        ${personaje.data.upgrade.promote[3].coinCost}
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[3].costItems)[0]}.png" />
                                <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                ${Object.values(personaje.data.upgrade.promote[3].costItems)[0]}
                                </div>  
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[3].costItems)[1]}.png" />
                                <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                ${Object.values(personaje.data.upgrade.promote[3].costItems)[1]}
                                </div>  
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[3].costItems)[2]}.png" />
                                <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                ${Object.values(personaje.data.upgrade.promote[3].costItems)[2]}
                                </div>  
                            </div>
                        </div>
                    </td>
                    <td class="py-4 px-6">
                        <div class="w-20 rounded-xl shadow-2xl">
                            <div class="relative">
                                <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[3].costItems)[3]}.png" />
                                <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                ${Object.values(personaje.data.upgrade.promote[3].costItems)[3]}
                                </div>  
                            </div>
                        </div>
                    </td>
                </tr>
                <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    ${personaje.data.upgrade.promote[4].promoteLevel}
                </th>
                <td class="py-4 px-6">
                    ${personaje.data.upgrade.promote[3].unlockMaxLevel}
                </td>
                <td class="py-4 px-6">
                    ${personaje.data.upgrade.promote[4].coinCost}
                </td>
                <td class="py-4 px-6">
                    <div class="w-20 rounded-xl shadow-2xl">
                        <div class="relative">
                            <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[4].costItems)[0]}.png" />
                            <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                            ${Object.values(personaje.data.upgrade.promote[4].costItems)[0]}
                            </div>  
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <div class="w-20 rounded-xl shadow-2xl">
                        <div class="relative">
                            <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[4].costItems)[1]}.png" />
                            <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                            ${Object.values(personaje.data.upgrade.promote[4].costItems)[1]}
                            </div>  
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <div class="w-20 rounded-xl shadow-2xl">
                        <div class="relative">
                            <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[4].costItems)[2]}.png" />
                            <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                            ${Object.values(personaje.data.upgrade.promote[4].costItems)[2]}
                            </div>  
                        </div>
                    </div>
                </td>
                <td class="py-4 px-6">
                    <div class="w-20 rounded-xl shadow-2xl">
                        <div class="relative">
                            <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[4].costItems)[3]}.png" />
                            <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                            ${Object.values(personaje.data.upgrade.promote[4].costItems)[3]}
                            </div>  
                        </div>
                    </div>
                </td>
            </tr>
            <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${personaje.data.upgrade.promote[5].promoteLevel}
            </th>
            <td class="py-4 px-6">
                ${personaje.data.upgrade.promote[4].unlockMaxLevel}
            </td>
            <td class="py-4 px-6">
                ${personaje.data.upgrade.promote[5].coinCost}
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[5].costItems)[0]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[5].costItems)[0]}
                        </div>  
                    </div>
                </div>
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[5].costItems)[1]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[5].costItems)[1]}
                        </div>  
                    </div>
                </div>
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[5].costItems)[2]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[5].costItems)[2]}
                        </div>  
                    </div>
                </div>
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[5].costItems)[3]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[5].costItems)[3]}
                        </div>  
                    </div>
                </div>
            </td>
        </tr>
        <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${personaje.data.upgrade.promote[6].promoteLevel}
            </th>
            <td class="py-4 px-6">
                ${personaje.data.upgrade.promote[5].unlockMaxLevel}
            </td>
            <td class="py-4 px-6">
                ${personaje.data.upgrade.promote[6].coinCost}
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[6].costItems)[0]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[6].costItems)[0]}
                        </div>  
                    </div>
                </div>
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[6].costItems)[1]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[6].costItems)[1]}
                        </div>  
                    </div>
                </div>
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[6].costItems)[2]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[6].costItems)[2]}
                        </div>  
                    </div>
                </div>
            </td>
            <td class="py-4 px-6">
                <div class="w-20 rounded-xl shadow-2xl">
                    <div class="relative">
                        <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${Object.keys(personaje.data.upgrade.promote[6].costItems)[3]}.png" />
                        <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                        ${Object.values(personaje.data.upgrade.promote[6].costItems)[3]}
                        </div>  
                    </div>
                </div>
            </td>
        </tr>
               </tbody>
           </table>
       </div>
   </div>
   <div class="container mx-auto text-3xl text-white mt-3" id="divTalentos">
       Talents
   </div>
   <div>
       <div>
           <div class="container mx-auto bg-slate-700 mt-4 justify-items-center items-center">
               <div class="container mx-auto text-xl text-white px-5 py-2 inline-block">
                   ${personaje.data.talent[0].name}
               </div>
           </div>
           <div class="container grid grid-cols-8 mx-auto bg-slate-800 justify-items-center items-center">
               <div class="">
                   <img src="https://api.ambr.top/assets/UI/${personaje.data.talent[0].icon}.png">
               </div>
               <div class="pr-5 col-span-7 text-gray-300 py-5">
                 ${personaje.data.talent[0].description}
               </div>
               <div class="col-span-8  justify-items-center w-11/12 mb-10 mt-5">
                   <table class="overflow-x-auto w-full text-sm text-slate-700 dark:text-gray-400 text-center shadow-lg border-slate-700 border" id="tablaTalentoAtaque">
                       <thead class="text-xs uppercase bg-gray-50 dark:bg-slate-900 dark:text-gray-400">
                           <tr>
                               <th scope="col" class="py-3 text-white">
                                   
                               </th>
                               <th scope="col" class="py-3 text-white">
                                  Lv1
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv2
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv3
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv4
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv5
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv6
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv7
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv8
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv9
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv10
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv11
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv12
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv13
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv14
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv15
                               </th>
                           </tr>
                       </thead>
                   </table>
               </div>
           </div>
       </div>
       <div>
           <div class="container mx-auto bg-slate-700 mt-4 justify-items-center items-center">
               <div class="container mx-auto text-xl text-white px-5 py-2 inline-block">
                   ${personaje.data.talent[1].name}
               </div>
           </div>
           <div class="container grid grid-cols-8 mx-auto bg-slate-800 justify-items-center items-center">
               <div class="">
                   <img src="https://api.ambr.top/assets/UI/${personaje.data.talent[1].icon}.png">
               </div>
               <div class="pr-5 col-span-7 text-gray-300 py-5">
                 ${personaje.data.talent[1].description}
               </div>
               <div class="col-span-8 justify-items-center w-11/12 mb-10 mt-5">
                   <table class="overflow-x-auto w-full text-sm text-slate-700 dark:text-gray-400 text-center shadow-lg border-slate-700 border" id="tablaTalentoElemental">
                       <thead class="text-xs uppercase bg-gray-50 dark:bg-slate-900 dark:text-gray-400">
                           <tr>
                               <th scope="col" class="py-3 px-3 text-white">
                                   
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                  Lv1
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv2
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv3
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv4
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv5
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv6
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv7
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv8
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv9
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv10
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv11
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv12
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv13
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv14
                               </th>
                               <th scope="col" class="py-3 px-3 text-white">
                                   Lv15
                               </th>
                           </tr>
                       </thead>
                   </table>
               </div>
           </div>
       </div>
       <div>
           <div class="container mx-auto bg-slate-700 mt-4 justify-items-center items-center">
               <div class="container mx-auto text-xl text-white px-5 py-2 inline-block">
                   ${personaje.data.talent[2] == undefined ? personaje.data.talent[3].name : personaje.data.talent[4].name}
               </div>
           </div>
           <div class="container grid grid-cols-8 mx-auto bg-slate-800 justify-items-center items-center">
               <div class="">
                   <img src="https://api.ambr.top/assets/UI/${personaje.data.talent[2] == undefined ? personaje.data.talent[3].icon : personaje.data.talent[4].icon}.png">
               </div>
               <div class="pr-5 col-span-7 text-gray-300 py-5">
                 ${personaje.data.talent[2] == undefined ? personaje.data.talent[3].description : personaje.data.talent[4].description}
               </div>
               <div class="col-span-8  justify-items-center w-11/12 mb-10 mt-5">
                   <table class="overflow-x-auto w-full text-sm text-slate-700 dark:text-gray-400 text-center shadow-lg border-slate-700 border" id="tablaTalentoBurst">
                       <thead class="text-xs uppercase bg-gray-50 dark:bg-slate-900 dark:text-gray-400">
                           <tr>
                               <th scope="col" class="py-3 text-white">
                                   
                               </th>
                               <th scope="col" class="py-3 text-white">
                                  Lv1
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv2
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv3
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv4
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv5
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv6
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv7
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv8
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv9
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv10
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv11
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv12
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv13
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv14
                               </th>
                               <th scope="col" class="py-3 text-white">
                                   Lv15
                               </th>
                           </tr>
                       </thead>
                   </table>
               </div>
           </div>
       </div>
   <div>
       <div class="container mx-auto text-3xl text-white mt-5" id="divUTalentos">
           Talents Upgrade
       </div>
       <div class="container mx-auto mt-3">
           <div class="overflow-x-auto">
               <table class="w-full text-sm text-slate-700 dark:text-gray-400 text-center shadow-lg" id="tablaMejoraTalento">
                   <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-slate-700 dark:text-gray-400">
                       <tr>
                           <th scope="col" class="py-3 px-6 text-white">
                               Lv
                           </th>
                           <th scope="col" class="py-3 px-6 text-white">
                               Materials
                           </th>
                       </tr>
                   </thead>
                   
               </table>
           </div>
       </div>
   </div>

   <div>
       <div class="container mx-auto text-3xl text-white mt-5" id="divPTalentos">
           Passive Talents
       </div>
       <div class="container mx-auto grid grid-cols-3 mt-5 justify-items-center gap-3">
           <div class="container mx-auto bg-slate-800 items-stretch p-5 grid grid-cols-5">
               <div class="pr-5">
                   <img src="https://api.ambr.top/assets/UI/${personaje.data.talent[2] == undefined ? personaje.data.talent[4].icon : personaje.data.talent[4].icon}.png">
               </div>
               <div class="col-span-4">
                   <div class="text-white text-xl pb-3">${personaje.data.talent[2] == undefined ? personaje.data.talent[4].name : personaje.data.talent[4].name}</div>
                   <div class="text-gray-300">${personaje.data.talent[2] == undefined ? personaje.data.talent[4].description : personaje.data.talent[4].description}</div>
               </div>
           </div>
           <div class="container mx-auto bg-slate-800  items-stretch p-5 grid grid-cols-5">
               <div class="pr-5">
                   <img src="https://api.ambr.top/assets/UI/${personaje.data.talent[2] == undefined ? personaje.data.talent[5].icon : personaje.data.talent[6].icon}.png">
               </div>
               <div class="col-span-4">
                   <div class="text-white text-xl pb-3">${personaje.data.talent[2] == undefined ? personaje.data.talent[5].name : personaje.data.talent[6].name}</div>
                   <div class="text-gray-300">${personaje.data.talent[2] == undefined ? personaje.data.talent[5].description : personaje.data.talent[6].description}</div>
               </div>
           </div>
           <div class="container mx-auto bg-slate-800  items-stretch p-5 grid grid-cols-5">
               <div class="pr-5">
                   <img src="https://api.ambr.top/assets/UI/${personaje.data.talent[2] == undefined ? personaje.data.talent[6].icon : personaje.data.talent[7].icon}.png">
               </div>
               <div class="col-span-4">
                   <div class="text-white text-xl pb-3">${personaje.data.talent[2] == undefined ? personaje.data.talent[6].name : personaje.data.talent[7].name}</div>
                   <div class="text-gray-300">${personaje.data.talent[2] == undefined ? personaje.data.talent[6].description : personaje.data.talent[7].description}</div>
               </div>
           </div>
   
       </div>
   </div>
   <div>
       <div class="container mx-auto text-3xl text-white mt-5" id="divConstelacion">
           Constellations
       </div>
       <div class="container mx-auto grid grid-cols-1 mt-5 justify-items-center gap-3" id="constelacion">
           
       </div>
   </div>
   <div class="m-10">
       
   </div>
           
       `;
       content.appendChild(div);
       rellenarTalentoAtaque(personaje);
       rellenarTalentoElemental(personaje);
       rellenarTalentoBurst(personaje);
       rellenarStats(personaje);
       rellenarMejoraTalentos(personaje);
       rellenarConstelacion(personaje)
    })
}
function rellenarConstelacion(personaje){
    

    let constelaciones = Object.entries(personaje.data.constellation);
    let stringCons;
    constelaciones.forEach(x => {
        const div = document.createElement('div');
        stringCons = `
                <div class="pr-5">
                    <img src="https://api.ambr.top/assets/UI/${x[1].icon}.png">
                </div>
                <div class="col-span-10">
                    <div class="text-white text-xl pb-3">${x[1].name}</div>
                    <div class="text-gray-300">${x[1].description}</div>
                </div>
        `; 
        div.className = "container bg-slate-800 items-center p-5 grid grid-cols-12 w-full"
        div.innerHTML = stringCons;
        document.getElementById('constelacion').append(div);
    })
    
}
function rellenarStats(personaje){
    fetch('https://api.ambr.top/v2/static/avatarCurve?vh=28R6')
    .then(datos => datos.json()) // Indicamos el formato de salida de los datos
    .then(datos =>{
        let curvaNivel = Object.entries(datos.data);
        const tbodyStat = document.createElement('tbody');
        const tr = document.createElement('tr');

        let hp = personaje.data.upgrade.prop[0].initValue;
        let hpType = personaje.data.upgrade.prop[0].type;
        let atk = personaje.data.upgrade.prop[1].initValue;
        let atkType = personaje.data.upgrade.prop[1].type;
        let def = personaje.data.upgrade.prop[2].initValue;
        let defType = personaje.data.upgrade.prop[2].type;
        let critRate = 0.05;
        let critDmg = 0.5;
        let bonus = 0;

        let atributoEspecial = Object.keys(personaje.data.upgrade.promote[1].addProps)[3];

        let niveles = personaje.data.upgrade.promote;

        let primeraFila = `
            <th scope="col" class="py-3 px-6 text-white">
                Lv
            </th>
            <th scope="col" class="py-3 px-6 text-white">
                Base HP
            </th>
            <th scope="col" class="py-3 px-6 text-white">
                Base ATK
            </th>
            <th scope="col" class="py-3 px-6 text-white">
                Base DEF
            </th>
            `;
            if(atributoEspecial != "FIGHT_PROP_CRITICAL_HURT" && atributoEspecial != "FIGHT_PROP_CRITICAL"){
                
                if(atributoEspecial.includes("PHYSICAL")){
                    
                    primeraFila += `
                        <th scope="col" class="py-3 px-6 text-white">
                            Physical DMG Bonus
                        </th>
                    `;
                }else if(atributoEspecial.includes("DEFENSE")){
                    
                    primeraFila += `
                    <th scope="col" class="py-3 px-6 text-white">
                        DEF
                    </th>
                `;
                }else if(atributoEspecial.includes("HEAL")){
                    
                    primeraFila += `
                        <th scope="col" class="py-3 px-6 text-white">
                            Healing Bonus
                        </th>
                    `;
                }else if(atributoEspecial.includes("MASTERY")){
                    
                    primeraFila += `
                        <th scope="col" class="py-3 px-6 text-white">
                            Elementary Mastery
                        </th>
                    `;
                }else if(atributoEspecial.includes("ATTACK")){
                    
                    primeraFila += `
                        <th scope="col" class="py-3 px-6 text-white">
                            ATK
                        </th>
                    `;
                }else if(atributoEspecial.includes("HP")){
                    
                    primeraFila += `
                        <th scope="col" class="py-3 px-6 text-white">
                            HP
                        </th>
                    `;
                }else if(atributoEspecial.includes("CHARGE")){
                    
                    primeraFila += `
                        <th scope="col" class="py-3 px-6 text-white">
                            Energy Recharge
                        </th>
                    `;
                }else if(atributoEspecial.includes("HURT")){
                    
                    let elementoPersonaje;
                    if(personaje.data.element == "Ice"){
                        elementoPersonaje = "Cryo";
                    }else if(personaje.data.element == "Fire"){
                        elementoPersonaje = "Pyro";
                    }else if(personaje.data.element == "Wind"){
                        elementoPersonaje = "Anemo";
                    }else if(personaje.data.element == "Water"){
                        elementoPersonaje = "Hydro";
                    }else if(personaje.data.element == "Rock"){
                        elementoPersonaje = "Geo";
                    }else if(personaje.data.element == "Electric"){
                        elementoPersonaje = "Electro";
                    }else if(personaje.data.element == "Grass"){
                        elementoPersonaje = "Dendro";
                    }
                    
                    primeraFila += `
                        <th scope="col" class="py-3 px-6 text-white">
                            ${elementoPersonaje} DMG Bonus
                        </th>
                    `;
                }
            }
            primeraFila += `
            <th scope="col" class="py-3 px-6 text-white">
                CRIT DMG
            </th>
            <th scope="col" class="py-3 px-6 text-white">
                CRIT Rate
            </th>
        `;

        tr.innerHTML += primeraFila;
        document.getElementById('headStats').append(tr);
        for( i = 0; i < 91; i+=5){
            let valorAtk;
            let valorHp;
            let valorDef;
            let arrayParam;
            if(i - 1 <= 0){
                arrayParam = Object.entries(curvaNivel[i][1].curveInfos);
            }else{
                arrayParam = Object.entries(curvaNivel[i-1][1].curveInfos);
            }
            arrayParam.forEach(p =>{
                if(p[0] == hpType){
                    valorHp = p[1];
                }
                if(p[0] == defType){
                    valorDef = p[1];
                }
                if(p[0] == atkType){
                    valorAtk = p[1];
                }

            })
            let sumAtk = 0;
            let sumHp = 0;
            let sumDef = 0;
            let sumBonus = 0;
        
            if(i <= 90 && i > 80){
                sumAtk = Object.values(niveles[6].addProps)[2];
                sumHp = Object.values(niveles[6].addProps)[0];
                sumDef = Object.values(niveles[6].addProps)[1];
                sumBonus = Object.values(niveles[6].addProps)[3];
            }else if(i <= 80 && i > 70){
                sumAtk = Object.values(niveles[5].addProps)[2];
                sumHp = Object.values(niveles[5].addProps)[0];
                sumDef = Object.values(niveles[5].addProps)[1];
                sumBonus = Object.values(niveles[5].addProps)[3];
            }else if(i <= 70 && i > 60){
                sumAtk = Object.values(niveles[4].addProps)[2];
                sumHp = Object.values(niveles[4].addProps)[0];
                sumDef = Object.values(niveles[4].addProps)[1];
                sumBonus = Object.values(niveles[4].addProps)[3];
            }else if(i <= 60 && i > 50){
                sumAtk = Object.values(niveles[3].addProps)[2];
                sumHp = Object.values(niveles[3].addProps)[0];
                sumDef = Object.values(niveles[3].addProps)[1];
                sumBonus = Object.values(niveles[3].addProps)[3];
            }else if(i <= 50 && i > 40){
                sumAtk = Object.values(niveles[2].addProps)[2];
                sumHp = Object.values(niveles[2].addProps)[0];
                sumDef = Object.values(niveles[2].addProps)[1];
                sumBonus = Object.values(niveles[2].addProps)[3];
            }else if(i <= 40 && i > 20){
                sumAtk = Object.values(niveles[1].addProps)[2];
                sumHp = Object.values(niveles[1].addProps)[0];
                sumDef = Object.values(niveles[1].addProps)[1];
                sumBonus = Object.values(niveles[1].addProps)[3];
            }
                    if(sumAtk != 0){
                        
                        let fila = `
                        <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    ${curvaNivel[i-1][0]}
                                </th>
                                <td class="py-4 px-6">
                                    ${Math.round(hp * valorHp + sumHp)}
                                </td>
                                <td class="py-4 px-6">
                                    ${Math.round(atk * valorAtk + sumAtk)}
                                </td>
                                <td class="py-4 px-6">
                                        ${Math.round(def * valorDef + sumDef)}
                                </td>
                                `;
        
                                if(atributoEspecial != "FIGHT_PROP_CRITICAL_HURT" && atributoEspecial != "FIGHT_PROP_CRITICAL"){
                                        
                                        if(!atributoEspecial.includes("MASTERY")){
                                            bonus = sumBonus;
                                            fila += `
                                                <td scope="col" class="py-3 px-6 ">
                                                    ${Math.round(bonus*100*100)/100}%
                                                </td>
                                            `;
                                        }else{
                                            bonus = sumBonus;
                                            fila += `
                                                <td scope="col" class="py-3 px-6 ">
                                                    ${Math.round(bonus)}
                                                </td>
                                            `;
                                        }
                                        fila += `
                                
                                            <td class="py-4 px-6">
                                                50%
                                            </td>
                                            <td class="py-4 px-6">
                                                5%
                                            </td>
                                        </tr>
                                        `;
                                    }else{
                                        if(atributoEspecial.includes("HURT")){
                                            fila += `
                                                <td scope="col" class="py-3 px-6 text-white">
                                                ${Math.round((critDmg + sumBonus)*100*100)/100}%
                                                </td>
                                                <td scope="col" class="py-3 px-6 text-white">
                                                    5%
                                                </td>
                                            `;
                                        }else{
                                            fila += `
                                                <td scope="col" class="py-3 px-6 text-white">
                                                50%
                                                </td>
                                                <td scope="col" class="py-3 px-6 text-white">
                                                ${Math.round((critRate + sumBonus)*100*100)/100}%
                                                </td>
                                            `;
                                        }
                                    }
                                
                                tbodyStat.innerHTML += fila;
                    }else{
                        let fila = `
                        <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                                <td scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                ${(i-1 <= 0 ) ? 1 :curvaNivel[i-1][0]}
                                </td>
                                <td class="py-4 px-6">
                                    ${Math.round(hp)}
                                </td>
                                <td class="py-4 px-6">
                                    ${Math.round(atk)}
                                </td>
                                <td class="py-4 px-6">
                                        ${Math.round(def)}
                                </td>
                                `;
        
                                if(atributoEspecial != "FIGHT_PROP_CRITICAL_HURT" && atributoEspecial != "FIGHT_PROP_CRITICAL"){
                                        fila += `
                                        <td class="py-4 px-6">
                                            0
                                        </td>
                                        `;
                                    }
                                fila += `
                                
                                <td class="py-4 px-6">
                                    50%
                                </td>
                                <td class="py-4 px-6">
                                    5%
                                </td>
                            </tr>
                                `;
                                tbodyStat.innerHTML += fila;
                    }


            
            document.getElementById('tablaStats').append(tbodyStat);
        }

        })

        
    }
function rellenarMejoraTalentos(personaje){
    const tbodyMejora = document.createElement('tbody');

    let nivelMejora = Object.entries(personaje.data.talent[0].promote);
    nivelMejora = nivelMejora.filter(p => p[0] <= 10)
    let stringMejora = ""
    nivelMejora.forEach(x => {
         stringMejora  += `
                <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                    <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        ${x[0]}
                    </th> 
                    <td class="py-4 px-6 ">
                    `;

                    if(x[1].costItems != null){
                        Object.entries(x[1].costItems).forEach(p =>{
                            console.log(p);
                            stringMejora += `
                                    <div class="w-14 rounded-xl shadow-2xl inline-block mx-3">
                                        <div class="relative">
                                            <img class="rounded-xl bg-slate-700" src="https://api.ambr.top/assets/UI/UI_ItemIcon_${p[0]}.png" />
                                            <div class=" absolute bottom-0 right-0 text-md bg-yellow-50 px-2 py-1 rounded-lg rounded-tr-none rounded-bl-none text-black">
                                                ${p[1]} 
                                            </div>  
                                        </div>
                                    </div>     
                                
                               
                            `;
                        })
                        stringMejora += "</td></tr>"
                    }else{
                        stringMejora += `
                                    <div class="w-14 rounded-xl shadow-2xl inline-block mx-3">
                                        <div class="relative">
                                        </div>
                                    </div>     
                                </td>                             
                            </tr>`;
                    }
                    
    })
    tbodyMejora.innerHTML += stringMejora;
    document.getElementById('tablaMejoraTalento').append(tbodyMejora);
}
    function rellenarTalentoAtaque(personaje){
        const tbody = document.createElement('tbody');

        let nivelesTalentos = Object.entries(personaje.data.talent[0].promote);

        let tipoAtaque = personaje.data.talent[0].promote[1].description;
        tipoAtaque = tipoAtaque.filter(p => p != "");
            
        tipoAtaque.forEach((y,i) =>{
            const nombreTalento = y.substring(0,y.indexOf('|'));
            const escalado = y.substring(y.indexOf("}")+1)
            let pruebaString =`
            <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
                <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-gray-900 px-3">
                        ${nombreTalento.includes("#") ? "Press " + nombreTalento.substring(nombreTalento.length-3, nombreTalento.length) : nombreTalento}
                    </th>      
            `;

            nivelesTalentos.forEach(x => {
                const str = y;
                const strP = str.substring(str.indexOf('|'));
                const strC = strP.substring(7);
                if(strC.includes("/{")){
                    let indice;
                    let indice2;

                    let strE = strC.substring(strC.indexOf('/'));
                    let strEx = strE.substring(7);
                    
                    if(strC[1] != ":"){
                        indice = strC[0] + strC[1];
                    }else{
                        indice = strC[0];
                    }

                    if(strEx[1] != ":"){
                        indice2 = strEx[0] + strEx[1];
                    }else{
                        indice2 = strEx[0];
                    }

                    let html = `  
                    <td class="py-4">
                            ${Math.round(x[1].params[indice-1]*100 * 100)/100}% / ${Math.round(x[1].params[indice2-1]*100 * 100)/100}%
                    </td>
                    `;
                    pruebaString += html;
                }else if(strC.includes("+")){
                    let indice;
                    let indice2;

                    let strE = strC.substring(strC.indexOf("+"));
                    let strEx = strE.substring(7);
                    if(strC[1] != ":"){
                        indice = strC[0] + strC[1];
                    }else{
                        indice = strC[0];
                    }

                    if(strEx[1] != ":"){
                        indice2 = strEx[0] + strEx[1];
                    }else{
                        indice2 = strEx[0];
                    }

                    let html = `  
                    <td class="py-4">
                        <p>${Math.round(x[1].params[indice-1]*100 * 100)/100}%</p> + <p>${Math.round(x[1].params[indice2-1]*100 * 100)/100}%</p>
                    </td>
                    `;
                    pruebaString += html;
                }
                else if(strC.includes("s") && !strC.includes("stack")){
                    let indice;
                    if(strC[1] != ":"){
                        indice = strC[0] + strC[1];
                    }else{
                        indice = strC[0];
                    }
                    
                    let html = `  
                    <td class="py-4">
                            ${Math.round(x[1].params[indice-1] * 100)/100}s
                    </td>
                    `;
                    pruebaString += html;
                }else if(strC.includes("×")){
                    let indice;
                    let repeticion;
                    if(strC[1] != ":"){
                        indice = strC[0] + strC[1];
                    }else{
                        indice = strC[0];
                    }

                    if(strC[strC.length-2] != "×"){
                        repeticion = strC[strC.length-2] + strC[strC.length-1];
                    }else{
                        repeticion = strC[strC.length-1];
                    }

                    let html = `  
                    <td class="py-4 ">
                            ${Math.round(x[1].params[indice-1]*100 * 100)/100}% x ${repeticion}
                    </td>
                    `;
                    pruebaString += html;
                }else{
                    let indice;
                    
                    if(strC[1] != ":"){
                        indice = strC[0] + strC[1];
                    }else{
                        indice = strC[0];
                    }

                    let html = `  
                        <td class="py-4">
                                <p>${Math.round(x[1].params[indice-1]*100 * 100)/100}%</p>  <p>${escalado}</p>
                        `;
                    if(!strC.includes("P")){
                        html = `  
                        <td class="py-4 ">
                                ${Math.round(x[1].params[indice-1] * 100)/100}                                     
                        </td>
                        `;
                    }
                    pruebaString += html;
                }
                
                
            })
            pruebaString += '</tr>'
            tbody.innerHTML += pruebaString;

    })
        document.getElementById('tablaTalentoAtaque').append(tbody);
}

function rellenarTalentoElemental(personaje){
    const tbody = document.createElement('tbody');

    let nivelesTalentos = Object.entries(personaje.data.talent[1].promote);

    let tipoAtaque = personaje.data.talent[1].promote[1].description;
    tipoAtaque = tipoAtaque.filter(p => p != "");
        
    tipoAtaque.forEach((y,i) =>{
        const nombreTalento = y.substring(0,y.indexOf('|'));
        let escalado = "";
        if(!nombreTalento.includes('#')){
            escalado = y.substring(y.indexOf("}")+1)
        }
        
        let pruebaString =`
        <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-gray-900 px-3">
                    ${nombreTalento.includes("#") ? "Press " + nombreTalento.substring(nombreTalento.length-3, nombreTalento.length) : nombreTalento}
                </th>      
        `;

        nivelesTalentos.forEach(x => {
            
            const str = y;
            const strP = str.substring(str.indexOf('|'));
            const strC = strP.substring(7);

            if(strC.includes("/{") && strC.includes("s")){
                let indice;
                let indice2;
                let indice3;

                let strE = strC.substring(strC.indexOf('/'));
                let strEx = strE.substring(7);
                
                let strE2 = strEx.substring(strEx.indexOf('/'));
                let strEx2 = strE2.substring(7);

                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                if(strEx[1] != ":"){
                    indice2 = strEx[0] + strEx[1];
                }else{
                    indice2 = strEx[0];
                }

                if(strEx2[1] != ":"){
                    indice3 = strEx2[0] + strEx2[1];
                }else{
                    indice3 = strEx2[0];
                }

                console.log(indice3)
                let html = `  
                <td class="py-4">
                        ${Math.round(x[1].params[indice-1] * 100)/100}/${Math.round(x[1].params[indice2-1] * 100)/100}/${Math.round(x[1].params[indice3-1] * 100)/100}s
                </td>
                `;
                pruebaString += html;
            }
            else if(strC.includes("/{")){
                let indice;
                let indice2;

                let strE = strC.substring(strC.indexOf('/'));
                let strEx = strE.substring(7);
                
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                if(strEx[1] != ":"){
                    indice2 = strEx[0] + strEx[1];
                }else{
                    indice2 = strEx[0];
                }

                let html = `  
                <td class="py-4">
                        ${Math.round(x[1].params[indice-1]*100 * 100)/100}% / ${Math.round(x[1].params[indice2-1]*100 * 100)/100}%
                </td>
                `;
                pruebaString += html;
            }else if(strC.includes("+")){
                let indice;
                let indice2;

                let strE = strC.substring(strC.indexOf("+"));
                let strEx = strE.substring(7);
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                if(strEx[1] != ":"){
                    indice2 = strEx[0] + strEx[1];
                }else{
                    indice2 = strEx[0];
                }

                let html = `  
                <td class="py-4">
                       <p>${Math.round(x[1].params[indice-1]*100 * 100)/100}%</p> + <p>${Math.round(x[1].params[indice2-1]*100 * 100)/100}%</p>
                </td>
                `;
                pruebaString += html;
            }
            else if(strC.includes("s") && !strC.includes("stack")){
                let indice;
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }
                
                let html = `  
                <td class="py-4">
                        ${Math.round(x[1].params[indice-1] * 100)/100}s
                </td>
                `;
                pruebaString += html;
            }else if(strC.includes("×")){
                let indice;
                let repeticion;
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                if(strC[strC.length-2] != "×"){
                    repeticion = strC[strC.length-2] + strC[strC.length-1];
                }else{
                    repeticion = strC[strC.length-1];
                }

                let html = `  
                <td class="py-4 ">
                        ${Math.round(x[1].params[indice-1]*100 * 100)/100}% x ${repeticion}
                </td>
                `;
                pruebaString += html;
            }else{
                let indice;
                
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                let html = `  
                    <td class="py-4">
                            <p>${Math.round(x[1].params[indice-1]*100 * 100)/100}%</p>  <p>${escalado}</p>
                    `;
                if(!strC.includes("P")){
                    console.log("buenas t")
                    html = `  
                    <td class="py-4 ">
                            ${Math.round(x[1].params[indice-1] * 100)/100}                                     
                    </td>
                    `;
                }
                pruebaString += html;
            }
            
            
        })
        pruebaString += '</tr>'
        tbody.innerHTML += pruebaString;

    })
        document.getElementById('tablaTalentoElemental').append(tbody);
}
function rellenarTalentoBurst(personaje){
    const tbody = document.createElement('tbody');

    let nivelesTalentos;
    let tipoAtaque;
    if(personaje.data.talent[2] == undefined){
        nivelesTalentos = Object.entries(personaje.data.talent[3].promote);
        tipoAtaque = personaje.data.talent[3].promote[1].description;
    }else{
        nivelesTalentos = Object.entries(personaje.data.talent[4].promote);
        tipoAtaque = personaje.data.talent[4].promote[1].description;
    }
    
    tipoAtaque = tipoAtaque.filter(p => p != "");
        
    tipoAtaque.forEach((y,i) =>{
        const nombreTalento = y.substring(0,y.indexOf('|'));
        const escalado = y.substring(y.indexOf("}")+1)
        let pruebaString =`
        <tr class="bg-white border-b bg-gray-800 border-gray-700 hover:bg-gray-600">
            <th scope="row" class="py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white bg-gray-900 px-3">
                    ${nombreTalento.includes("#") ? "Press " + nombreTalento.substring(nombreTalento.length-3, nombreTalento.length) : nombreTalento}
                </th>      
        `;

        nivelesTalentos.forEach(x => {
            const str = y;
            const strP = str.substring(str.indexOf('|'));
            const strC = strP.substring(7);
            if(strC.includes("/{")){
                let indice;
                let indice2;

                let strE = strC.substring(strC.indexOf('/'));
                let strEx = strE.substring(7);
                
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                if(strEx[1] != ":"){
                    indice2 = strEx[0] + strEx[1];
                }else{
                    indice2 = strEx[0];
                }

                let html = `  
                <td class="py-4">
                        ${Math.round(x[1].params[indice-1]*100 * 100)/100}% / ${Math.round(x[1].params[indice2-1]*100 * 100)/100}%
                </td>
                `;
                pruebaString += html;
            }else if(strC.includes("+")){
                let indice;
                let indice2;

                let strE = strC.substring(strC.indexOf("+"));
                let strEx = strE.substring(7);
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                if(strEx[1] != ":"){
                    indice2 = strEx[0] + strEx[1];
                }else{
                    indice2 = strEx[0];
                }

                let html = `  
                <td class="py-4">
                       <p>${Math.round(x[1].params[indice-1]*100 * 100)/100}%</p> + <p>${Math.round(x[1].params[indice2-1]*100 * 100)/100}%</p>
                </td>
                `;
                pruebaString += html;
            }
            else if(strC.includes("s") && !strC.includes("stack")){
                let indice;
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }
                
                let html = `  
                <td class="py-4">
                        ${Math.round(x[1].params[indice-1] * 100)/100}s
                </td>
                `;
                pruebaString += html;
            }else if(strC.includes("×")){
                let indice;
                let repeticion;
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                if(strC[strC.length-2] != "×"){
                    repeticion = strC[strC.length-2] + strC[strC.length-1];
                }else{
                    repeticion = strC[strC.length-1];
                }

                let html = `  
                <td class="py-4 ">
                        ${Math.round(x[1].params[indice-1]*100 * 100)/100}% x ${repeticion}
                </td>
                `;
                pruebaString += html;
            }else{
                let indice;
                
                if(strC[1] != ":"){
                    indice = strC[0] + strC[1];
                }else{
                    indice = strC[0];
                }

                let html = `  
                    <td class="py-4">
                            <p>${Math.round(x[1].params[indice-1]*100 * 100)/100}%</p>  <p>${escalado}</p>
                    `;
                if(!strC.includes("P")){
                    html = `  
                    <td class="py-4 ">
                            ${Math.round(x[1].params[indice-1] * 100)/100}                                     
                    </td>
                    `;
                }
                pruebaString += html;
            }
            
            
        })
        pruebaString += '</tr>'
        tbody.innerHTML += pruebaString;

    })
        document.getElementById('tablaTalentoBurst').append(tbody);
}