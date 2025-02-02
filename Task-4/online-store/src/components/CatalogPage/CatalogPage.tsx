import selectionData from '../../data/selectionData.json';
import ItemRating from '../ItemRating/ItemRating';
import useDeviceDetect from '../../hooks/useDeviceDetect';

import '../Selection/Selection.scss';
import './CatalogPage.scss';

type CatalogPageProps = {
    categoryName: string;
}

const CatalogPage = ({ categoryName }: CatalogPageProps) => {
    const { isMobile } = useDeviceDetect();
    const filteredProducts = selectionData.home.filter(product => product.category.includes(categoryName));

    return (
        <div className='catalog-page'>
            <div className='catalog-page__header'>
                <h1 className='catalog-page__title'>{categoryName}</h1>
                <span className='catalog-page__count'>{filteredProducts.length} товаров</span>    
            </div>
            <div className='catalog-page__wrapper-filter'></div>
            <div className='catalog-page__cards'>
                {filteredProducts.map(item => (
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
                                    <ItemRating itemStar={item.star} itemLike={item.like} color={'black'} />
                                }
                            </div>
                            <span className='selection__name'>{item.name}</span>
                            {!isMobile ? '' :
                                <ItemRating itemStar={item.star} itemLike={item.like} color={'black'} />
                            }
                            <button className='selection__btn btn'>В корзину</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
  
export default CatalogPage;