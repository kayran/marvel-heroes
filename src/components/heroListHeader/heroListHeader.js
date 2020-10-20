import React from 'react';
import './heroListHeader.css'
export default function HeroListHeader({
    heroListCount, 
    sort, 
    onlyFavorites, 
    onChangeSort, 
    onChangeFavorites
}) {
    const sortLabel = (sort) => sort.startsWith('-')?'Z/A':'A/Z'
    const changeSort = () => {
        const newSort = sort.startsWith('-')? sort.slice(1):`-${sort}`;
        onChangeSort(newSort);
    }
    return (
        <header className='hero-list__header'>
            <span className='hero-list__header__count'>Encontrados {heroListCount} heróis</span>
            <span className='hero-list__header__actions'>
                <span className='hero-list__header__actions__sort' onClick={changeSort}>
                    <svg>
                       <use href='#hero'/>
                    </svg>
                    Ordenar por nome - {sortLabel(sort)}
                </span>
                <span 
                className='hero-list__header__actions__favorite'
                onClick={onChangeFavorites}
                >
                   <svg>
                       <use href={`#heart-${onlyFavorites?'fullfilled':'empty'}`}/>
                    </svg> 
                    Somente Favoritos
                </span>
            </span>
        </header>
    )
}