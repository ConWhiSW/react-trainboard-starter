import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Dropdown from '../dropdown/Dropdown';

const Home = () => {
    const possibleStations: string[] = ['Fenchurch', 'idk', 'something'];

    const [from, setFrom] = useState<string | null>(null);
    const [to, setTo] = useState<string | null>(null);

    return <div>
        <h1>Trainboard Train Station Provider</h1>
        <h2>This is the home/landing page</h2>
        <form>
            <h3>From</h3>
            <Dropdown bottomOptions={possibleStations} placeholder='Select Station' value={from} setValue={setFrom} />
            <h5>{from || 'No'}</h5>
            <h3>To</h3>
            <Dropdown bottomOptions={possibleStations} placeholder='Select Station' value={to} setValue={setTo} />
        </form>
        <Link to="/ABC123U&ME">Search</Link>

    </div >;
};

export default Home;