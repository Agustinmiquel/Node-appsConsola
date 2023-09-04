const { resolve } = require('path');

require('colors')

// Creando la interfaz:
const mostrarMensajes = () =>{

    return new Promise(resolve => {
    console.clear(); //para limpiar luego de cada ejecucion: 
    console.log("===========================".green); 
    console.log("Seleccione una opcion:".white); 
    console.log("===========================".green); 

    console.log(`${'1'.green}.Crear Tarea`);
    console.log(`${'2'.green}.Listar Tareas`);
    console.log(`${'3'.green}.Listar tareas completadas`);
    console.log(`${'4'.green}.Listar tareas pendientes`);
    console.log(`${'5'.green}.Borrar tareas`);
    console.log(`${'6'.green}.Completar tareas`);
    console.log(`${'7'.green}.Salir`);   
    
    const readline = require('readline').createInterface({
        input : process.stdin, // ingreso de datos del usuario
        output: process.stdout
        }); 
        readline.question('Seleccione una opcion: ', (opt) => {
        console.log({opt}); 
        readline.close(); 
        resolve(opt); 
        }); 
})
}

const pausa = () => {
    return new Promise(resolve => {
        const readline = require('readline').createInterface({
        input : process.stdin, // ingreso de datos del usuario
        output: process.stdout
        }); 
        readline.question('Presione ENTER para continuar', (opt) => {
        // console.log({opt}); 
        readline.close(); 
        resolve(opt); //resuelve aca la promesa
        });
    })
}


module.exports = {
    mostrarMensajes,
    pausa,
}