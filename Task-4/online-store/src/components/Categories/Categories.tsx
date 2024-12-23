import React from 'react';
import categoriesData from '../../data/categoriesData.json';

import './Categories.scss';

const Categories: React.FC = () => {
    return (
        <div className='categories'>
            <ul className='categories__list'>
                {categoriesData.categories.map(category => (
                    <li className='categories__item' key={category.id}>
                        <img src={`./src/assets/img/${category.image}`} className='categories__img' alt={category.name}/>
                        <span className='categories__title'>{category.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
  
export default Categories;