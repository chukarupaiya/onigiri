import {React} from 'react';

import '../css/Addliquidity.css';
import img4 from '../resource/img4.png';

const Addliquidity=()=>{
    return (<div>

        <div className='background'>
            {/* <img id={"img4"} src={img4}></img> */}
      

            <div className='outer-add'>
           
                <p id={"add-liq"}>Add Liquidity</p>
                <h3 id={"add-liq2"}>RA / ONI</h3>
                <div className='inner-add-1'>
                    <div className='inner-add-1-1'>
                        <p>RA</p>
                        <p>1.659</p>

                    </div>
                    <div className='inner-add-1-2'>
                        <p>ONI</p>
                        <p>1.659</p>

                    </div>
                    <div className='line'></div>
                    <div className='inner-add-1-3'>
                        <p>Fee Tier</p>
                        <p>0.5%</p>

                    </div>

                </div>

                <h4>Selected Range
                </h4>

                <div className='inner-add-2'>
                    <div className='inner-add-2-1'>

                        <h4>Min Price</h4>
                        <h2>0.40013</h2>
                        <h4>ONI per RA</h4>

                        <h6>Your position will be 100% composed of RA at this price</h6>

                    </div>

                    <div className='inner-add-2-2'>

                        <h4>Max Price</h4>
                        <h2>0.40013</h2>
                        <h4>ONI per RA</h4>

                        <h6>Your position will be 100% composed of RA at this price</h6>

                    </div>
                </div>

                <div className='inner-add-3'>

                    <p>Current price</p>
                    <h4>0.4999</h4>
                    <p>ONI per RA</p>

                </div>

                <button className='add-button'>Add</button>
            </div>

            


        </div>

    </div>)
}



export default Addliquidity;