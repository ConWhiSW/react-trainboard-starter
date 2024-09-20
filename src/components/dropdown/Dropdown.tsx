import React from 'react';
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
    </div>);
};

export default Dropdown;