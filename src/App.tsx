import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/pages/Home';
import Station from './components/pages/Station';

const App = () => (
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Station/:from/:to" element={<Station />} />
            </Routes>
        </div>
    </BrowserRouter >
);

export default App;
