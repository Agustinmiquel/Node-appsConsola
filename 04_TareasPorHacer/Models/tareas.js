const Tarea = require("./tarea");

class Tareas {

    listado = {}; //Lo manejamos como un objeto y no como array para no iterar y buscar por indice.

    get listadorerr(){
        const _listado = []; 
        Object.keys(this.listado).forEach( (key) =>{
            const Tarea = this.listado[key];
            _listado.push(Tarea);  
        }); 

        return _listado;
    }

    constructor(){
        this.listado = {};  
    }

    borrarTarea( id = '' ){
        if(this.listado[id]){
            delete this.listado[id];
        }
    }

    cargarTareas( tareas = [] ){

        tareas.forEach( (tarea) =>{
            this.listado[key] = tarea; 
        })
    }

    crearTareas( desc = '' ) {
        const tarea = new Tarea(desc); 
        this.listado[tarea.id] = tarea; 
    }

    listadoTareas(){
        console.log();
        this.listadorerr.forEach((tarea, i) => {
            const idx = `${i + 1}`.green; 
            const {descripcion, completed} = tarea; 
            const estado = (completed) ? 'Completada'.green :'Pendiente'.red

            console.log(`${idx} ${descripcion} :: ${estado} `);
        })

    }

    listarPendientesCompletadas( completadas = true ){
        console.log();

        let indice = 0; 
        this.listadorerr.forEach((tarea) => {
            
            const {descripcion, completed} = tarea; 
            const estado = (completed) ? 'Completada'.green :'Pendiente'.red

            if ( completadas ){
                if( completed){
                    indice +=1; 
                    console.log(`${indice.toString().green} ${descripcion} :: ${estado} `);
                }
            } else{
                if (!completed){
                indice +=1; 
                console.log(`${indice.toString().green} ${descripcion} :: ${estado} `);}
            }
        })
    }
    //Si a completadas le pasamos como valor true, nos regresa las completadas, sino las pendientes.

    toogleCompletadas = (ids = []) =>{

        ids.forEach( id => {
            const tarea = this.listado[id];
            if (!tarea.completed){
                tarea.completed = new Date().toISOString()
                //Con el Date().toISOString estoy guardando en la lista de complet.
            } 
        });
    }
}



module.exports = Tareas; 