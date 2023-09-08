const {InquirerMenu, leerInput, pausa} = require('./helpers/inquirer'); 
const Busqueda = require('./models/busquedas');


const Main = async ()  => {

    const busquedas = new Busqueda(); //por fuera del ciclo para que no se reinicialice el valor.
    let opt = ''; 
    
    do{
        
        opt = await InquirerMenu(); 
        
        switch(opt){
            case '1': 
                //Mostrar Mensaje
                const lugar = await leerInput('Ciudad: ');
                busquedas.ciudad(lugar);
                //Buscar el lugar

                //Seleccionar el lugar

                //Clima

                //Mostrar resultados: 
                console.log('Informacion de la Ciudad: '.magenta);
                console.log('Temperatura: '.grey,);
                console.log('Longitud:'.grey,);
                console.log('Latitud:'.grey,);
                console.log('Minima:'.grey,); 
                console.log('Maxima: '.grey,);
            break;
        }

        // console.log({opt}); Para probar si me selecciona bien el valor

        if(opt !== '0') await pausa(); 

    } while(opt !=='3'); 

};

Main(); 