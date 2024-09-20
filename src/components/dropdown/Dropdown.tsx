import React from 'react';

interface DropdownProps {
    placeholder: string;
    bottomOptions: string[];
    value: string | null;
    setValue: (value: string) => void;
}

const Dropdown = ({ placeholder, bottomOptions, value, setValue }: DropdownProps) => {
    return (<select onChange={(e) => setValue(e.target.value)} name={'Select Station'} value={value || placeholder}>
        {bottomOptions.map((option => {
            return <option key={option}>{option}</option>;
        }))}

    </select>);
};

export default Dropdown;