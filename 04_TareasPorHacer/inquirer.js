const inquirer = require('inquirer'); 
const { message } = require('statuses');
require('colors'); 

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?: ',
        choices: [{
            name:`${'1.'.green}Crear Tareas`,
            value: '1'
        },
        {
            name:`${'2.'.green}Listar Tareas`,
            value: '2',
        },
        {
            name:`${'3.'.green}Eliminar tarea`,
            value:'3',
        },
        {
            name: `${'4.'.green}Listar tareas pendientes`,
            value: '4',
        },
        {
            name: `${'5.'.green}Listar tareas completadas`,
            value: '5',
        },
        {
            name: `${'6.'.green}Completar Tarea`,
            value: '6',
        },
        {
            name: `${'0.'.green}.Salir`,
            value:'0',
        },

    ]
    }
]; 

const inquirerMenu = async () => {
    // console.clear(); 
    console.log("===========================".green); 
    console.log("Seleccione una opcion:".green); 
    console.log("===========================".green); 

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

const listadoTareasBorrar = async ( tareas = [] ) => {

    const choices = tareas.map( (tarea, i) => {
        const idx = `${i + 1}.`.green; 
        return{
            value: tarea.id,
            name : `${idx} ${tarea.descripcion}`
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
            message:'Borrar',
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
            message:'Selecciones',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta); 
    return ids; 
}



module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}