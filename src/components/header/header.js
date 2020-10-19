import React from 'react';
import Search from '../search/search';

import './header.css';
export default function Header({onSearch}) {

    return (
        <header className='header'>
            <img className='header__image' src='/assets/marvel.svg' alt='MARVEL search heroes logo'></img>
            <h1 className='header__subtitle'>EXPLORE O UNIVERSO</h1>
            <p className='header__description'>Mergulhe no dominio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
            <Search onSearch={searchText=>onSearch(searchText)}/>
        </header>
    );
}