import React from 'react';
import Search from '../search/search';
import HeroListHeader from '../heroListHeader/heroListHeader';

import './header.css';
export default function Header({
    sort,
    heroListCount, 
    onlyFavorites, 
    onSearch,
    changeSort, 
    changeFavorites, 
}) {

    return (
        <header className='header'>
            <img className='header__image' src='/assets/marvel.svg' alt='MARVEL search heroes logo'></img>
            <h1 className='header__subtitle'>EXPLORE O UNIVERSO</h1>
            <p className='header__description'>Mergulhe no dominio deslumbrante de todos os personagens clássicos que você ama - e aqueles que você descobrirá em breve!</p>
            <Search onSearch={searchText=>onSearch(searchText)}/>
            <HeroListHeader 
                sort={sort}
                onlyFavorites={onlyFavorites}
                heroListCount={heroListCount}
                onChangeSort={changeSort}
                onChangeFavorites={changeFavorites}
            />
        </header>
    );
}