//copiar y pegar en lo que tenemos del inquirer de la otra app.
const inquirer = require('inquirer'); 
const {message} = require('statuses');
require('colors');  

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?: ',
        choices: [{
            name:`${'1.'.yellow}Buscar Ciudad`,
            value: '1'
        },
        {
            name:`${'2.'.yellow}Historial de busqueda`,
            value: '2',
        },
        {
            name:`${'3.'.red}SALIR`,
            value:'3',
        },

    ]
    }
]; 

const InquirerMenu = async () =>{

    console.log('---------------------------------------'.green); 
    console.log('----SELECCIONE UNA DE LAS OPCIONES-----'.green); 
    console.log('---------------------------------------'.green); 

    const {opcion} = await inquirer.prompt(preguntas); 
    return opcion; 

}

const pausa = async () =>{

    const continuar = [{
        type:"input",
        name:"ENTER",
        message: `Click a ${'ENTER'.green} para continuar: `,
    }]

    await inquirer.prompt(continuar)
}

const leerInput = async (message) => {
    const question = [
        {
            type: "input",
            name: 'desc',
            message,
            validate(value){
                if(value.length === 0){
                    return 'Por favor ingrese un valor'; 
                }
                return true; 
            }
        }
    ]; 

    const { desc } = await inquirer.prompt(question); 
    return desc;
}


const listadoLugares = async ( lugares = [] ) => {

    const choices = lugares.map( (lugar, i) => {
        const idx = `${i + 1}.`.green; 
        return{
            value: lugar.id,
            name : `${idx} ${lugar.name}`
        }
})

    choices.unshift({
        value:'0',
        name:'0'.green + 'Cancelar'
    }); 

    const preguntas = [
        {
            type: 'list',
            name:'id',
            message:'Seleccione Lugar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas); 
    return id; 
}

const confirmar = async (message) =>{
    const question = [
        {
        type: 'confirm', //es un tipo de dato booleano en Inquirer.
        name: 'ok',
        message
        }
    ]

    const { ok } = await inquirer.prompt(question); 
    return ok; 
}

const mostrarListadoChecklist = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green; 
        return{
            value: tarea.id,
            name : `${idx} ${tarea.descripcion}`,
            checked: (tarea.completed) ? true : false
        }
})
    const pregunta = [
        {
            type: 'checkbox',
            name:'ids',
            message:'Selecciones: ',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta); 
    return ids; 
}


module.exports = {
    preguntas,
    InquirerMenu,
    leerInput,
    pausa,
    listadoLugares

} 