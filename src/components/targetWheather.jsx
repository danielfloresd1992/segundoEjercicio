import { useEffect, useState } from 'react';
import nube1 from '../assets/svg/nube1.svg';

import axios from 'axios';

export const TargetWheather = () => {

    let [dataFetch, getData] = useState({});

    const [temp, setTemp] = useState(true);
    
    let [lat, getLat] = useState(null);
    let [lon, getLon] = useState(null);

    const useDatePositión = () => {
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition((success => {
                getLat(lat = success.coords.latitude);
                getLon(lon = success.coords.longitude);
                return{
                    lat,
                    lon
                }
            }));
        }
    }

    const changeTemp = () => {
        setTemp(!temp);
    }
    
    useEffect(() => {
        useDatePositión();
        if(lon && lat){
            const API_KEY = '4965ba87c3f6977b57b4397e1e9a3aeb';
            let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            console.log(lon + ' ' + lat)
            axios.get(url)
            .then(result => {
                console.log(result);
                getData(dataFetch = result.data);
            });
        }
    }, [lon, lat]); 
  
        console.log(dataFetch)
      
    return(
        <div className="target">

            <h1>Wheather App</h1>

            <h2>{dataFetch?.name} {dataFetch?.sys?.country}</h2>


            <div className='target--data'>
                <p style={{ color: "#4682B4"}}>{ temp ? `${(dataFetch?.main?.temp - 273.15).toFixed(2)} °C` : `${(dataFetch?.main?.temp).toFixed(2)} F`}</p>
                <p>{dataFetch?.weather ? `${dataFetch?.weather[0].description}`: 'cargando...'}</p>
                <img src={nube1} className="target-ico" alt="" />
            </div>
             
             <div className='target--data'>
                <p>Wind speed: {dataFetch?.wind?.speed} m/s</p>
            </div>
            <div className='target--data'>
                <p>Clouds: {dataFetch?.clouds?.all} %</p>
            </div>
            <div className='target--data'>
                <p>Clouds: {dataFetch?.main?.pressure /100} ms</p> 
                <p>humidity: {dataFetch?.main?.humidity}</p>
            </div>
            <button onClick={changeTemp} className='target--btn'>Change to {temp ? 'fahrenheit' : 'celcius'}</button>

        </div>
    );

}