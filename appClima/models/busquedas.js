const fs = require('fs'); //filesystem
const axios = require('axios');

class Busqueda {

    Historial = [];
    dbpath = './db/database.json';

    constructor(){
        
    }; 

    get paramsApi(){
        return{
            'access_token':process.env.TOKEN,
            'language':'es',
            'limit':'5'
        }
    };

    get paramsWheater(){
        return{
                // lat,
                // lon,
                appid:process.env.OPENWEATHER_KEY,
                units:'metric',
                lang:'es'
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
            return resp.data.features.map(lugar =>({
                id: lugar.id,
                name: lugar.place_name,
                lat:lugar.center[0],
                lgn:lugar.center[1],
            }))
            // console.log(resp.data); 
            // return [];
        }
        catch(error) {
            return []; 
        }
        // return []; //retornar los lugares que busco la persona
    }

    async climaLugar(lat, lon){
        try{
            //instancia de axios.create
            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsWheater, lat, lon}
            })

            //res.data
            const resp = await instance.get();
            const {weather, main} = resp.data;

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp,
            }
        }
        catch(error){
            console.log(error);
        }
    }

    agregarHistorial(lugar = ''){
        //prevenir duplicados
        this.Historial.unshift(lugar);
        //Guardar en DB
        this.guardarDB(); 
    }

    guardarDB(){
         fs.writeFileSync(this.dbpath, JSON.stringify(this.Historial)); 
    }

}

module.exports = Busqueda; 