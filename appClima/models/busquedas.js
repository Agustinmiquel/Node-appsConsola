const axios = require('axios');

class Busqueda {

    Historial = ['Madrid', 'Cordoba', 'Buenos Aires', 'Noruega', 'Texas', 'Mexico', 'Brasil', 'Chile', 'Uruguay', 'Costa Rica','Francia','Australia']; 

    constructor(){
        // leer en DB si existe
    }; 

    get paramsApi(){
        return{
            'access_token':'pk.eyJ1IjoiYWd1bWlxdWVsIiwiYSI6ImNsbTZ0c3Z1MTAwYnMzbHBkam9pY213MnQifQ.L3g3JwAVCoCRYCJ12QhxaA',
            'language':'es',
            'limit':'5'
        }
    };

    async ciudad(lugar = ''){

        //peticion http
        // console.log('ciudad', lugar); 
        try{

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params:this.paramsApi
            });

            const resp = await instance.get();
            console.log(resp.data); 
        
            return []; 

        }
        catch(error) {
            return []; 
        }
        // return []; //retornar los lugares que busco la persona
    }
}

module.exports = Busqueda; 