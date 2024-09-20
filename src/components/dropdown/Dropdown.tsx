import React from 'react';
import { HiChevronDown } from 'react-icons/hi';
import './dropdown.css';

interface DropdownProps {
    placeholder: string;
    bottomOptions: string[];
    value: string | null;
    setValue: (value: string) => void;
}

const Dropdown = ({ placeholder, bottomOptions, value, setValue }: DropdownProps) => {
    return (<div className='select-wrapper'>
        <select onChange={(e) => setValue(e.target.value)} name={'Select Station'} value={value || placeholder}>
            {bottomOptions.map((option => {
                return <option key={option}>{option}</option>;
            }))}
        </select>
        <div className='icon-container'>
            <HiChevronDown />
        </div>
    </div>);
};

export default Dropdown;