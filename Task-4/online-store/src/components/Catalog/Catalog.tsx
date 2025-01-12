import React from 'react';
import ItemRating from '../ItemRating/ItemRating';
import useDeviceDetect from '../../hooks/useDeviceDetect';

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
    width?: boolean;
    mobileHeight: number;
    marginTop: number;
    color?: string;
}

type CatalogProps = {
    items: CatalogItem[];
}

const Catalog: React.FC<CatalogProps> = ({ items }) => {
    const { isMobile } = useDeviceDetect();

    return (
        <div className='catalog'>
            {items.map(item => {
                const displayedImages = isMobile ? item.images.slice(0, 2) : item.images;
                const imageCount = displayedImages.length;
                const imgWidth = imageCount === 1 ? '100%' : `${100 / imageCount }%`;
 
                return (
                    <div key={item.id} className='catalog__item'>
                        <div className='catalog__images'>
                            {displayedImages.map((image, index) => (
                                <div
                                    key={index} 
                                    className='catalog__wrapper-img'
                                    style={{
                                        ...((item.width && index === 0) ? {width: '75%'} : (item.width && index === 1) ? {width: '25%'} : {width: imgWidth}),
                                        ...((isMobile) ? {height: `${item.mobileHeight}px`} : ''),
                                        backgroundColor: item.color
                                    }}
                                >
                                    <img
                                        src={`./src/assets/img/${image}`} 
                                        className='catalog__img' 
                                        alt={item.name}
                                        style={{
                                            ...((isMobile) ? {height: `${item.mobileHeight}px`} : '')
                                        }}
                                    />
                                </div>
                            ))}
                            <div className='catalog__badges'>
                                <span className='catalog__badge catalog__badge-top'></span>
                                <span className='catalog__badge catalog__badge-bottom'></span>
                            </div>
                        </div>
                        <div className='catalog__wrapper' style={(isMobile) ? {marginTop: `${item.marginTop}px`} : {}}>
                            {!isMobile ? '' :
                                <div className='catalog__mobile'>
                                    <button className='catalog__btn btn'>В корзину</button>
                                    <span className='catalog__icon-favorite'></span>
                                </div>
                            }
                            <div className='catalog__text'>
                                <div className='catalog__text-wrapper'>
                                    <span className='catalog__title'>{item.name}</span>
                                    {isMobile ? '' :
                                        <span className='catalog__icon-favorite'></span>
                                    }
                                </div>
                                <span className='catalog__desc'>{item.desc}</span>
                            </div>
                            <div className='catalog__wrapper-right'>
                                <div className='catalog__wrapper-price-rating'>
                                    <div className='catalog__price'>
                                        <span className='catalog__current-price'>{item.price}₽</span>
                                        <span className='catalog__old-price'>{item.oldPrice} ₽</span>
                                    </div>
                                    <ItemRating itemStar={item.star} itemLike={item.like} color={'black'} />
                                </div>
                                {isMobile ? '' :
                                    <button className='catalog__btn btn'>В корзину</button>
                                }
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
  
export default Catalog;