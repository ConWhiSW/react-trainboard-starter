import React from 'react';
import './header.css';
import board from './board.jpg';
import soft from './soft.png';
import train from './train.jpg';
import wire from './wire.png';

const Header = () => {
    return (<div className='header'>
        <img src={soft} alt='soft' />
        <img src={train} alt='train' />
        <img src={board} alt='board' />
        <img src={wire} alt='wire' />
    </div>);
};

export default Header;