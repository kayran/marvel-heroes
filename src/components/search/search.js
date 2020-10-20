import React from 'react';

import './search.css';

export default function Search({onSearch}) {


    const handleKeyUp = ({target: {value}, which}) => {
        console.log(which);
        if(which === 13){
            onSearch(value);
        }
    }

    return (
        <section className='search'>
            <svg>
                <use href='#search'></use>
            </svg>
            <input 
                placeholder="Procure por heróis" 
                onKeyUp={handleKeyUp}
            />
        </section>
    );
}