const { v4: uuidv4 } = require('uuid'); 

// Modelo para manejar UNA tarea. 
class Tarea {

    id= ''; 
    descripcion = ''; 
    completed = null;

    constructor(descripcion){
        this.descripcion = descripcion
        this.id = uuidv4(); 
        this.completed = null; 
    }

}



module.exports = Tarea; 