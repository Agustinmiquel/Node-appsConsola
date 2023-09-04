const fs = require('fs')

const archivo = 'db/data.json'; 

const guardarDb = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data) ); 
}

const leerArchivo = () => {

    if( !fs.existsSync(archivo) ){
        return null;
    }

    const info = fs.readFileSync(archivo, {encoding: 'utf-8'}); 
    const data = JSON.parse(info); 

    console.log(data); 
}

module.exports = {
    guardarDb,
    leerArchivo,
}
