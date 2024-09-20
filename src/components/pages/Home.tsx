import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import Dropdown from '../dropdown/Dropdown';

const Home = () => {
    const possibleStations: string[] = ['Fenchurch', 'idk', 'something'];

    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string | null>(null);

    return <div className='page'>
        <h1>Welcome To SoftTrainBoardWire. Select stations to get started!</h1>
        <form>
            <h3>From</h3>
            <Dropdown bottomOptions={possibleStations} placeholder='Select Station' value={from} setValue={setFrom} />
            <h3>To</h3>
            <Dropdown bottomOptions={possibleStations} placeholder='Select Station' value={to} setValue={setTo} />
            <Link className='main-button' to="/ABC123U&ME"><div>
                <h3>Find Stations</h3>
            </div></Link>
        </form>

    </div >;
};

export default Home;