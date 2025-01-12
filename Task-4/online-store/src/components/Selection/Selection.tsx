import ItemRating from '../ItemRating/ItemRating';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import './Selection.scss';

type CatalogItem = {
    id: number;
    name: string;
    price: number;
    oldPrice?: number;
    star: number;
    like: number;
    image: string;
}

type SelectionProps = {
    titleImage: string;
    items: CatalogItem[];
}

const Selection = ({ titleImage, items }: SelectionProps) => {
    const { isMobile } = useDeviceDetect();

    return (
        <div className='selection'>
            <div className='selection__title' style={{ backgroundImage: `url(./src/assets/img/${titleImage}.png)` }}></div>
            <div className='selection__items'>
                {items.map(item => (
                    <div key={item.id} className='selection__item'>
                        <img src={`./src/assets/img/${item.image}`} alt={item.name} className='selection__img' />
                        <span className='selection__like'></span>
                        <div className='selection__info'>
                            <div className='selection__wrapper'>
                                <div className='selection__wrapper-price'>
                                    <span className='selection__current-price'>{item.price}₽</span>
                                    {item.oldPrice && (
                                        <span className='selection__old-price'>{item.oldPrice} ₽</span>
                                    )}
                                </div>
                                {isMobile ? '' :
                                    <ItemRating itemStar={item.star} itemLike={item.like} color={'white'} />
                                }
                            </div>
                            <span className='selection__name'>{item.name}</span>
                            {!isMobile ? '' :
                                <ItemRating itemStar={item.star} itemLike={item.like} color={'white'} />
                            }
                            <button className='selection__btn btn'>В корзину</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
  
export default Selection;