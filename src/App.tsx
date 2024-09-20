import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import './App.css';
import Header from './components/header/Header';
import Home from './components/pages/Home';
import Station from './components/pages/Station';

const App = () => (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
            <div className="App">
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Station/:from/:to/:time" element={<Station />} />
                </Routes>
            </div>
        </BrowserRouter ></LocalizationProvider>
);

export default App;
