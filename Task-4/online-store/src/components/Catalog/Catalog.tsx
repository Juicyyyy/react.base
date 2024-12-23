import React from 'react';

import './Catalog.scss';

export type CatalogItem = {
    id: number;
    name: string;
    desc: string;
    price: number;
    oldPrice: number;
    star: number;
    like: number;
    images: string[];
}

type CatalogProps = {
    items: CatalogItem[];
}

const Catalog: React.FC<CatalogProps> = ({ items }) => {
    return (
        <div className='catalog'>
            {items.map(item => (
                <div key={item.id} className='catalog__item'>
                     <div className='catalog__images'>
                        {item.images.map((image, index) => (
                            <img 
                                key={index} 
                                src={`./src/assets/img/${image}`} 
                                className='catalog__img' 
                                alt={item.name}
                            />
                        ))}
                    </div>
                    <div className='catalog__wrapper-left'>
                        <div className='catalog__text'>
                            <span className='catalog__title'>{item.name}</span>
                            <span className='catalog__desc'>{item.desc}</span>
                        </div>
                        <div className='catalog__wrapper-right'>
                            <div className='catalog__wrapper-price-rating'>
                                <div className='catalog__price'>
                                    <span className='catalog__current-price'>{item.price} ₽</span>
                                    <span className='catalog__old-price'>{item.oldPrice} ₽</span>
                                </div>
                                <div className='catalog__rating'>
                                    <span className='catalog__rating-number star'>{item.star}</span>
                                    <span className='catalog__rating-number like'>{item.like}</span>
                                </div>
                            </div>
                            <button className='catalog__btn btn'>В корзину</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};
  
export default Catalog;