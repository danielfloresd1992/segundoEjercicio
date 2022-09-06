import css from './css/loadPage.css';
import svg from '../assets/img/coco.png';
import nube1 from '../assets/svg/nube1.svg';
import waves from '../assets/svg/waves.svg';
import { useState } from 'react';

export const LoadPage = () => {

    const [booleanVisi, visinility] = useState(true);

    const hiddenPage = () => {
        setTimeout(() => {
            visinility((booleanVisi) => {
                booleanVisi = false;
            });
        }, 8000);
    }
    hiddenPage();
    return(
        <div className={booleanVisi ? 'load-page' : 'hidden'}>
            <div className="load--sol">
            </div>
            <img className="load--img_nube firt" src={nube1}></img>
            <div className="load--svg">
                <img className="load--img" src={svg}></img>  
                <div className="load--piso" ></div>   
                <div className="load--lago" ></div>   
            </div>
            <div className='load--title'>
                <h1 className='title'>El Clima 1.0</h1>
            </div>
        </div>
    );
}
