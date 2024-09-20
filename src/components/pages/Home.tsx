import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { stationDetail } from '../../customTypes';
import './home.css';
import Dropdown from '../dropdown/Dropdown';

const Home = () => {
    const exampleStations : stationDetail[] = [
        {
            displayName: '',
            crs: '',
            nlc: '',
        },
        {
            displayName : 'Manchester Piccadilly',
            crs: 'MAN',
            nlc : '296800',
        },
        {
            displayName : 'London Kings Cross',
            crs: 'KGX',
            nlc : '612100',
        },
        {
            displayName : 'Cambridge',
            crs: 'CBG',
            nlc : '702200',
        },
        {
            displayName: 'Cambridge North',
            crs: 'CMB',
            nlc: '800100',
        },
        {
            displayName: 'Manchester Victoria',
            crs: 'MCV',
            nlc: '297000',
        },
    ];

    const [from, setFrom] = useState<string>('');
    const [to, setTo] = useState<string>('');

    return <div className='page'>
        <h1>Trainboard Train Station Provider</h1>
        <h2>Welcome To SoftRailBoardWire. Select stations to get started!</h2>
        <form>
            <h3>From</h3>
            <Dropdown bottomOptions={exampleStations}
                placeholder='Select Station'
                value={from}
                setValue={setFrom} />
            <h5>{from || 'No'}</h5>
            <h3>To</h3>
            <Dropdown bottomOptions={exampleStations}
                placeholder='Select Station'
                value={to}
                setValue={setTo} />
            <Link className='main-button' to={'/Station/'+from+'/'+to}><div>
                <h3>Find Stations</h3>
            </div></Link>
        </form>

    </div >;
};

export default Home;