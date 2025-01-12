import './ItemRating.scss';

type ItemRatingProps = {
    itemStar: number;
    itemLike: number;
    color: string;
}

const ItemRating = ({ itemStar, itemLike, color }: ItemRatingProps) => {
    const textColorClass = color === 'white' ? 'item-rating__number--white' : '';
    const starColorClass = color === 'white' ? 'item-rating__star--white' : '';
    const likeColorClass = color === 'white' ? 'item-rating__like--white' : '';

    return (
        <div className='item-rating'>
            <div className='item-rating__wrapper'>
                <span className={`item-rating__number ${textColorClass}`}>{itemStar.toFixed(1)}</span>
                <span className={`item-rating__star ${starColorClass}`}></span>
            </div>
            <div className='item-rating__wrapper'>
                <span className={`item-rating__number ${textColorClass}`}>{itemLike}</span>
                <span className={`item-rating__like ${likeColorClass}`}></span>
            </div>
        </div>                 
    );
};
  
export default ItemRating;