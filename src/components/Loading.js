import {React} from 'react';

import '../css/Loading.css';

import gif1 from '../resource/gif2.gif';


const Loading=(props)=>{

    const amount1=props.data.amount1;
    const token1=props.data.token1;
    const amount2=props.data.amount2;
    const token2=props.data.token2;


    return (

        <div className='loading-outer' onClick={()=>{props.update_loading_status_(false)}}>

            <button onClick={()=>{props.update_loading_status_(false)}}>X</button>

            <div className='loading-inner1'>
                <img src={gif1}></img>

            </div>
            <div className='loading-inner2'>
                <p>Waiting for confirmation</p>
                <p>Supplying {amount1} {token1} and {amount2} {token2}</p>
                <p>Confirm this transaction in your wallet</p>
            </div>


        </div>
    );
}


export default  Loading;
