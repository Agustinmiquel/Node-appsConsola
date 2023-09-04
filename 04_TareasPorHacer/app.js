const Tarea = require('./Models/tarea');
const Tareas = require('./Models/tareas');
const { guardarDb, leerArchivo } = require('./guardarTarea');
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist} = require('./inquirer');


require('colors'); 

//Como en JAVA, creamos una funcion main donde se va a ejecutar por ahora nuestro programa.
const Main = async () => {

    console.clear(); 

    let opt = '';
    const tareas = new Tareas(); 

    const tareasDB = leerArchivo();

    if (tareasDB){
        tareas.cargarTareas(tareasDB); 
    }

    // await pausa(); //ponemos aca el await para que no se vuelva a iniciar el ciclo con el inquirerMenu

    do {
        opt = await inquirerMenu();
        
        switch (opt) {
            case '1':
                //crear tarea:
                const desc = await leerInput('Descripcion: '); 
                tareas.crearTareas(desc);
                break;
        
            case '2': //Listar tareas
                tareas.listadoTareas(); 
                break;

            case '4': 
                tareas.listarPendientesCompletadas(false)
                break;
            case '5': 
                tareas.listarPendientesCompletadas(true); 
                break; 
            case '3': //Borrar tareas
                const id = await listadoTareasBorrar( tareas.listadorerr );
                if(id !== '0'){
                    const ok = await confirmar('Esta seguro que quiere borrarlo?')
                    if( ok ){
                    tareas.borrarTarea(id); 
                    console.log('Tarea borrada correctamente'); 
                    }
                }
                // console.log({id});
                break;
            case '6': //Completar Tareas: 
                const ids = await mostrarListadoChecklist(tareas.listadorerr); 
                tareas.toogleCompletadas(ids); 
                console.log('Tarea completada con exito'); 
                // console.log(ids); 
            break;
        }

        guardarDb(tareas.listadorerr);

        await pausa();
        
    } while( opt !== '0')

}

Main(); 