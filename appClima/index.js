const {InquirerMenu, leerInput, pausa, listadoLugares} = require('./helpers/inquirer'); 
const Busqueda = require('./models/busquedas');
require('dotenv').config({path:'./token.env'})


const Main = async ()  => {

    const busquedas = new Busqueda(); //por fuera del ciclo para que no se reinicialice el valor.
    let opt = ''; 
    
    do{
        
        opt = await InquirerMenu(); 
        
        switch(opt){
            case '1': 
                //Mostrar Mensaje
                const lugar = await leerInput('Ciudad: ');
                //Buscar el lugar
                const lugares = await busquedas.ciudad(lugar);
                // console.log(lugares);
                //Seleccionar el lugar
                const Idseleccion = await listadoLugares(lugares);
 
                //Guardar en DB: 
                const lugarSel= lugares.find( l => l.id === Idseleccion);
                busquedas.agregarHistorial(lugarSel.name);
                
                //Clima
                const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lgn);
                // console.log(clima);
                
                //Mostrar resultados: 
                console.log('Informacion de la Ciudad: '.magenta);
                console.log('Nombre: '.grey,lugarSel.name);
                console.log('Descripcion: '.grey,clima.desc);
                console.log('Temperatura: '.grey,clima.temp);
                console.log('Longitud:'.grey,lugarSel.lgn);
                console.log('Latitud:'.grey,lugarSel.lat);
                console.log('Minima:'.grey,clima.min); 
                console.log('Maxima: '.grey,clima.max);
            break;

            case '2': 
            busquedas.Historial.forEach((lugar, id)=>{
                const idx = `${id+1}`.green; 
                console.log(`${idx} ${lugar}`); 
            })
        }

        // console.log({opt}); Para probar si me selecciona bien el valor

        if(opt !== '0') await pausa(); 

    } while(opt !=='3'); 

};

Main(); 