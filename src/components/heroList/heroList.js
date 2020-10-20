import React from 'react'
import HeroCard from '../heroCard/heroCard'


import './heroList.css'

export default function HeroList({
    heroList, 
    favorites,
    fetchingHero, 
    addFavorite,
    removeFavorite,
}) {
    if (heroList.length === 0){
        return (
            <section className='hero-list hero-list--messaging'>
                
                <p className='hero-list__message'>
                    {fetchingHero?'Buscando heróis':'Não foram encontrados herois'}
                </p>
            </section>
        );
    }

    const openHero = (id, hero) => {
        console.log(`clicked: ${id}`, hero);
    }
    return (
        <section className='hero-list'>
            {heroList.map(hero => {
                const {id} = hero;
                return(
                    <HeroCard 
                        key={id} 
                        hero={hero}
                        onClick={() => openHero(id, hero)}
                        favorites={favorites}
                        addFavorite={addFavorite}
                        removeFavorite={removeFavorite}
                    />
                );
            })}

        </section>
    )
}