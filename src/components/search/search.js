import React from 'react';

import './search.css';

export default function Search({onSearch}) {


    const handleSearch = ({target: {value}, which}) => {
        console.log(which);
        if(which === 13){
            onSearch(value);
        }
    }

    return (
        <section className='search'>
            <input 
                placeholder="Procure por heróis" 
                onKeyUp={handleSearch}
            />
        </section>
    );
}