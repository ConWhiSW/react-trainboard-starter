import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return <div>
        <h1>Trainboard Train Station Provider</h1>
        <h2>This is the home/landing page</h2>
        <Link to="/ABC123U&ME">Stations</Link>

    </div>;
};

export default Home;