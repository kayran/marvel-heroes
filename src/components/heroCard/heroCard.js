import React from 'react';

import './heroCard.css'

export default function HeroCard({
    hero, 
    onClick, 
    favorites,
    addFavorite,
    removeFavorite,
}) {

    const {name, id, thumbnail} = hero;

    const img = ({path, extension}) => `${path}.${extension}`;

    const favorite = favorites.includes(id);
    const favoriteAction = (evt) => {
        console.log('clicked: ', id);
        evt.stopPropagation();
        favorite?removeFavorite(id):addFavorite(id);
    }

    return (
        <article onClick={onClick} className='hero-card'>
            <img className='hero-card__image' src={img(thumbnail)} alt={`Imagem do herói ${name}`}></img>
            <header className='hero-card__info'>
                <span>{name}</span>
                <svg onClick={favoriteAction}>
                    <use href={favorite?'#heart-fullfilled':'#heart-empty'}/>
                </svg>
            </header>

        </article>
    );
}